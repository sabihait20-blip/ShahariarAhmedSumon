import React from 'react';
import { motion } from 'motion/react';
import { User, Award, BookOpen, MapPin } from 'lucide-react';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <div className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2e7d32]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="w-48 h-48 rounded-full border-8 border-white shadow-xl overflow-hidden flex-shrink-0">
              <img 
                src="https://i.postimg.cc/YS26ZZwK/sumon-vai-png.png" 
                alt="Engr. Shahriar Ahmed Suman" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-[#1b5e20] mb-2">ইঞ্জিঃ শাহরিয়ার আহমেদ সুমন</h1>
              <p className="text-xl text-[#2e7d32] font-medium">আহ্বায়ক, গণঅধিকার পরিষদ (জিওপি), বকশীগঞ্জ উপজেলা</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-gray-600">
                <MapPin size={18} /> <span>বকশীগঞ্জ, জামালপুর</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#2e7d32]/10 rounded-2xl flex items-center justify-center text-[#2e7d32] flex-shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1b5e20] mb-2">শিক্ষাগত যোগ্যতা</h3>
                  <p className="text-gray-700 leading-relaxed">
                    ইঞ্জিনিয়ারিং সম্পন্ন করার পর তিনি বকশীগঞ্জ উপজেলার মানুষের সেবায় নিজেকে নিয়োজিত করেছেন। শিক্ষার আলো ছড়িয়ে দিতে তিনি সর্বদা সচেষ্ট।
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#2e7d32]/10 rounded-2xl flex items-center justify-center text-[#2e7d32] flex-shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1b5e20] mb-2">সামাজিক কর্মকাণ্ড</h3>
                  <p className="text-gray-700 leading-relaxed">
                    দীর্ঘদিন ধরে তিনি বকশীগঞ্জের বিভিন্ন সামাজিক ও সাংস্কৃতিক সংগঠনের সাথে যুক্ত থেকে আর্তমানবতার সেবায় কাজ করে যাচ্ছেন।
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2e7d32]/5 p-8 rounded-[32px] border border-[#2e7d32]/10">
              <h3 className="text-xl font-bold text-[#1b5e20] mb-4 flex items-center gap-2">
                <User size={20} /> জীবন দর্শন
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                "রাজনীতি মানেই মানুষের সেবা। বকশীগঞ্জকে একটি আধুনিক, স্মার্ট এবং দুর্নীতিমুক্ত উপজেলা হিসেবে গড়ে তোলাই আমার প্রধান লক্ষ্য। আমি বিশ্বাস করি, তারুণ্যের শক্তিই পারে সমাজকে বদলে দিতে।"
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
