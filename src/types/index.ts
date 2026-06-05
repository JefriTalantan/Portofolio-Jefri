export interface ProjectType {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: 'ml' | 'web' | 'mobile' | 'research';
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  date: string;
}

export interface SkillType {
  name: string;
  icon: string;
  category: 'ml' | 'cv' | 'backend' | 'frontend' | 'database' | 'devops';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  color?: string;
}

export interface TimelineType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  icon: string;
  type: 'education' | 'work' | 'achievement' | 'certification';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface StatType {
  label: string;
  value: number;
  suffix?: string;
}
