import React from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Camera, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const images = [
    { url: 'https://picsum.photos/seed/suman1/800/600', title: 'জনসভা', category: 'রাজনৈতিক' },
    { url: 'https://picsum.photos/seed/suman2/800/600', title: 'মতবিনিময় সভা', category: 'রাজনৈতিক' },
    { url: 'https://picsum.photos/seed/suman3/800/600', title: 'ত্রাণ বিতরণ', category: 'সামাজিক' },
    { url: 'https://picsum.photos/seed/suman4/800/600', title: 'যুব সম্মেলন', category: 'রাজনৈতিক' },
    { url: 'https://picsum.photos/seed/suman5/800/600', title: 'শিক্ষা সফর', category: 'সামাজিক' },
    { url: 'https://picsum.photos/seed/suman6/800/600', title: 'বিজয় দিবস উদযাপন', category: 'সাংস্কৃতিক' },
    { url: 'https://picsum.photos/seed/suman7/800/600', title: 'ইফতার মাহফিল', category: 'সামাজিক' },
    { url: 'https://picsum.photos/seed/suman8/800/600', title: 'পথসভা', category: 'রাজনৈতিক' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1b5e20] mb-4 flex items-center justify-center gap-4">
          <Camera size={48} className="text-[#2e7d32]" /> ফটো গ্যালারি
        </h1>
        <p className="text-xl text-[#2e7d32] font-medium max-w-2xl mx-auto">
          বকশীগঞ্জ উপজেলার বিভিন্ন প্রান্তে আমাদের রাজনৈতিক ও সামাজিক কর্মকাণ্ডের কিছু মুহূর্ত।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="group relative bg-white rounded-[32px] overflow-hidden shadow-xl border border-[#2e7d32]/10 aspect-square"
          >
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#fbc02d] uppercase tracking-wider mb-1 block">{img.category}</span>
                  <h3 className="text-xl font-bold text-white">{img.title}</h3>
                </div>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                   <ZoomIn size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center p-12 bg-[#2e7d32]/5 rounded-[40px] border border-dashed border-[#2e7d32]/20">
         <ImageIcon size={64} className="text-[#2e7d32] mx-auto mb-4 opacity-30" />
         <p className="text-[#1b5e20] font-bold text-xl">আরও ছবি শীঘ্রই আসছে...</p>
      </div>
    </motion.div>
  );
};

export default Gallery;
