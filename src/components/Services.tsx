import { motion } from 'motion/react';
import { Droplets, Grid, Maximize, Sparkles } from 'lucide-react';
import { SERVICES } from '../constants';

const ICON_MAP: Record<string, any> = {
  Droplets,
  Grid,
  Maximize,
  Sparkle: Sparkles,
};

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-pale-blue">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-sky-blue"
            >
              <span className="w-2 h-2 bg-rich-blue rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-rich-blue">Friendly Services</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy italic">Simple, Friendly <br />Window Cleaning</h2>
            <p className="text-muted-text text-lg leading-relaxed">
              We offer a clean and simple approach to making your windows shine. No corporate jargon, just honest work.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Droplets;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-white border border-sky-blue/50 hover:border-rich-blue/30 shadow-xl hover:shadow-2xl transition-all h-full flex flex-col"
              >
                <div className="w-14 h-14 bg-sky-blue rounded-2xl flex items-center justify-center text-rich-blue mb-6 group-hover:rotate-6 transition-transform">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-muted-text text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <div className="pt-4 border-t border-pale-blue">
                  <span className="text-gold font-bold text-[10px] uppercase tracking-widest">Premium Service</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
