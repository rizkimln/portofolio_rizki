'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';
import { useTheme } from '@/components/theme-provider';

export function AboutSection() {
  const { theme } = useTheme();
  const [totalProjects, setTotalProjects] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjectsCount = async () => {
      const { count, error } = await supabase.from('projects').select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching projects count:', error.message);
      } else {
        setTotalProjects(count);
      }
    };

    fetchProjectsCount();
  }, []);

  return (
    <section id="about" className="py-6 sm:py-10 lg:py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* About Me Content */}
        <div className="lg:col-span-2">
          {/* Judul */}
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 
  text-center lg:text-left
  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            About Me
          </h2>

          {/* Subjudul */}
          <p
            className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 
  text-center lg:text-left
  ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
          >
            Introduction Regarding My Experience and Background
          </p>

          {/* Paragraf */}
          <div
            className={`leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg 
  text-center lg:text-left
  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            <p>
              Hi, my name is Rizki Maulana, a student at Universitas Islam Indonesia with a strong passion for coding. Over the past three years, I have dedicated myself to the world of web development, working on various projects for both
              academic purposes and real clients. This journey has not only strengthened my technical expertise but also fueled my curiosity to explore new technologies and continuously improve my skills. As I grow as a web developer, I’m
              eager to embrace new challenges and push the boundaries of creativity and innovation in every project I take on.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-1 w-full">
          {/* Years Of Experience */}
          <div className={`rounded-lg p-3 sm:p-4 md:p-6 text-center ${theme === 'dark' ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-100 border border-blue-200'}`}>
            <p className={`text-xs sm:text-sm md:text-base mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Years Of Experience</p>
            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>3</div>
          </div>

          {/* Total Projects */}
          <div className={`rounded-lg p-3 sm:p-4 md:p-6 text-center ${theme === 'dark' ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-purple-100 border border-purple-200'}`}>
            <p className={`text-xs sm:text-sm md:text-base mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>Total Projects</p>
            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{totalProjects !== null ? totalProjects : '…'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
