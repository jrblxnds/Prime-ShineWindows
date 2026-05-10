import { Booking, BookingStatus } from '../types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from './ui/button';
import { Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { bookingService } from '../firebase/bookingService';
import StatusBadge from './StatusBadge';
import { toast } from 'sonner';

interface BookingTableProps {
  bookings: Booking[];
  onUpdate: () => void;
}

export default function BookingTable({ bookings, onUpdate }: BookingTableProps) {
  const handleStatusChange = async (booking: Booking, newStatus: string) => {
    try {
      await bookingService.updateBookingStatus(booking.id!, newStatus as BookingStatus, booking.dateTimeKey);
      toast.success(`Booking ${newStatus.toLowerCase()} successfully`);
      onUpdate();
    } catch (error: any) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (booking: Booking) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      await bookingService.deleteBooking(booking.id!, booking.dateTimeKey);
      toast.success('Booking deleted');
      onUpdate();
    } catch (error: any) {
      toast.error('Failed to delete booking');
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-silver overflow-hidden">
      <Table>
        <TableHeader className="bg-silver/10">
          <TableRow className="border-b border-silver">
            <TableHead className="text-[10px] uppercase font-bold tracking-widest px-8">Client</TableHead>
            <TableHead className="text-[10px] uppercase font-bold tracking-widest">Service</TableHead>
            <TableHead className="text-[10px] uppercase font-bold tracking-widest">Date & Time</TableHead>
            <TableHead className="text-[10px] uppercase font-bold tracking-widest">Status</TableHead>
            <TableHead className="text-[10px] uppercase font-bold tracking-widest text-right px-8">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="border-b border-silver/50 hover:bg-off-white/50 transition-colors">
              <TableCell className="px-8 py-6">
                <div className="space-y-1">
                  <p className="font-display font-bold text-navy">{booking.name}</p>
                  <div className="flex flex-col gap-1 text-[10px] text-navy/40 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Phone size={10} /> {booking.phone}</span>
                    <span className="flex items-center gap-1"><Mail size={10} /> {booking.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-navy">{booking.serviceType}</p>
                  <p className="text-[10px] text-navy/40 font-semibold">{booking.propertyType}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-navy">{booking.preferredDate}</p>
                  <p className="text-[10px] text-premium-blue font-black">{booking.preferredTime}</p>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={booking.status} />
              </TableCell>
              <TableCell className="px-8 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Select 
                    defaultValue={booking.status} 
                    onValueChange={(val) => handleStatusChange(booking, val)}
                  >
                    <SelectTrigger className="w-[130px] h-9 text-[10px] font-bold uppercase tracking-widest rounded-lg border-silver">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BookingStatus).map(s => (
                        <SelectItem key={s} value={s} className="text-xs font-semibold">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-navy/20 hover:text-red-600 hover:bg-red-50 rounded-lg h-9 w-9"
                    onClick={() => handleDelete(booking)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-64 text-center">
                <p className="text-navy/40 font-display italic text-lg">No bookings found.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
