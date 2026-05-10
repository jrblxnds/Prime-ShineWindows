import { PRICING_PACKAGES } from '../constants';
import { Button } from './ui/button';
import { Check, Info } from 'lucide-react';
import {运动} from 'motion/react'; // Oops, I'll use motion
import { motion } from 'motion/react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-sky-blue/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-sky-blue"
          >
            <span className="w-2 h-2 bg-rich-blue rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-rich-blue">Simple Pricing</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy italic">Transparent Estimates</h2>
          <p className="text-muted-text max-w-2xl leading-relaxed text-lg">
            Clear estimates for every home. No hidden fees or corporate surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRICING_PACKAGES.map((pkg, index) => (
            <motion.div 
              key={pkg.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col p-8 rounded-[2.5rem] bg-white border border-sky-blue/50 hover:border-rich-blue/30 shadow-xl hover:shadow-2xl transition-all h-full"
            >
              <div className="mb-6">
                <h3 className="text-lg font-bold text-navy mb-4">{pkg.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-rich-blue">{pkg.price}</span>
                </div>
              </div>

              <div className="flex-grow space-y-6">
                <p className="text-sm text-muted-text leading-relaxed">
                  {pkg.description}
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm font-semibold text-navy/80">
                    <Check size={18} className="text-rich-blue shrink-0" /> 
                    <span>Exterior glass wash</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-navy/80">
                    <Check size={18} className="text-rich-blue shrink-0" /> 
                    <span>Friendly inspection</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10">
                <Button 
                   className="w-full bg-pale-blue text-rich-blue border border-sky-blue hover:bg-rich-blue hover:text-white rounded-full font-bold h-12 shadow-sm transition-all"
                   onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Request Cleaning
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-warm-cream/50 border border-gold/20 rounded-[2rem] max-w-3xl mx-auto flex items-start gap-6 shadow-sm"
        >
          <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
            <Info size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-navy uppercase tracking-widest text-xs">Helpful Note</h4>
            <p className="text-sm text-muted-text leading-relaxed font-medium">
              These are helpful estimates. Final pricing depends on the property size, window count, access, and any extra cleaning needs. Payment is due after service by cash or e-transfer.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
