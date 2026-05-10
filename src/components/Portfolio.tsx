import { PORTFOLIO_ITEMS } from '../constants';
import { motion } from 'motion/react';

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-pale-blue px-4 py-2 rounded-full shadow-sm border border-sky-blue"
          >
            <span className="w-2 h-2 bg-rich-blue rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-rich-blue">Our Project Style</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy italic">Friendly Neighborhood Results</h2>
          <p className="text-muted-text max-w-2xl leading-relaxed text-lg italic">
            Sample Portfolio Images. Real project photos coming soon. These visuals represent the type of work Prime & Shine Windows provides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-[3rem] overflow-hidden aspect-[4/3] bg-pale-blue border-[8px] border-pale-blue shadow-lg"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white rounded-full mb-3 border border-white/30 font-sans">
                  {item.category}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
              </div>
              
              <div className="absolute top-6 right-6 bg-white shadow-xl px-4 py-2 rounded-full border border-sky-blue">
                <span className="text-[10px] uppercase font-black text-rich-blue tracking-widest">Sample View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
