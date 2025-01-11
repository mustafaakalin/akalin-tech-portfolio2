export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  purpose: string;
  images: string[];
  youtubeVideoId?: string;
  technologies: {
    name: string;
    color: string;
  }[];
  developers: {
    name: string;
    position: string;
    imageUrl: string;
    socialLinks: Record<string, string>;
  }[];
  socialLinks: Record<string, string>;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  emoji: string;
  demoUrl?: string;
  userUrls?: string[];
}

export interface SiteSettings {
  id: number;
  logo: string;
  name: string;
  slogan: string;
  workingHours: {
    days: string;
    hours: string;
  };
  address: string;
  phone: string;
  socialLinks: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AllowedUser {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
} 