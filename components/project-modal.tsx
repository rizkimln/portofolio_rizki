'use client';

import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import Image from 'next/image';

type AnyProject = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  image_url?: string | null;
  project_images?: Array<{ image_url?: string }>;
  technologies?: string[] | null;
  status?: string | null;
  demo_url?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  demo_video?: string | null;
  demo_video_url?: string | null;
};

interface ProjectModalProps {
  project: AnyProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!project) return null;

  const image = project.image || project.image_url || project.project_images?.[0]?.image_url || '/placeholder.svg';

  const liveUrl = project.live_url || project.demo_url || null;
  const github = project.github_url || null;
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`w-11/12 sm:w-1/3 max-h-[85vh] rounded-xl flex flex-col
          ${theme === 'dark' ? 'bg-slate-900 border-white/20 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">{project.title}</DialogTitle>
        </DialogHeader>

        {/* Konten scrollable */}
        <div className="space-y-6 px-4 pb-6 overflow-y-auto max-h-[70vh]">
          {/* Image landscape (16:9) */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image src={image || '/placeholder.svg'} alt={project.title} fill className="object-cover" />
          </div>

          {/* Description */}
          <div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Description</h3>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{project.description || 'No description provided.'}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Technologies Used</h3>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {technologies.map((tech, idx) => (
                <span key={idx} className={`px-3 py-1 text-sm rounded-full ${theme === 'dark' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                  {tech}
                </span>
              ))}
              {technologies.length === 0 && <span className="text-sm text-gray-400">No technologies listed</span>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            {github && (
              <Button onClick={() => window.open(github, '_blank')} className={`flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}>
                <Github className="h-4 w-4" />
                View on GitHub
              </Button>
            )}

            {liveUrl && (
              <Button onClick={() => window.open(liveUrl, '_blank')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <ExternalLink className="h-4 w-4" />
                View Project
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
