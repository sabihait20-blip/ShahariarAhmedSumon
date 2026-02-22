import React from 'react';
import { LayoutGrid, Tv, Radio, Heart, Settings, Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange, categories }) => {
  return (
    <aside className="w-64 h-screen flex flex-col border-r border-white/10 bg-bg-main/50 backdrop-blur-xl fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center shadow-lg shadow-brand-accent/20">
          <Tv className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">Lumina TV</span>
      </div>

      <div className="px-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
          <input 
            type="text" 
            placeholder="Search channels..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-secondary font-semibold mb-4 px-2">Menu</h3>
          <ul className="space-y-1">
            <SidebarItem icon={<LayoutGrid size={18} />} label="Browse" active />
            <SidebarItem icon={<Radio size={18} />} label="Live TV" />
            <SidebarItem icon={<Heart size={18} />} label="Favorites" />
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-secondary font-semibold mb-4 px-2">Categories</h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onCategoryChange(cat)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    activeCategory === cat 
                      ? "bg-white/10 text-white" 
                      : "text-brand-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => (
  <li>
    <button className={cn(
      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
      active 
        ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20" 
        : "text-brand-secondary hover:text-white hover:bg-white/5"
    )}>
      {icon}
      {label}
    </button>
  </li>
);
