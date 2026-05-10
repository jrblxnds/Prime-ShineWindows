import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from './ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { toast } from 'sonner';

import { bookingService } from '../firebase/bookingService';
import { ServiceType, PropertyType, BookingStatus } from '../types';
import { cn } from '../lib/utils';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(5, 'Service address is required'),
  serviceType: z.nativeEnum(ServiceType),
  propertyType: z.nativeEnum(PropertyType),
  preferredDate: z.date(),
  preferredTime: z.string().min(1, 'Time is required'),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
    },
  });

  async function onSubmit(values: BookingFormValues) {
    setIsSubmitting(true);
    const dateStr = format(values.preferredDate, 'yyyy-MM-dd');
    const dateTimeKey = `${dateStr}${values.preferredTime}`;

    try {
      await bookingService.createBooking({
        ...values,
        preferredDate: dateStr,
        dateTimeKey,
        status: BookingStatus.PENDING,
      });
      setIsSubmitted(true);
      toast.success('Booking request submitted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'That time is already requested. Please choose another time.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 px-6 bg-pale-blue">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-[#101820] p-16 rounded-[3rem] shadow-2xl border border-white/10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-gold text-navy rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle size={40} />
          </motion.div>
          <h2 className="text-4xl font-display font-bold text-white italic">Request Received</h2>
          <div className="space-y-4 text-white/70 leading-relaxed max-w-xl mx-auto font-medium">
            <p>Your request has been received. We’ll review your preferred time and get back to you soon.</p>
            <p className="text-gold font-bold">Payment is due after service by cash or e-transfer.</p>
          </div>
          <Button 
            className="bg-gold hover:bg-gold/80 text-navy rounded-full px-10 h-14 font-black transition-all"
            onClick={() => {
              setIsSubmitted(false);
              form.reset();
            }}
          >
            Make Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 px-6 bg-pale-blue scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-sky-blue"
        >
          <span className="w-2 h-2 bg-rich-blue rounded-full" />
          <span className="text-xs font-bold uppercase tracking-widest text-rich-blue">Request a Time</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-navy italic">Request a Time That Works for You</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-[#101820] rounded-[3.5rem] shadow-[0_40px_100px_rgba(11,31,58,0.3)] border border-white/5 overflow-hidden"
      >
        <div className="p-8 md:p-16">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-[#07111D] border-white/5 h-16 rounded-2xl focus:ring-rich-blue text-white placeholder:text-white/20 font-medium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" className="bg-[#07111D] border-white/5 h-16 rounded-2xl focus:ring-rich-blue text-white placeholder:text-white/20 font-medium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(416) 000-0000" className="bg-[#07111D] border-white/5 h-16 rounded-2xl focus:ring-rich-blue text-white placeholder:text-white/20 font-medium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Service Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Toronto St, Toronto, ON" className="bg-[#07111D] border-white/5 h-16 rounded-2xl focus:ring-rich-blue text-white placeholder:text-white/20 font-medium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#07111D] border-white/5 h-16 rounded-2xl text-white font-medium">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#101820] border-white/10 text-white">
                          {Object.values(ServiceType).map(type => (
                            <SelectItem key={type} value={type} className="hover:bg-rich-blue focus:bg-rich-blue focus:text-white transition-colors">{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#07111D] border-white/5 h-16 rounded-2xl text-white font-medium">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#101820] border-white/10 text-white">
                          {Object.values(PropertyType).map(type => (
                            <SelectItem key={type} value={type} className="hover:bg-rich-blue focus:bg-rich-blue focus:text-white transition-colors">{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-6 text-left font-medium bg-[#07111D] border-white/5 h-16 rounded-2xl text-white hover:bg-[#0b1624] hover:text-white transition-all",
                                !field.value && "text-white/20"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-5 w-5 opacity-40" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-white/10 bg-[#101820] shadow-2xl" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                            className="text-white"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Preferred Time</FormLabel>
                      <div className="grid grid-cols-5 gap-3">
                        {TIME_SLOTS.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => field.onChange(slot)}
                            className={cn(
                              "py-4 text-[10px] font-black rounded-xl border transition-all uppercase tracking-widest",
                              field.value === slot 
                                ? "bg-rich-blue text-white border-rich-blue shadow-[0_0_25px_rgba(37,99,168,0.5)] scale-105" 
                                : "bg-[#07111D] text-white/30 border-white/5 hover:border-white/20 hover:text-white"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold uppercase tracking-[0.1em] text-[0.7rem] font-black">Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <textarea 
                        placeholder="Any special instructions or details..." 
                        className="w-full bg-[#07111D] border-white/5 rounded-3xl focus:ring-2 focus:ring-rich-blue/40 text-white placeholder:text-white/20 p-6 min-h-[160px] resize-none outline-none focus:border-white/10 transition-all font-sans font-medium" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] text-navy rounded-full h-18 font-black text-xl shadow-[0_20px_50px_rgba(201,166,70,0.3)] transition-all disabled:opacity-50 uppercase tracking-[0.2em]"
                >
                  {isSubmitting ? 'Sending Request...' : 'Book My Clean Shine'}
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-[10px] text-white/20 uppercase tracking-[0.3em] font-black py-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full opacity-40" />
                  No prepayment
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full opacity-40" />
                  Local Toronto
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full opacity-40" />
                  Pay at the end
                </div>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
}
