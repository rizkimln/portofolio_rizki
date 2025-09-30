// lib/api.ts (Updated - Menggunakan Supabase Auth)

import { Project } from './supabase';

// API Base URL
const API_BASE = '/api';

// Authentication APIs (Updated untuk Supabase Auth)
export const authAPI = {
  // Login menggunakan Supabase Auth
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Penting untuk cookies
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  // Verify session
  verify: async () => {
    const response = await fetch(`${API_BASE}/auth/verify`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Authentication failed');
    }

    return response.json();
  },

  // Logout
  logout: async () => {
    const response = await fetch(`${API_BASE}/auth/verify`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Logout failed');
    }

    return response.json();
  },
};

// Projects APIs (tidak ada perubahan)
export const projectsAPI = {
  // Get all projects (public)
  getAll: async (
    params: {
      status?: string;
      featured?: boolean;
      category?: string;
      limit?: number;
      offset?: number;
    } = {}
  ) => {
    const searchParams = new URLSearchParams();

    if (params.status) searchParams.append('status', params.status);
    if (params.featured !== undefined) searchParams.append('featured', params.featured.toString());
    if (params.category) searchParams.append('category', params.category);
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.offset) searchParams.append('offset', params.offset.toString());

    const response = await fetch(`${API_BASE}/projects?${searchParams}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch projects');
    }

    return response.json();
  },

  // Get single project (public)
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/projects/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch project');
    }

    return response.json();
  },

  // Create project (admin only)
  create: async (
    projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'> & {
      images?: Array<{ image_url: string; alt_text?: string; sort_order?: number }>;
    }
  ) => {
    const response = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Penting untuk auth cookies
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create project');
    }

    return response.json();
  },

  // Update project (admin only)
  update: async (
    id: string,
    projectData: Partial<Project> & {
      images?: Array<{ image_url: string; alt_text?: string; sort_order?: number }>;
    }
  ) => {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update project');
    }

    return response.json();
  },

  // Delete project (admin only)
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete project');
    }

    return response.json();
  },
};

// Keep-alive API (NEW!)
export const keepAliveAPI = {
  ping: async () => {
    const response = await fetch(`${API_BASE}/keep-alive`, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Keep-alive failed');
    }

    return response.json();
  },
};

// Error handler utility
export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  return error.message || 'An unexpected error occurred';
};
