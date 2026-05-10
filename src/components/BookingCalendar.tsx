import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Event as RBCEvent } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Booking, BookingStatus } from '../types';
import { bookingService } from '../firebase/bookingService';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface BookingCalendarProps {
  bookings: Booking[];
  onUpdate: () => void;
}

interface CalendarEvent extends RBCEvent {
  id: string;
  booking: Booking;
}

export default function BookingCalendar({ bookings, onUpdate }: BookingCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const events: CalendarEvent[] = bookings.map(b => {
    const start = new Date(`${b.preferredDate}T${b.preferredTime}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration
    return {
      id: b.id!,
      title: `${b.name} - ${b.serviceType}`,
      start,
      end,
      booking: b,
    };
  });

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#1E5B9A'; // Confirmed (Premium Blue)
    const status = event.booking.status;

    if (status === BookingStatus.PENDING) backgroundColor = '#C9A646'; // Pending (Gold)
    if (status === BookingStatus.COMPLETED) backgroundColor = '#16a34a'; // Completed (Green)
    if (status === BookingStatus.CANCELLED) backgroundColor = '#dc2626'; // Cancelled (Red)

    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        display: 'block',
        fontSize: '11px',
        fontWeight: 'bold',
        padding: '2px 8px'
      }
    };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setNewDate(event.booking.preferredDate);
    setNewTime(event.booking.preferredTime);
  };

  const handleReschedule = async () => {
    if (!selectedEvent) return;
    setRescheduling(true);
    const newDateTimeKey = `${newDate}${newTime}`;
    
    try {
      await bookingService.rescheduleBooking(
        selectedEvent.booking.id!,
        selectedEvent.booking.dateTimeKey,
        {
          preferredDate: newDate,
          preferredTime: newTime,
          dateTimeKey: newDateTimeKey
        }
      );
      toast.success('Successfully rescheduled!');
      setSelectedEvent(null);
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || 'Reschedule failed');
    } finally {
      setRescheduling(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-silver h-[800px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'day']}
      />

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display font-extrabold text-2xl text-navy italic">
              Reschedule Booking
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Client</p>
              <p className="font-bold text-navy">{selectedEvent?.booking.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-navy/70">New Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={newDate} 
                  onChange={(e) => setNewDate(e.target.value)}
                  className="rounded-xl border-silver bg-off-white font-medium"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="time" className="text-xs font-bold uppercase tracking-widest text-navy/70">New Time</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newTime} 
                  onChange={(e) => setNewTime(e.target.value)}
                  className="rounded-xl border-silver bg-off-white font-medium"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedEvent(null)}
              className="rounded-xl border-silver text-navy h-12 px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleReschedule} 
              disabled={rescheduling}
              className="rounded-xl bg-navy hover:bg-premium-blue text-white h-12 px-8 font-bold shadow-lg"
            >
              {rescheduling ? 'Saving...' : 'Update Schedule'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
