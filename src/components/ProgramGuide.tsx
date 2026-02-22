import React from 'react';
import { Channel } from '../types';
import { format, parseISO } from 'date-fns';
import { Clock, Calendar } from 'lucide-react';

interface ProgramGuideProps {
  channel: Channel;
}

export const ProgramGuide: React.FC<ProgramGuideProps> = ({ channel }) => {
  const allPrograms = [channel.currentProgram, ...channel.upcomingPrograms].filter(Boolean);

  return (
    <div className="bg-bg-card rounded-3xl p-6 border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
            <Calendar className="text-brand-accent" size={18} />
          </div>
          <h3 className="text-lg font-bold">Program Guide</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-brand-secondary uppercase tracking-wider">
          Today
        </div>
      </div>

      <div className="space-y-4">
        {allPrograms.map((program, idx) => (
          <div 
            key={program?.id} 
            className={`relative pl-8 pb-6 last:pb-0 group`}
          >
            {/* Timeline Line */}
            <div className="absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-white/5 group-last:hidden" />
            
            {/* Timeline Dot */}
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-bg-card flex items-center justify-center transition-colors ${idx === 0 ? 'bg-brand-accent' : 'bg-white/10'}`}>
              {idx === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${idx === 0 ? 'text-brand-accent' : 'text-brand-secondary'}`}>
                  {format(parseISO(program!.startTime), 'HH:mm')} - {format(parseISO(program!.endTime), 'HH:mm')}
                </span>
                {idx === 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-brand-accent/10 text-[9px] font-bold text-brand-accent uppercase tracking-wider">
                    Now Playing
                  </span>
                )}
              </div>
              <h4 className={`font-semibold ${idx === 0 ? 'text-white' : 'text-brand-secondary'}`}>
                {program?.title}
              </h4>
              <p className="text-xs text-brand-secondary/60 line-clamp-2 leading-relaxed">
                {program?.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-brand-secondary transition-all flex items-center justify-center gap-2">
        <Clock size={14} />
        View Full Schedule
      </button>
    </div>
  );
};
