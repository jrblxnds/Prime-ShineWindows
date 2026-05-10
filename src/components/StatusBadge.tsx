import { BookingStatus } from '../types';
import { cn } from '../lib/utils';

export default function StatusBadge({ status }: { status: BookingStatus }) {
  const styles = {
    [BookingStatus.PENDING]: 'bg-gold/10 text-gold border-gold/20',
    [BookingStatus.CONFIRMED]: 'bg-premium-blue/10 text-premium-blue border-premium-blue/20',
    [BookingStatus.COMPLETED]: 'bg-green-100 text-green-700 border-green-200',
    [BookingStatus.CANCELLED]: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={cn(
      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border',
      styles[status]
    )}>
      {status}
    </span>
  );
}
