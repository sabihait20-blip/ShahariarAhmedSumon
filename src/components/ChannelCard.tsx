import React from 'react';
import { Channel } from '../types';
import { Play, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChannelCardProps {
  channel: Channel;
  isActive: boolean;
  onClick: () => void;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-3 p-4 rounded-2xl transition-all cursor-pointer overflow-hidden",
        isActive 
          ? "bg-white/10 ring-1 ring-white/20" 
          : "bg-bg-card hover:bg-white/5"
      )}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40">
        <img 
          src={`https://picsum.photos/seed/${channel.id}/400/225`} 
          alt={channel.name}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
        </div>

        <div className={cn(
          "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
          isActive && "opacity-100"
        )}>
          <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center shadow-xl shadow-brand-accent/40">
            <Play className="text-white fill-white ml-1" size={20} />
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate group-hover:text-brand-accent transition-colors">
            {channel.name}
          </h3>
          <p className="text-xs text-brand-secondary truncate mt-0.5">
            {channel.currentProgram?.title}
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
          <img src={channel.logo} alt="" className="w-5 h-5 rounded-sm opacity-80" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="mt-auto pt-2 flex items-center justify-between border-t border-white/5">
        <span className="text-[10px] font-medium text-brand-secondary uppercase tracking-wider">
          {channel.category}
        </span>
        <button className="text-brand-secondary hover:text-white transition-colors">
          <Info size={14} />
        </button>
      </div>
    </div>
  );
};
