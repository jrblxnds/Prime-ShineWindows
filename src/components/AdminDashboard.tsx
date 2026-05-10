import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  Calendar as CalendarIcon, 
  List, 
  LayoutDashboard, 
  ChevronRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { User } from 'firebase/auth';
import { authService } from '../firebase/authService';
import { bookingService } from '../firebase/bookingService';
import { Booking, BookingStatus } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

import BookingTable from './BookingTable';
import BookingCalendar from './BookingCalendar';
import StatusBadge from './StatusBadge';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const unsub = authService.onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getBookings();
      if (data) {
        setBookings(data);
        const newStats = {
          total: data.length,
          pending: data.filter(b => b.status === BookingStatus.PENDING).length,
          confirmed: data.filter(b => b.status === BookingStatus.CONFIRMED).length,
          completed: data.filter(b => b.status === BookingStatus.COMPLETED).length,
          cancelled: data.filter(b => b.status === BookingStatus.CANCELLED).length,
        };
        setStats(newStats);
      }
    } catch (error: any) {
      toast.error('Failed to load bookings');
    }
  };

  const handleLogin = async () => {
    try {
      await authService.login();
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  const handleLogout = () => authService.logout();

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <Loader2 className="animate-spin text-premium-blue" size={40} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center space-y-8"
        >
          <div className="w-20 h-20 bg-sky-blue text-navy rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-bold text-navy">Admin Access</h2>
            <p className="text-navy/60 text-sm">Please sign in with an authorized Google account to manage Prime & Shine Windows.</p>
          </div>
          <Button 
            onClick={handleLogin}
            className="w-full bg-navy hover:bg-premium-blue text-white rounded-xl h-14 font-bold flex items-center justify-center gap-3 transition-all"
          >
            <img src="https://www.gstatic.com/firebase/builtins/pixel/google_g.svg" className="w-5 h-5 bg-white p-1 rounded" alt="G" />
            Sign in with Google
          </Button>
          <a href="#" className="text-xs font-bold text-premium-blue hover:underline uppercase tracking-widest block pt-4">
            Return to Website
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-navy text-white p-8 flex flex-col flex-shrink-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <ShieldCheck size={20} className="text-sky-blue" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm uppercase tracking-tighter">Prime & Shine</span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-sky-blue">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-4 px-3">Management</p>
          <SidebarLink icon={LayoutDashboard} label="Overview" active />
          {/* Add more links if needed */}
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-6">
          <div className="flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded-full bg-premium-blue border border-white/10 flex items-center justify-center overflow-hidden">
               {user.photoURL ? <img src={user.photoURL} alt="P" className="w-full h-full object-cover" /> : user.email?.[0].toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate">{user.displayName || 'Admin'}</span>
              <span className="text-[10px] text-white/40 truncate italic">{user.email}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl px-3"
          >
            <LogOut size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-extrabold text-navy italic">Dashboard</h1>
            <p className="text-navy/40 text-sm">Welcome back. You have {stats.pending} pending requests.</p>
          </div>
          <Button 
            onClick={loadBookings}
            className="bg-white text-navy hover:bg-silver border border-silver shadow-sm rounded-xl px-6"
          >
            Refresh Data
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          <StatCard label="Total" value={stats.total} color="bg-silver/50" />
          <StatCard label="Pending" value={stats.pending} color="bg-gold/20 text-gold" />
          <StatCard label="Confirmed" value={stats.confirmed} color="bg-premium-blue/20 text-premium-blue" />
          <StatCard label="Completed" value={stats.completed} color="bg-green-100 text-green-700" />
          <StatCard label="Cancelled" value={stats.cancelled} color="bg-red-100 text-red-700" />
        </div>

        {/* content sections */}
        <Tabs defaultValue="list" className="space-y-8">
          <TabsList className="bg-silver/30 p-1 rounded-xl">
            <TabsTrigger value="list" className="rounded-lg gap-2 text-xs font-bold uppercase tracking-widest px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm">
              <List size={14} /> List View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="rounded-lg gap-2 text-xs font-bold uppercase tracking-widest px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm">
              <CalendarIcon size={14} /> Calendar View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-0">
            <BookingTable bookings={bookings} onUpdate={loadBookings} />
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <BookingCalendar bookings={bookings} onUpdate={loadBookings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${active ? 'bg-white/10 text-white shadow-inner' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      {active && <ChevronRight size={14} className="text-sky-blue" />}
    </button>
  );
}

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden group">
      <CardContent className="p-6">
        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-navy/40 mb-4">{label}</p>
        <div className="flex items-end justify-between">
          <h4 className="text-3xl font-display font-extrabold text-navy">{value}</h4>
          <div className={`px-2 py-1 rounded-lg text-[10px] font-black ${color}`}>
            {label[0].toUpperCase()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
