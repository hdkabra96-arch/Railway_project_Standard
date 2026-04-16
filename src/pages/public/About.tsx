import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-6">About RailCorp</h1>
            <div className="w-20 h-1 bg-orange-500 mb-8"></div>
            <div className="prose prose-lg text-slate-600">
              <p className="mb-6">
                Founded in 1998, RailCorp has grown to become one of the most trusted names in railway infrastructure development. We specialize in delivering end-to-end solutions for both high-speed passenger networks and heavy-haul freight corridors.
              </p>
              <p className="mb-6">
                Our team comprises industry-leading engineers, project managers, and technical specialists who bring decades of combined experience to every project. We pride ourselves on our ability to execute complex engineering tasks while minimizing disruption to existing services.
              </p>
              <p>
                From initial feasibility studies to final commissioning, RailCorp is committed to building sustainable, efficient, and safe railway networks that connect communities and drive economic growth.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1560001099-2a912a7a5180?auto=format&fit=crop&q=80&w=1000" 
              alt="Railway Engineering" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-4xl font-bold text-orange-500 mb-2">25+</div>
              <div className="text-sm font-medium uppercase tracking-wider">Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
