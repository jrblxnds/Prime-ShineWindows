import { Sparkles, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { OWNERS } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-20 px-6 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 transform origin-top-right blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                <Sparkles size={20} className="text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl uppercase tracking-tighter italic leading-none">Prime & Shine</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold leading-none mt-1">Windows</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Bright windows, happier homes. Locally owned window cleaning service dedicated to Toronto favorites.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="mailto:perseus@tecsonmedia.com" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gold">Our Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="text-white/60 hover:text-gold transition-colors cursor-pointer">Exterior Glass Cleaning</li>
              <li className="text-white/60 hover:text-gold transition-colors cursor-pointer">Screen Detailing</li>
              <li className="text-white/60 hover:text-gold transition-colors cursor-pointer">Track & Sill Polish</li>
              <li className="text-white/60 hover:text-gold transition-colors cursor-pointer">Hard Water Solutions</li>
              <li className="text-white/60 hover:text-gold transition-colors cursor-pointer">Local Storefronts</li>
            </ul>
          </div>

          {/* Areas */}
          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gold">Service Area</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3 text-white/60"><MapPin size={16} className="text-gold" /> Toronto</li>
              <li className="flex items-center gap-3 text-white/60"><MapPin size={16} className="text-gold" /> North York</li>
              <li className="flex items-center gap-3 text-white/60"><MapPin size={16} className="text-gold" /> Etobicoke</li>
              <li className="flex items-center gap-3 text-white/60"><MapPin size={16} className="text-gold" /> Scarborough</li>
              <li className="flex items-center gap-3 text-white/60"><MapPin size={16} className="text-gold" /> GTA Regions</li>
            </ul>
          </div>

          {/* Owners */}
          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gold">Contact Owners</h4>
            <div className="space-y-6">
              {OWNERS.map(owner => (
                <div key={owner.name} className="space-y-2">
                  <p className="text-xs font-black text-white">{owner.name}</p>
                  <a href={`tel:${owner.phoneUrl}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-bold">
                    <Phone size={12} className="text-gold" /> {owner.phone}
                  </a>
                  <a href={`mailto:${owner.email}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-bold truncate">
                    <Mail size={12} className="text-gold" /> {owner.email}
                  </a>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] uppercase font-bold text-gold/60 mb-2">Payment</p>
                <p className="text-xs text-white/80 font-medium">Cash or E-transfer after we finish.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">
          <p>© {new Date().getFullYear()} Prime & Shine Windows. Toronto, ON.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gold transition-colors flex items-center gap-1">Privacy <ExternalLink size={10} /></a>
            <a href="#" className="hover:text-gold transition-colors flex items-center gap-1">Terms <ExternalLink size={10} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
