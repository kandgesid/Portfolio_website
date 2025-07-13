
import React from 'react';

export const ArchitectureIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3"></circle>
        <circle cx="12" cy="12" r="8"></circle>
        <line x1="12" y1="2" x2="12" y2="4"></line>
        <line x1="12" y1="20" x2="12" y2="22"></line>
        <line x1="4" y1="12" x2="2" y2="12"></line>
        <line x1="22" y1="12" x2="20" y2="12"></line>
    </svg>
);
