'use client';

import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export function HeroSection() {
  const { theme } = useTheme();

  // ✅ scroll with offset supaya aman di mobile & tablet
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const yOffset = -80; // sesuaikan tinggi header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className=" pt-0 sm:pt-0 lg:pt-20 pb-6 sm:pb-10 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
        <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Lets Meet </p>
        <h1 className={`text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Rizki Maulana
          <br />
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Fullstack Web Developer</span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 justify-center lg:justify-start">
          {/* ✅ Download CV fix */}
          <Button
            className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/20'
                : 'bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-100 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20'
            }`}
            onClick={() => window.open('/cv.pdf', '_blank')}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>

          {/* ✅ See Work fix */}
          <Button
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Eye className="mr-2 h-4 w-4" />
            See Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
