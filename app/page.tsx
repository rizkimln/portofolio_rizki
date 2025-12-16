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

      {/* Sidebar FIXED (tidak ikut flow) */}
      <Sidebar />

      {/* Konten utama - padding top disesuaikan untuk mobile */}
      <main className="pt-16 lg:pt-24 px-4 lg:px-8 pb-6 space-y-20 lg:ml-80">
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
  );
}
