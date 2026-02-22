import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Maximize, Volume2, VolumeX, Play, Pause, Settings, SkipForward } from 'lucide-react';
import { Channel } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VideoPlayerProps {
  channel: Channel;
}

const Player = ReactPlayer as any;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ channel }) => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showControls, setShowControls] = useState(false);

  return (
    <div 
      className="relative aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Player
        url={channel.streamUrl}
        width="100%"
        height="100%"
        playing={playing}
        muted={muted}
        volume={volume}
        loop
        playsinline
      />

      {/* Overlay Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300",
        showControls ? "opacity-100" : "opacity-0"
      )} />

      {/* Top Bar */}
      <div className={cn(
        "absolute top-0 inset-x-0 p-6 flex items-center justify-between transition-transform duration-300",
        showControls ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-red-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Live
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold leading-tight">{channel.name}</h2>
            <p className="text-xs text-brand-secondary">{channel.currentProgram?.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Center Play/Pause (Mobile/Click) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button 
          onClick={() => setPlaying(!playing)}
          className={cn(
            "w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 pointer-events-auto",
            showControls ? "scale-100 opacity-100" : "scale-90 opacity-0"
          )}
        >
          {playing ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
        </button>
      </div>

      {/* Bottom Controls */}
      <div className={cn(
        "absolute bottom-0 inset-x-0 p-6 flex items-center justify-between transition-transform duration-300",
        showControls ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group/volume">
            <button onClick={() => setMuted(!muted)} className="text-white hover:text-brand-accent transition-colors">
              {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-brand-accent"
            />
          </div>
          <div className="text-xs font-mono text-brand-secondary">
            <span className="text-white">LIVE</span> • 1080p HD
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
            <SkipForward size={16} />
            Next Channel
          </button>
          <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
