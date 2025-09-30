export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies?: string[];
  category?: string;
  status?: 'active' | 'inactive';
  featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
  project_images?: {
    id: string;
    image_url: string;
    alt_text?: string;
    sort_order?: number;
  }[];
}
