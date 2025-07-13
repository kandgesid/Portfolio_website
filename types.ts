import React from 'react';

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  tasks: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  courses?: string[];
}

export interface Project {
  title: string;
  description: string[];
  githubUrl?: string;
  techStack?: string[];
}

export interface SkillCategory {
    title: string;
    skills: string[];
}

export interface ContactInfo {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string;
    href: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  bounces: number;
  opacity: number;
  clearing?: boolean;
}