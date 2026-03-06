import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Flag, Image as ImageIcon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'হোম', path: '/', icon: <Home size={20} /> },
    { name: 'আমার সম্পর্কে', path: '/about', icon: <User size={20} /> },
    { name: 'রাজনৈতিক পেজ', path: '/politics', icon: <Flag size={20} /> },
    { name: 'ফটো গ্যালারি', path: '/gallery', icon: <ImageIcon size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#2e7d32]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#1b5e20] flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2e7d32] rounded-lg flex items-center justify-center text-white">
                <Flag size={18} fill="currentColor" />
              </div>
              <span className="hidden sm:block">শাহরিয়ার আহমেদ সুমন</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-[#2e7d32] text-white shadow-md'
                    : 'text-[#1b5e20] hover:bg-[#2e7d32]/10'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1b5e20] p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-[#2e7d32]/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                    isActive(item.path)
                      ? 'bg-[#2e7d32] text-white shadow-lg'
                      : 'text-[#1b5e20] hover:bg-[#2e7d32]/10'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
