import { LucideIcon } from 'lucide-react';

export interface SocialLink {
  id: string;
  icon: LucideIcon;
  url: string;
  label: string;
}

export interface LinkCardItem {
  id: string;
  title: string;
  subtitle?: string; // Optional descriptive text
  url: string;
  icon?: LucideIcon;
  featured?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}