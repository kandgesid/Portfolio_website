import React, { useState, useEffect } from 'react';
import { HamburgerIcon, CloseIcon } from './icons';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          hasScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg shadow-zinc-900/10' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-20">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg text-slate-300 hover:text-white transition-colors duration-300 relative nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-slate-300 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <HamburgerIcon className="w-8 h-8" />
              </button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-end p-6">
           <button
             onClick={toggleMenu}
             className="text-slate-300 hover:text-white focus:outline-none"
             aria-label="Close menu"
           >
              <CloseIcon className="w-8 h-8" />
           </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full -mt-16">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-4 text-3xl sm:text-4xl font-bold text-slate-200 hover:text-zinc-300 transition-colors duration-300"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;