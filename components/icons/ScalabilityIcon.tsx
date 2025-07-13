
import React from 'react';

export const ScalabilityIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3v18" />
        <path d="M9 18l3 3 3-3" />
        <path d="M9 6l3-3 3 3" />
        <path d="M3 12h18" />
    </svg>
);
