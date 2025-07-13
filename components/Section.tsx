
import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-14" data-observe-section>
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-10 sm:mb-14">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Section;