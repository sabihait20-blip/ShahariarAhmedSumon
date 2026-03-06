import React from 'react';
import { motion } from 'motion/react';
import { Flag, Shield, Users, Target } from 'lucide-react';

const Politics = () => {
  const goals = [
    { icon: <Flag size={24} />, title: 'গণতন্ত্র', text: 'সুষ্ঠু ও নিরপেক্ষ নির্বাচনের মাধ্যমে জনগণের অধিকার প্রতিষ্ঠা।' },
    { icon: <Shield size={24} />, title: 'ন্যায়বিচার', text: 'সকলের জন্য সমান বিচার এবং আইনের শাসন নিশ্চিত করা।' },
    { icon: <Users size={24} />, title: 'অধিকার', text: 'জনগণের মৌলিক অধিকার রক্ষায় আপসহীন লড়াই।' },
    { icon: <Target size={24} />, title: 'জাতীয়স্বার্থ', text: 'দেশের ও জনগণের স্বার্থকে সবার উপরে স্থান দেওয়া।' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1b5e20] mb-4">রাজনৈতিক দর্শন ও লক্ষ্য</h1>
        <p className="text-xl text-[#2e7d32] font-medium max-w-2xl mx-auto">
          গণঅধিকার পরিষদ (জিওপি) বকশীগঞ্জ উপজেলা শাখার মাধ্যমে আমরা একটি বৈষম্যহীন সমাজ গড়তে চাই।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-[32px] shadow-xl border border-[#2e7d32]/10 text-center"
          >
            <div className="w-16 h-16 bg-[#2e7d32]/10 rounded-2xl flex items-center justify-center text-[#2e7d32] mx-auto mb-6">
              {goal.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#1b5e20] mb-4">{goal.title}</h3>
            <p className="text-gray-600 leading-relaxed">{goal.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#d32f2f]/5 rounded-full -ml-32 -mt-32 blur-3xl" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#1b5e20]">আমাদের অঙ্গীকার</h2>
            <ul className="space-y-4">
              {[
                'দুর্নীতিমুক্ত উপজেলা প্রশাসন গড়ে তোলা।',
                'তরুণদের কর্মসংস্থান ও উদ্যোক্তা তৈরিতে সহায়তা।',
                'শিক্ষা ও স্বাস্থ্য সেবার মানোন্নয়ন।',
                'কৃষকদের ন্যায্য মূল্য নিশ্চিত করা।',
                'মাদক ও সন্ত্রাসমুক্ত বকশীগঞ্জ বিনির্মাণ।'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                  <div className="w-6 h-6 bg-[#2e7d32] rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                    <Shield size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
             <div className="aspect-video bg-[#2e7d32]/10 rounded-[32px] flex items-center justify-center border-4 border-dashed border-[#2e7d32]/20">
                <div className="text-center p-8">
                   <Flag size={64} className="text-[#2e7d32] mx-auto mb-4" />
                   <p className="text-[#1b5e20] font-bold text-xl italic">"জনতার অধিকার, আমাদের অঙ্গীকার"</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Politics;
