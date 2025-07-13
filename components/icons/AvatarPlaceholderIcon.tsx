import React from 'react';

export const AvatarPlaceholderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="100" cy="70" r="35" fill="currentColor"/>
        <path d="M166.667 200C166.667 159.624 136.819 126.667 100 126.667C63.1812 126.667 33.3333 159.624 33.3333 200H166.667Z" fill="currentColor"/>
    </svg>
);
