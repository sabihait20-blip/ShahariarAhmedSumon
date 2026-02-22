import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { VideoPlayer } from './components/VideoPlayer';
import { ChannelCard } from './components/ChannelCard';
import { ProgramGuide } from './components/ProgramGuide';
import { CHANNELS, CATEGORIES } from './constants';
import { Channel } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Tv, Bell, User } from 'lucide-react';

export default function App() {
  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredChannels = useMemo(() => {
    if (activeCategory === 'All') return CHANNELS;
    return CHANNELS.filter(ch => ch.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex min-h-screen bg-bg-main text-brand-primary selection:bg-brand-accent/30">
      <Sidebar 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
        categories={CATEGORIES} 
      />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Viewer</h1>
            <p className="text-brand-secondary text-sm">Discover what's happening live right now.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all relative">
              <Bell size={20} className="text-brand-secondary" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-accent rounded-full border-2 border-bg-main" />
            </button>
            <button className="flex items-center gap-3 p-1.5 pr-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-indigo-600 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <span className="text-sm font-medium">Alex Rivera</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-8">
            {/* Player Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChannel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <VideoPlayer channel={activeChannel} />
              </motion.div>
            </AnimatePresence>

            {/* Channels Grid Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Tv className="text-brand-secondary" size={18} />
                  </div>
                  <h2 className="text-xl font-bold">Live Channels</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-secondary font-medium">{filteredChannels.length} Channels found</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredChannels.map((channel) => (
                  <motion.div
                    key={channel.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChannelCard 
                      channel={channel} 
                      isActive={activeChannel.id === channel.id}
                      onClick={() => setActiveChannel(channel)}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info Area */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChannel.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProgramGuide channel={activeChannel} />
              </motion.div>
            </AnimatePresence>

            {/* Recommendations or Stats */}
            <div className="glass rounded-3xl p-6 overflow-hidden relative group">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-accent/20 blur-3xl rounded-full group-hover:bg-brand-accent/30 transition-all" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-2">Premium Feature</h3>
              <h4 className="text-lg font-bold mb-4">Upgrade to Lumina+</h4>
              <p className="text-xs text-brand-secondary leading-relaxed mb-6">
                Get access to 4K streaming, multi-view, and unlimited cloud DVR recording.
              </p>
              <button className="w-full py-3 rounded-xl bg-brand-accent text-white text-sm font-bold shadow-lg shadow-brand-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
