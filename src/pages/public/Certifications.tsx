import { useState, useEffect } from 'react';
import { getCertifications } from '../../lib/api';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export default function Certifications() {
  const [certText, setCertText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications().then(data => {
      setCertText(data.text);
      setLoading(false);
    });
  }, []);

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Award className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Certifications</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-slate-100 text-center"
          >
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
              "{certText}"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
