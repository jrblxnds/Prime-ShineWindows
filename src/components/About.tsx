import { motion } from 'motion/react';
import { ShieldCheck, Clock, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-pale-blue">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop" 
                alt="Window Cleaning Detail" 
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-rich-blue text-white p-8 rounded-3xl shadow-xl">
              <p className="text-3xl font-bold font-display">100%</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Local Trust</p>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-pale-blue px-4 py-2 rounded-full shadow-sm border border-sky-blue"
              >
                <span className="w-2 h-2 bg-rich-blue rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-rich-blue">Our Story</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy italic">Friendly, Local, <br />And Reliable.</h2>
              <p className="text-lg text-muted-text leading-relaxed">
                Prime & Shine Windows was built on the foundation of providing Toronto homeowners with a friendly, worry-free window cleaning experience. We focus on meticulous detail and owner-operated care that ensures every window shines like new.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: ShieldCheck, title: "Friendly Support", desc: "Real people, real service." },
                { icon: Clock, title: "On-Time Service", desc: "We value your time." },
                { icon: Heart, title: "Detail Oriented", desc: "No spot left behind." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-pale-blue/50 border border-sky-blue/30">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rich-blue shadow-sm shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">{item.title}</h4>
                    <p className="text-xs text-muted-text">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
