'use client';

import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ProjectsSection } from '@/components/projects-section';
import { useTheme } from '@/components/theme-provider';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100'}`}>
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar responsif */}
        <div className="w-full lg:w-80">
          <Sidebar />
        </div>

        {/* Konten utama */}
        <main className="flex-1 pt-0 lg:pt-24 px-4 lg:px-8 pb-6 space-y-20">
          <div id="home" style={{ scrollMarginTop: '100px' }}>
            <HeroSection />
          </div>
          <div id="about" style={{ scrollMarginTop: '100px' }}>
            <AboutSection />
          </div>
          <div id="projects" style={{ scrollMarginTop: '100px' }}>
            <ProjectsSection />
          </div>
        </main>
      </div>
    </div>
  );
}
