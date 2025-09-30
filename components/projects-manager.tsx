'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Github, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  status: string;
  github_url?: string;
  demo_url?: string;
  demo_video_url?: string;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    image: null as File | null,
    technologies: '',
    status: 'Online',
    github_url: '',
    demo_url: '',
    demo_video_url: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(
          data.map((p: any) => ({
            ...p,
            technologies: Array.isArray(p.technologies) ? p.technologies : [],
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('status', formData.status);
    form.append('technologies', formData.technologies);
    form.append('github_url', formData.github_url);
    form.append('demo_url', formData.demo_url);
    form.append('demo_video_url', formData.demo_video_url);

    if (formData.image) {
      form.append('file', formData.image); // ✅ konsisten dengan API
    }

    const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
    const method = editingProject ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: form,
      });

      if (response.ok) {
        fetchProjects();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: null,
      technologies: project.technologies.join(', '),
      status: project.status,
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      demo_video_url: project.demo_video_url || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
      technologies: '',
      status: 'Online',
      github_url: '',
      demo_url: '',
      demo_video_url: '',
    });
    setEditingProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects Management</h2>
          <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Online, In Progress, etc."
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="bg-white/10 border-white/20 text-white min-h-[100px]"
                  placeholder="Describe your project..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Upload Image *</Label>
                <div className="flex items-center gap-3">
                  <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('imageInput')?.click()}>
                    Choose File
                  </Button>
                  {formData.image && <span className="text-sm text-gray-300">{formData.image.name}</span>}
                </div>
                <Input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData({ ...formData, image: e.target.files[0] });
                    }
                  }}
                />
                {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Preview" className="mt-3 w-40 h-40 object-cover rounded-lg border border-white/20" />}
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma separated) *</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technologies: e.target.value,
                    })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Next.js, React, TypeScript, Tailwind CSS"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        github_url: e.target.value,
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div>
                  <Label htmlFor="demo_url">Live Demo URL</Label>
                  <Input
                    id="demo_url"
                    value={formData.demo_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        demo_url: e.target.value,
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              {/* <div>
                <Label htmlFor="demo_video_url">Demo Video URL</Label>
                <Input
                  id="demo_video_url"
                  value={formData.demo_video_url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      demo_video_url: e.target.value,
                    })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="/demo-video.mp4"
                />
              </div> */}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                <div className="flex space-x-1">
                  {project.demo_url && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-500/10" onClick={() => window.open(project.demo_url, '_blank')}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  {project.github_url && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-500/10" onClick={() => window.open(project.github_url, '_blank')}>
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-500/10" onClick={() => handleEdit(project)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-500/10" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <span className="text-xs text-gray-400">{project.status}</span>
            </CardHeader>
            <CardContent>
              {project.image_url && <img src={project.image_url} alt={project.title} className="w-full h-40 object-cover rounded-md mb-3 border border-white/10" />}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {(project.technologies ?? []).slice(0, 3).map((tech, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded">
                    {tech}
                  </span>
                ))}
                {Array.isArray(project.technologies) && project.technologies.length > 3 && <span className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 rounded">+{project.technologies.length - 3}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No projects found</p>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
}
