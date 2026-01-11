import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  maxWidth?: '800px' | '1200px' | '1440px';
  className?: string;
  background?: 'white' | 'gray' | 'blue' | 'dark' | 'gradient';
  padding?: 'small' | 'medium' | 'large';
  id?: string;
}

export function SectionContainer({ 
  children, 
  maxWidth = '1200px',
  className = '',
  background = 'white',
  padding = 'large',
  id
}: SectionContainerProps) {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-[#F8FAFC]',
    blue: 'bg-[#EFF6FF]',
    dark: 'bg-[#1E293B]',
    gradient: 'bg-gradient-to-b from-white to-[#F8FAFC]'
  };
  
  const paddingStyles = {
    small: 'py-12 px-6 md:py-16 md:px-10 lg:py-20 lg:px-20',
    medium: 'py-16 px-6 md:py-20 md:px-10 lg:py-24 lg:px-20',
    large: 'py-20 px-6 md:py-24 md:px-10 lg:py-30 lg:px-20'
  };
  
  const maxWidthStyle = maxWidth === '800px' 
    ? 'max-w-[800px]' 
    : maxWidth === '1200px' 
    ? 'max-w-[1200px]' 
    : 'max-w-[1440px]';
  
  return (
    <section id={id} className={`${bgStyles[background]} ${paddingStyles[padding]} ${className}`}>
      <div className={`${maxWidthStyle} mx-auto`}>
        {children}
      </div>
    </section>
  );
}

