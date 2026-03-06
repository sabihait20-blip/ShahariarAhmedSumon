import React from 'react';
import { motion } from 'motion/react';
import { User, Award, BookOpen, MapPin, Briefcase, GraduationCap, Phone, Mail, Calendar, Heart, Shield } from 'lucide-react';

const About = () => {
  const education = [
    {
      degree: 'বিএসসি ইন মেকানিক্যাল ইঞ্জিনিয়ারিং',
      institute: 'সোনারগাঁও ইউনিভার্সিটি (SU)',
      result: 'CGPA: ৩.১১ (৪ এর মধ্যে)',
      year: '২০১৭'
    },
    {
      degree: 'এইচএসসি (বিজ্ঞান)',
      institute: 'বকশীগঞ্জ সরকারি কিয়ামতুল্লাহ কলেজ',
      result: 'GPA: ৪.৭ (৫ এর মধ্যে)',
      year: '২০১৩'
    },
    {
      degree: 'এসএসসি (বিজ্ঞান)',
      institute: 'মেরুরচর হাসেন আলী উচ্চ বিদ্যালয়',
      result: 'GPA: ৪.৪৪ (৫ এর মধ্যে)',
      year: '২০১১'
    }
  ];

  const experience = [
    {
      role: 'সিনিয়র মার্কেটিং অফিসার',
      company: 'এসিআই এনিম্যাল হেলথ (ACI Animal Health)',
      location: 'তেজগাঁও, ঢাকা',
      duration: '৫ বছর'
    }
  ];

  const personalDetails = [
    { label: 'পিতার নাম', value: 'মোঃ সহিদুল হক' },
    { label: 'মাতার নাম', value: 'মোছাঃ মলিনা বেগম' },
    { label: 'জন্ম তারিখ', value: '১৫ মার্চ, ১৯৯৫' },
    { label: 'ধর্ম', value: 'ইসলাম' },
    { label: 'জাতীয়তা', value: 'বাংলাদেশী' },
    { label: 'বৈবাহিক অবস্থা', value: 'অবিবাহিত' },
    { label: 'স্থায়ী ঠিকানা', value: 'মেরুরচর খান পাড়া, বকশীগঞ্জ, জামালপুর' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-12 px-4"
    >
      {/* Profile Header */}
      <div className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden relative mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2e7d32]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl border-8 border-white shadow-2xl overflow-hidden flex-shrink-0 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://i.postimg.cc/YS26ZZwK/sumon-vai-png.png" 
              alt="শাহরিয়ার আহমেদ সুমন" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1b5e20] mb-2">শাহরিয়ার আহমেদ সুমন</h1>
            <p className="text-lg sm:text-xl text-[#2e7d32] font-bold mb-4">ইঞ্জিনিয়ার ও সমাজসেবক</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 text-gray-600 font-medium text-sm sm:text-base">
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-white/40">
                <Phone size={16} className="text-[#2e7d32]" /> <span>০১৭৭৯-৩৪৮৫০৩</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-white/40">
                <Mail size={16} className="text-[#2e7d32]" /> <span>sumon.me2018@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-white/40">
                <MapPin size={16} className="text-[#2e7d32]" /> <span>বকশীগঞ্জ, জামালপুর</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Objective & Personal */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-white/40">
            <h3 className="text-xl font-bold text-[#1b5e20] mb-4 flex items-center gap-2">
              <Shield size={20} className="text-[#d32f2f]" /> লক্ষ্য ও উদ্দেশ্য
            </h3>
            <p className="text-gray-700 leading-relaxed italic">
              "পেশাগত দক্ষতা এবং সততার সাথে দায়িত্ব পালন করে বকশীগঞ্জ উপজেলাকে একটি আধুনিক ও উন্নত জনপদ হিসেবে গড়ে তোলাই আমার প্রধান লক্ষ্য।"
            </p>
          </section>

          <section className="bg-white/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-white/40">
            <h3 className="text-xl font-bold text-[#1b5e20] mb-6 flex items-center gap-2">
              <User size={20} /> ব্যক্তিগত তথ্য
            </h3>
            <div className="space-y-4">
              {personalDetails.map((detail, i) => (
                <div key={i} className="border-b border-gray-100 pb-2 last:border-0">
                  <div className="text-xs font-bold text-gray-400 uppercase">{detail.label}</div>
                  <div className="text-[#1b5e20] font-medium">{detail.value}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Education & Experience */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          <section className="bg-white/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-white/40">
            <h3 className="text-2xl font-bold text-[#1b5e20] mb-8 flex items-center gap-3">
              <Briefcase className="text-[#2e7d32]" /> কর্মজীবন (Employment History)
            </h3>
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#2e7d32] before:rounded-full">
                  <h4 className="text-xl font-bold text-[#1b5e20]">{exp.role}</h4>
                  <div className="text-[#2e7d32] font-bold text-lg">{exp.company}</div>
                  <div className="flex items-center gap-4 mt-2 text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {exp.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {exp.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-white/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-white/40">
            <h3 className="text-2xl font-bold text-[#1b5e20] mb-8 flex items-center gap-3">
              <GraduationCap className="text-[#2e7d32]" /> শিক্ষাগত যোগ্যতা (Academic)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, i) => (
                <div key={i} className="bg-[#2e7d32]/5 p-6 rounded-2xl border border-[#2e7d32]/10 hover:bg-[#2e7d32]/10 transition-colors">
                  <div className="text-xs font-bold text-[#2e7d32] mb-1">{edu.year}</div>
                  <h4 className="font-bold text-[#1b5e20] mb-2">{edu.degree}</h4>
                  <div className="text-sm text-gray-600 mb-2">{edu.institute}</div>
                  <div className="inline-block bg-white px-3 py-1 rounded-full text-xs font-bold text-[#2e7d32] shadow-sm">
                    {edu.result}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Special Qualifications */}
          <section className="bg-white/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-white/40">
            <h3 className="text-2xl font-bold text-[#1b5e20] mb-6 flex items-center gap-3">
              <Award className="text-[#2e7d32]" /> বিশেষ দক্ষতা ও গুণাবলী
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'চাপের মধ্যে কাজ করার ক্ষমতা',
                'দলগত কাজে পারদর্শী',
                'মার্জিত ও ভদ্র আচরণ',
                'দায়িত্বশীল ও দক্ষ',
                'দ্রুত মানিয়ে নেওয়ার ক্ষমতা'
              ].map((skill, i) => (
                <span key={i} className="bg-[#2e7d32]/10 text-[#1b5e20] px-4 py-2 rounded-xl font-bold text-sm border border-[#2e7d32]/20">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
