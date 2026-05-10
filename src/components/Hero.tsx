import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background with softer tint */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pale-blue via-sky-blue/30 to-warm-cream/20" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-bright-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-sky-blue">
            <span className="w-2 h-2 bg-rich-blue rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-rich-blue">Local Toronto Business</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] text-navy">
            Bright Windows. <br />
            <span className="text-rich-blue relative z-10">
              Happier Homes.
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-3 bg-gold/20 -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </h1>

          <p className="text-lg text-muted-text max-w-xl leading-relaxed font-medium">
            Prime & Shine Windows helps homeowners across Toronto and surrounding areas enjoy cleaner, clearer windows with friendly service and careful attention to detail.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-rich-blue hover:bg-navy text-white rounded-full px-10 h-16 text-base shadow-xl hover:scale-105 transition-all"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a Cleaning <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/50 border-rich-blue/20 text-rich-blue hover:bg-white rounded-full px-10 h-16 text-base"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Our Services
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
            {[
              "Simple & Friendly",
              "Local Toronto",
              "Home Focused",
              "Pay After Cleaning"
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-blue flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-rich-blue" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-muted-text">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:ml-auto"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
            <img 
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop" 
              alt="Sparkling Windows" 
              className="w-full h-full object-cover aspect-[4/5]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
          </div>
          
          {/* Glassmorphic floating card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 z-20 glass p-8 rounded-3xl max-w-[280px]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="font-bold text-navy">Friendly Review</p>
                <div className="flex gap-1 text-gold">
                  {[1,2,3,4,5].map(i => <Sparkles key={i} size={12} fill="currentColor" />) }
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-text leading-relaxed font-medium">
              "They were so friendly and professional. Our windows have never looked this bright!"
            </p>
          </motion.div>

          {/* Decorative background blobs */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-warm-cream rounded-full blur-2xl opacity-60 -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
