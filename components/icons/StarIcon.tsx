import React from 'react';

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.445l-7.416 4.068L6.064 15.134 0 9.306l8.332-1.151z" />
    </svg>
);
