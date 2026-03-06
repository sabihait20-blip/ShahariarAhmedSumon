/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Politics from './pages/Politics';
import Gallery from './pages/Gallery';

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

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen poster-gradient">
          <Navbar />
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/politics" element={<Politics />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </main>
          
          <footer className="mt-20 text-center text-sm text-[#1b5e20]/60 font-medium border-t border-[#2e7d32]/10 pt-10 pb-10">
            <p className="mt-1">
              © ২০২৬ ইঞ্জিঃ শাহরিয়ার আহমেদ সুমন | ডিজাইন : নুরনবী রহমান
            </p>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

