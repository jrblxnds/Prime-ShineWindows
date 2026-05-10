import { motion } from 'motion/react';
import { Star, MessageCircle } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 px-6 bg-pale-blue relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex flex-col items-center space-y-4 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-sky-blue"
          >
            <span className="w-2 h-2 bg-rich-blue rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-rich-blue">Testimonials</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy italic">Friendly Reviews <br />Coming Soon</h2>
          <p className="text-muted-text max-w-2xl leading-relaxed text-lg">
            Prime & Shine Windows is currently building its customer review portfolio. We're excited to share what our neighbors are saying about us soon!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-30 grayscale pointer-events-none">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl space-y-6 text-left border border-sky-blue/30">
              <div className="flex gap-1 text-gold">
                {[1,2,3,4,5].map(j => <Star key={j} size={18} fill="currentColor" />)}
              </div>
              <div className="space-y-3">
                <div className="h-4 w-3/4 bg-sky-blue/50 rounded-full" />
                <div className="h-4 w-full bg-sky-blue/50 rounded-full" />
                <div className="h-4 w-1/2 bg-sky-blue/50 rounded-full" />
              </div>
              <div className="flex items-center gap-4 pt-6 border-t border-sky-blue/20">
                <div className="w-12 h-12 rounded-2xl bg-sky-blue/50 flex items-center justify-center text-rich-blue">
                  <MessageCircle size={20} />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-sky-blue/50 rounded-full" />
                  <div className="h-3 w-16 bg-sky-blue/30 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-sky-blue/20 rounded-full -z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-sky-blue/10 rounded-full -z-0" />
    </section>
  );
}
