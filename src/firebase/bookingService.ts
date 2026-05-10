import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  runTransaction,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { Booking, BookingStatus, BlockedSlot } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const bookingService = {
  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) {
    const dateTimeKey = bookingData.dateTimeKey;
    const bookingRef = doc(collection(db, 'bookings'));
    const slotRef = doc(db, 'blockedSlots', dateTimeKey);

    try {
      await runTransaction(db, async (transaction) => {
        const slotSnap = await transaction.get(slotRef);
        
        if (slotSnap.exists()) {
          const slotData = slotSnap.data() as BlockedSlot;
          if (slotData.status === BookingStatus.PENDING || slotData.status === BookingStatus.CONFIRMED) {
            throw new Error('That time is no longer available. Please choose another date or time.');
          }
        }

        // Create booking
        const newBooking = {
          ...bookingData,
          id: bookingRef.id,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          status: BookingStatus.PENDING
        };
        transaction.set(bookingRef, newBooking);

        // Create blocked slot
        const newSlot: BlockedSlot = {
          dateTimeKey,
          bookingId: bookingRef.id,
          status: BookingStatus.PENDING,
          createdAt: serverTimestamp()
        };
        transaction.set(slotRef, newSlot);
      });
      return bookingRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'bookings/blockedSlots');
    }
  },

  async getBookings() {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(doc => doc.data() as Booking);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'bookings');
    }
  },

  async updateBookingStatus(bookingId: string, status: BookingStatus, dateTimeKey: string) {
    const bookingRef = doc(db, 'bookings', bookingId);
    const slotRef = doc(db, 'blockedSlots', dateTimeKey);

    try {
      await runTransaction(db, async (transaction) => {
        transaction.update(bookingRef, { status, updatedAt: serverTimestamp() });
        
        if (status === BookingStatus.CANCELLED) {
          transaction.delete(slotRef);
        } else {
          transaction.update(slotRef, { status });
        }
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${bookingId}`);
    }
  },

  async deleteBooking(bookingId: string, dateTimeKey: string) {
    const bookingRef = doc(db, 'bookings', bookingId);
    const slotRef = doc(db, 'blockedSlots', dateTimeKey);

    try {
      await runTransaction(db, async (transaction) => {
        transaction.delete(bookingRef);
        transaction.delete(slotRef);
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `bookings/${bookingId}`);
    }
  },

  async rescheduleBooking(bookingId: string, oldDateTimeKey: string, newDateTimeData: { preferredDate: string, preferredTime: string, dateTimeKey: string }) {
    const bookingRef = doc(db, 'bookings', bookingId);
    const oldSlotRef = doc(db, 'blockedSlots', oldDateTimeKey);
    const newSlotRef = doc(db, 'blockedSlots', newDateTimeData.dateTimeKey);

    try {
      await runTransaction(db, async (transaction) => {
        const newSlotSnap = await transaction.get(newSlotRef);
        
        if (newSlotSnap.exists()) {
          const slotData = newSlotSnap.data() as BlockedSlot;
          if (slotData.status === BookingStatus.PENDING || slotData.status === BookingStatus.CONFIRMED) {
            throw new Error('That time slot is already booked. Please choose another time.');
          }
        }

        // Update booking
        transaction.update(bookingRef, {
          ...newDateTimeData,
          updatedAt: serverTimestamp()
        });

        // Release old slot
        transaction.delete(oldSlotRef);

        const bookingSnap = await transaction.get(bookingRef);
        const currentStatus = bookingSnap.data()?.status || BookingStatus.PENDING;

        // Block new slot
        const newSlot: BlockedSlot = {
          dateTimeKey: newDateTimeData.dateTimeKey,
          bookingId: bookingId,
          status: currentStatus,
          createdAt: serverTimestamp(),
        };
        
        transaction.set(newSlotRef, newSlot);
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${bookingId}`);
    }
  }
};
