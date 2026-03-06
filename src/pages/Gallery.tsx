import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Camera, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const Gallery = () => {
  const images = [
    { url: 'https://i.postimg.cc/m2ms8YmX/IMG-20260307-WA0001.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ১' },
    { url: 'https://i.postimg.cc/SNS46TfD/IMG-20260307-WA0002.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ২' },
    { url: 'https://i.postimg.cc/qMJrsbxm/IMG-20260307-WA0004.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ৩' },
    { url: 'https://i.postimg.cc/9Fm2d8Y8/IMG-20260307-WA0005.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ৪' },
    { url: 'https://i.postimg.cc/3J8hXSFX/IMG-20260307-WA0006.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ৫' },
    { url: 'https://i.postimg.cc/bNyPxC9m/IMG-20260307-WA0007.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ৬' },
    { url: 'https://i.postimg.cc/8PpGRKmn/IMG-20260307-WA0008.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ৭' },
    { url: 'https://i.postimg.cc/HsYmwZ9f/IMG-20260307-WA0009.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ৮' },
    { url: 'https://i.postimg.cc/qMJrsbxS/IMG-20260307-WA0010.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ৯' },
    { url: 'https://i.postimg.cc/8PZStRZX/IMG-20260307-WA0011.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ১০' },
    { url: 'https://i.postimg.cc/sDTrwYTN/IMG-20260307-WA0012.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ১১' },
    { url: 'https://i.postimg.cc/ZKwSV8wf/IMG-20260307-WA0013.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ১২' },
    { url: 'https://i.postimg.cc/4NfG6LQD/IMG-20260307-WA0014.jpg', title: 'রাজনৈতিক কর্মকাণ্ড ১৩' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1b5e20] mb-4 flex items-center justify-center gap-4">
          <Camera size={40} className="text-[#2e7d32]" /> ফটো গ্যালারি
        </h1>
        <p className="text-xl text-[#2e7d32] font-medium max-w-2xl mx-auto">
          স্মৃতিতে অমলিন আমাদের রাজনৈতিক ও সামাজিক পথচলার কিছু খণ্ডচিত্র।
        </p>
      </div>

      {/* Professional Slider Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[600px] w-full overflow-hidden rounded-[32px] md:rounded-[40px] shadow-2xl mb-16 bg-black">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full object-contain md:object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent z-10">
          <motion.h3 
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg md:text-3xl font-bold text-white text-center"
          >
            {images[currentIndex].title}
          </motion.h3>
          <div className="flex justify-center gap-1 md:gap-2 mt-2 md:mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#fbc02d] w-4 md:w-8' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={20} className="md:hidden" />
          <ChevronLeft size={32} className="hidden md:block" />
        </button>
        <button
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
          onClick={() => paginate(1)}
        >
          <ChevronRight size={20} className="md:hidden" />
          <ChevronRight size={32} className="hidden md:block" />
        </button>
      </div>

      {/* Grid View Section */}
      <h2 className="text-3xl font-bold text-[#1b5e20] mb-8 text-center">সব ছবি একনজরে</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="group relative bg-white rounded-[32px] overflow-hidden shadow-lg border border-gray-100 aspect-square cursor-pointer"
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          >
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <Maximize2 size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center p-12 bg-[#2e7d32]/5 rounded-[40px] border border-dashed border-[#2e7d32]/20">
         <ImageIcon size={64} className="text-[#2e7d32] mx-auto mb-4 opacity-30" />
         <p className="text-[#1b5e20] font-bold text-xl italic">"সংগ্রামের প্রতিটি মুহূর্ত ইতিহাসের পাতায় অমলিন"</p>
      </div>
    </motion.div>
  );
};

export default Gallery;

