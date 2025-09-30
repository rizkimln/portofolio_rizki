'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/theme-provider';
import { ProjectModal } from '@/components/project-modal';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  status: string;
  demo_video?: string;
  github_url?: string;
  live_url?: string;
}

export function ProjectsSection() {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        setError('Error fetching projects. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="projects" className="py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 lg:mb-12 text-center lg:text-left">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Featured Projects</h2>
          <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Some Of My Memorable Final Projects That You Might Like</p>
        </div>

        {/* Loading & Error State */}
        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading projects...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Projects List */}
        {!loading && !error && (
          <div className="w-full overflow-x-auto pb-4 sm:pb-6 no-scrollbar">
            <div className="flex space-x-4 sm:space-x-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleProjectClick(project)}
                  onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project)}
                  className={`min-w-[240px] sm:min-w-[280px] max-w-xs flex-shrink-0 rounded-lg sm:rounded-xl shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 ${
                    theme === 'dark' ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-white border border-gray-200 hover:shadow-xl'
                  }`}
                >
                  {/* Gambar */}
                  <div className="relative w-full h-36 sm:h-48 rounded-t-lg sm:rounded-t-xl overflow-hidden">
                    <Image
                      src={project.image_url || '/placeholder.svg'}
                      alt={project.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>

                  {/* Deskripsi */}
                  <div className="p-3 sm:p-4">
                    <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>

                    {/* Badge teknologi */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs border border-white text-white rounded-full bg-white/10 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
