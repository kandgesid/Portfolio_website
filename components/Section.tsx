
import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-12" data-observe-section>
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Section;