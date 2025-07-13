
import React from 'react';

export const MlIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
    </svg>
);
