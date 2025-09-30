'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      const sections = ['home', 'about', 'projects'];
      let current = 'home';

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const offsetTop = el.offsetTop - 120;
          if (scrollTop >= offsetTop) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // tinggi navbar
      const top = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'My Projects' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 lg:left-80 right-0 z-50 px-4 lg:px-8 py-4 lg:py-6 transition-all duration-500 ease-in-out ${
          isScrolled ? (theme === 'dark' ? 'bg-black/10 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20' : 'bg-white/10 backdrop-blur-md border-b border-black/10 shadow-lg shadow-black/10') : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-lg font-medium transition-all duration-300 ${
                  activeSection === item.id ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-600') : theme === 'dark' ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.label}
                {activeSection === item.id && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-md focus:outline-none">
              <Menu className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full transition-all duration-300 ${
              isScrolled
                ? theme === 'dark'
                  ? 'border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                  : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
                : theme === 'dark'
                ? 'border-white/30 bg-white/5 hover:bg-white/15'
                : 'border-gray-300 bg-white/20 hover:bg-white/30'
            }`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-gray-900" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 lg:hidden ${theme === 'dark' ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`} onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className={`fixed top-0 left-0 h-full w-80 ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900 to-purple-900' : 'bg-gradient-to-b from-gray-50 to-blue-50'} shadow-xl transform transition-transform duration-300 ease-in-out`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 p-2">
              <X className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
            </button>

            <div className="p-6 pt-20 space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left text-xl font-medium transition-colors duration-200 ${
                    activeSection === item.id ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-600') : theme === 'dark' ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
