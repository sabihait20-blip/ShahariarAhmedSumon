/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, MessageSquare, Send, CheckCircle, Quote, Star, Shield, Heart, Info, AlertCircle } from 'lucide-react';
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Comment {
  id: string;
  name: string;
  village: string;
  mobile: string;
  text: string;
  date: string;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-purple-50">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">দুঃখিত, একটি সমস্যা হয়েছে</h2>
            <p className="text-gray-600 mb-6">অনুগ্রহ করে পেজটি রিফ্রেশ করুন অথবা পরে চেষ্টা করুন।</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
            >
              রিফ্রেশ করুন
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [submitted, setSubmitted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    village: '',
    comment: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          village: data.village,
          mobile: data.mobile,
          text: data.text,
          date: data.createdAt ? new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(data.createdAt)) : 'এখনই'
        };
      });
      setComments(fetchedComments);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'comments');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const maskedMobile = formData.mobile.replace(/(\d{3})\d{6}(\d{2})/, '$1******$2');
      await addDoc(collection(db, 'comments'), {
        name: formData.name,
        village: formData.village,
        mobile: maskedMobile,
        text: formData.comment,
        createdAt: new Date().toISOString()
      });

      setSubmitted(true);
      setFormData({ name: '', mobile: '', village: '', comment: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'comments');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen poster-gradient pb-20">
      {/* Top Header */}
      <div className="max-w-[800px] mx-auto pt-6 px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="red-box px-6 py-1 rounded-md font-bold text-sm mb-4 animate-fade-in shadow-md">
            বিসমিল্লাহির রাহমানির রাহিম
          </div>
          <div className="text-center text-[#1b5e20] font-bold text-lg leading-tight mb-4">
            গণতন্ত্র<br />ন্যায়বিচার<br />অধিকার<br />জাতীয়স্বার্থ
          </div>
          
          <div className="w-full flex justify-between items-start">
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2 text-[#d32f2f] font-bold text-sm">
                <Quote size={16} fill="currentColor" /> স্মার্ট ও ডিজিটাল
              </div>
              <div className="text-[#1b5e20] font-bold text-sm leading-tight">
                বকশীগঞ্জ উপজেলা বিনির্মাণে ও<br />
                উন্নয়নের ধারা অব্যাহত রাখতে
              </div>
            </div>
            
            <div className="text-right space-y-1">
              <div className="flex items-center justify-end gap-2 text-[#1b5e20] font-bold text-sm">
                জনতার অধিকার <Star size={12} fill="currentColor" className="text-[#fbc02d]" />
              </div>
              <div className="flex items-center justify-end gap-2 text-[#1b5e20] font-bold text-sm">
                আমাদের অঙ্গীকার <Star size={12} fill="currentColor" className="text-[#fbc02d]" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 md:order-1 text-center md:text-left space-y-6">
            <div className="space-y-2">
              
              <div className="bg-[#fbc02d] text-black px-4 py-2 rounded-full font-bold text-lg inline-flex items-center gap-2 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse" />
                বকশীগঞ্জ উপজেলা পরিষদ নির্বাচনে
              </div>
              
              <div className="bg-white/90 border-l-4 border-[#2e7d32] p-4 rounded-r-2xl shadow-sm">
                <div className="text-[#2e7d32] font-bold text-xl">গণঅধিকার পরিষদ (জিওপি)</div>
                <div className="text-[#1b5e20] font-medium">বকশীগঞ্জ উপজেলা শাখা'র আহ্বায়ক</div>
                <div className="text-[#d32f2f] font-bold mt-1">ফ্যাসিবাদ বিরোধী আন্দোলনের অন্যতম সংগঠক</div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="absolute inset-0 bg-[#2e7d32]/5 rounded-full blur-3xl" />
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-green-500 animate-spin-slow" />
              <div className="absolute inset-4 md:inset-6 rounded-full border-4 border-green-600 animate-pulse-soft" />
              <div className="absolute inset-8 md:inset-12 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img 
                  src="https://i.postimg.cc/YS26ZZwK/sumon-vai-png.png" 
                  alt="Engr. Shahriar Ahmed Suman" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            {/* Small floating photos from image */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden hidden md:block">
              <img src="https://picsum.photos/seed/suman1/200" alt="Leader" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-12 -left-4 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden hidden md:block">
              <img src="https://picsum.photos/seed/suman2/200" alt="Leader" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Candidate Name & Position */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block green-box px-10 py-4 rounded-xl text-3xl md:text-4xl font-bold shadow-xl transform -rotate-1 hover:rotate-0 transition-transform">
            ইঞ্জিঃ শাহরিয়ার আহমেদ সুমন ভাই কে
          </div>
          
          <div className="relative py-4 flex justify-center items-center">
            <div className="absolute w-full h-1 bg-[#d32f2f] opacity-20" />
            <div className="relative bg-[#d32f2f] text-white px-10 py-3 rounded-full text-2xl md:text-3xl font-bold shadow-lg flex items-center gap-3">
              ভাইস চেয়ারম্যান <Shield size={28} />
            </div>
          </div>
          
          <div className="text-4xl md:text-5xl font-bold text-[#1b5e20] tracking-tighter shadow-text">
            হিসাবে দেখতে চাই
          </div>
        </div>

        {/* Comment Section */}
        <div id="comments" className="glass-card rounded-[40px] p-8 md:p-12 text-left relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#2e7d32]/5 rounded-full -mr-20 -mt-20 blur-3xl" />
          
          <div className="relative">
            <h3 className="text-3xl font-bold mb-2 text-[#1b5e20] flex items-center gap-3">
              আপনার মতামত দিন <Heart className="text-[#d32f2f]" fill="#d32f2f" size={28} />
            </h3>
            <p className="text-[#2e7d32] mb-10 font-medium">বকশীগঞ্জ উপজেলার উন্নয়নে আপনার সুচিন্তিত মতামত আমাদের কাম্য।</p>
            
            {submitted && (
              <div className="mb-8 p-4 bg-green-100 border border-green-200 text-green-800 rounded-2xl flex items-center gap-3 animate-bounce">
                <CheckCircle size={24} /> আপনার মতামত সফলভাবে জমা হয়েছে!
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1b5e20] ml-2">আপনার নাম</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e7d32]/50" size={20} />
                  <input 
                    type="text"
                    name="name"
                    placeholder="নাম লিখুন" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 pl-12 rounded-2xl outline-none input-field text-[#1b5e20] font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1b5e20] ml-2">মোবাইল নম্বর</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e7d32]/50" size={20} />
                  <input 
                    type="tel"
                    name="mobile"
                    placeholder="মোবাইল নম্বর" 
                    required 
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-4 pl-12 rounded-2xl outline-none input-field text-[#1b5e20] font-medium"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#1b5e20] ml-2">গ্রামের নাম</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e7d32]/50" size={20} />
                  <input 
                    type="text"
                    name="village"
                    placeholder="আপনার গ্রামের নাম লিখুন" 
                    required 
                    value={formData.village}
                    onChange={handleChange}
                    className="w-full p-4 pl-12 rounded-2xl outline-none input-field text-[#1b5e20] font-medium"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#1b5e20] ml-2">আপনার মন্তব্য</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 text-[#2e7d32]/50" size={20} />
                  <textarea 
                    name="comment"
                    placeholder="এখানে আপনার মতামত বা প্রত্যাশা লিখুন..." 
                    required 
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full p-4 pl-12 rounded-2xl min-h-[150px] outline-none input-field text-[#1b5e20] font-medium resize-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full p-5 bg-[#2e7d32] text-white font-extrabold text-xl rounded-2xl shadow-xl hover:bg-[#1b5e20] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  মতামত জমা দিন <Send size={24} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Recent Comments List */}
        <div className="space-y-6">
          <h4 className="text-2xl font-bold text-[#1b5e20] flex items-center gap-2 px-4">
            <Info size={24} /> সাম্প্রতিক মতামতসমূহ
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comments.map((c) => (
              <div key={c.id} className="bg-white/60 p-6 rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold text-[#1b5e20]">{c.name}</div>
                    <div className="text-xs text-[#2e7d32] flex items-center gap-1">
                      <MapPin size={10} /> {c.village}
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">{c.date}</div>
                </div>
                <p className="text-sm text-[#1b5e20]/80 italic leading-relaxed">
                  "{c.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-20 text-center text-sm text-[#1b5e20]/60 font-medium border-t border-[#2e7d32]/10 pt-10">
          {/* Footer content removed */}
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

