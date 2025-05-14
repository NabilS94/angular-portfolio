// Article related interfaces
export interface Author {
  name: string;
  avatar: string;
}

export interface Skill {
  icon: string;
  title: string;
  skills: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: Date;
  category: string;
  readTime: number;
  author: Author;
}

export interface PostResponse {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Project related interfaces
export interface Project {
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  category: string;
  longDescription?: string;
  features?: string[];
  challenges?: string[];
}

// Technology related interfaces
export interface Technology {
  name: string;
  icon: string;
} 