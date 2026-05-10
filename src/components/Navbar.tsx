import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Owners', href: '#owners' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.BaseSyntheticEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-3 rounded-3xl border border-sky-blue' : 'bg-transparent py-5'}`}>
      <div className="px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group" onClick={(e) => scrollToSection(e, '#')}>
          <div className="w-10 h-10 bg-rich-blue rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-tight uppercase tracking-tighter text-navy italic">Prime & Shine</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rich-blue leading-none">Windows</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="px-4 py-2 text-sm font-semibold text-muted-text hover:text-rich-blue transition-colors rounded-full hover:bg-sky-blue/30"
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="ml-4 bg-rich-blue hover:bg-navy text-white rounded-full px-6 font-bold shadow-md"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-navy" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-sky-blue p-6 flex flex-col gap-4 md:hidden mx-2"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-bold text-navy py-3 px-4 hover:bg-sky-blue/20 rounded-2xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button 
                className="w-full bg-rich-blue hover:bg-navy text-white rounded-2xl h-14 text-lg font-bold shadow-lg mt-4"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book a Cleaning
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
