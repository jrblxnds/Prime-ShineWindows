export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum ServiceType {
  EXTERIOR = 'Exterior Window Cleaning',
  SCREEN = 'Screen Cleaning',
  TRACK_SILL = 'Track/Sill Cleaning',
  HARD_WATER = 'Hard Water Stain Removal',
  MULTIPLE = 'Multiple Services',
  COMMERCIAL = 'Commercial Request',
}

export enum PropertyType {
  SMALL_ONE_STORY = 'Small One-Story Home',
  LARGE_TWO_STORY = 'Larger Two-Story Home',
  TOWNHOUSE = 'Townhouse',
  CONDO_EXTERIOR = 'Condo Exterior Access',
  COMMERCIAL = 'Commercial Property',
  OTHER = 'Other',
}

export interface Booking {
  id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: ServiceType;
  propertyType: PropertyType;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // HH:mm
  dateTimeKey: string;
  notes?: string;
  status: BookingStatus;
  createdAt?: any;
  updatedAt?: any;
}

export interface BlockedSlot {
  dateTimeKey: string;
  bookingId: string;
  status: BookingStatus;
  createdAt: any;
}
