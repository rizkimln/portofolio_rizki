'use client';

import Image from 'next/image';
import { Instagram, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function Sidebar() {
  const { theme } = useTheme();

  return (
    <div>
      {/* Mobile & Tablet: hanya foto & icon sosmed */}
      <div className={`block lg:hidden w-full p-4 text-center mt-16 mb-1 ${theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'}`}>
        {/* Foto diperbesar */}
        <div className="relative w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden">
          <Image src="/rzk.jpg" alt="Rizki Maulana" fill className="object-cover" />
        </div>

        {/* Icon Sosmed warna putih */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://instagram.com/rrrizkimln_" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white">
            <Instagram className="h-6 w-6 text-white" />
          </a>
          <a href="https://linkedin.com/rizki-maulana30" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white">
            <Linkedin className="h-6 w-6 text-white" />
          </a>
          <a href="https://github.com/rizkimln" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white">
            <Github className="h-6 w-6 text-white" />
          </a>
        </div>
      </div>

      {/* Desktop: tetap sidebar lengkap */}
      <div className={`hidden lg:block fixed left-0 top-0 h-screen w-80 backdrop-blur-sm border-r p-6 xl:p-8 ${theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/20 border-gray-200'}`}>
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="text-center mb-6">
            <h1 className={`text-xl xl:text-2xl font-bold mb-6 xl:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Rizki Maulana</h1>

            <div className="relative w-40 xl:w-48 h-40 xl:h-48 mx-auto mb-4 xl:mb-6 rounded-lg overflow-hidden">
              <Image src="/rzk.jpg" alt="Rizki Maulana" fill className="object-cover" />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h3 className={`font-semibold mb-3 xl:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Skill:</h3>
            <div className={`space-y-2 text-sm xl:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>UI Designer</p>
              <p>Full Stack Developer</p>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className={`font-semibold mb-3 xl:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Based In:</h3>
            <p className={`text-sm xl:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Sleman, DIY, Indonesia</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-3 xl:space-x-4 mb-4 ">
            <Button asChild variant="outline" size="icon" className="!border-white">
              <a href="https://instagram.com/rrrizkimln_" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4 text-white" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="!border-white">
              <a href="https://linkedin.com/rizki-maulana30" target="_blank " rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 text-white " />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="!border-white">
              <a href="https://github.com/rizkimln" target="_blank" rel="noopener noreferrer border border-white">
                <Github className="h-4 w-4 text-white" />
              </a>
            </Button>
          </div>

          {/* Hire Me Button */}
          <div className="mb-6">
            <Button asChild className="w-full rounded-full">
              <a href="https://wa.me/6281222525928" target="_blank" rel="noopener noreferrer">
                Hire Me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
