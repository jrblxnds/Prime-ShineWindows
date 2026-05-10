import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, ExternalLink, User } from 'lucide-react';
import { OWNERS } from '../constants';

export default function Owners() {
  return (
    <section id="owners" className="py-24 px-6 bg-warm-cream/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-sky-blue"
          >
            <span className="w-2 h-2 bg-rich-blue rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-rich-blue">Meet the Owners</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy italic">
            Locally Owned & Operated
          </h2>
          <p className="text-muted-text max-w-2xl leading-relaxed text-lg">
            Prime & Shine Windows is locally run by Perseus Tecson and Shepherd Burke. We’re focused on making window cleaning simple, friendly, and reliable for homeowners across Toronto and surrounding areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {OWNERS.map((owner, index) => (
            <motion.div
              key={owner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all border border-sky-blue/50 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-blue/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="w-20 h-20 bg-sky-blue rounded-[1.5rem] flex items-center justify-center text-rich-blue">
                  <User size={40} />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-navy">{owner.name}</h3>
                  <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{owner.role}</p>
                </div>

                <div className="w-full space-y-3 pt-4">
                  <a 
                    href={`mailto:${owner.email}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-pale-blue text-rich-blue rounded-2xl font-bold hover:bg-rich-blue hover:text-white transition-all group/link"
                  >
                    <Mail size={18} />
                    {owner.email}
                    <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                  <a 
                    href={`tel:${owner.phoneUrl}`}
                    className="flex items-center justify-center gap-3 w-full py-4 border border-sky-blue text-navy rounded-2xl font-bold hover:bg-white hover:border-rich-blue transition-all"
                  >
                    <Phone size={18} />
                    {owner.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
