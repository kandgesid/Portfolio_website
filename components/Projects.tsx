import React, { useState, useEffect } from 'react';
import Section from './Section';
import { FEATURED_PROJECTS } from '../constants';
import type { Project } from '../types';
import { GitHubIcon } from './icons';

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-slate-900/90 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close project details"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h2>
        
        <ul className="space-y-2 text-sm md:text-base text-slate-300 mb-5">
          {project.description.map((desc, i) => (
            <li key={i} className="flex items-start">
              <span className="text-zinc-300 mr-2 mt-0.5 flex-shrink-0" style={{'filter': 'drop-shadow(0 0 3px #f4f4f5)'}}>✦</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
        
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-800 text-white font-semibold py-2 px-3 rounded-md hover:bg-slate-700 transition-colors text-sm"
          >
            <GitHubIcon className="w-5 h-5" />
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  onShowMore: () => void;
}> = ({ project, onShowMore }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-[-15px] bg-zinc-300/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      <div className="relative bg-slate-800/60 backdrop-blur-sm p-5 rounded-lg border border-slate-700 overflow-hidden transition-all duration-300 group-hover:border-zinc-300/50 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-zinc-500/10 h-[18rem] flex flex-col">
        <div className="flex-grow">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2.5">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack?.map(tech => (
              <span key={tech} className="bg-zinc-900/50 text-zinc-200 text-xs font-medium px-2 py-0.5 rounded-full">{tech}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-zinc-300 transition-colors z-10"
            aria-label="View on GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <GitHubIcon className="w-5 h-5"/>
          </a>
          <button
            onClick={onShowMore}
            className="bg-zinc-600/50 text-white text-sm font-semibold py-2 px-3 rounded-md hover:bg-zinc-500/70 transition-colors"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project, index) => (
              <ProjectCard 
                  key={index} 
                  project={project} 
                  onShowMore={() => setSelectedProject(project)}
              />
          ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </Section>
  );
};

export default Projects;