import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  icon,
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-default active-scale cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-sm hover:shadow-md',
    secondary: 'bg-white text-[#2563EB] border-2 border-[#2563EB] hover:bg-[#EFF6FF]',
    ghost: 'bg-transparent text-[#1E293B] hover:bg-[#F8FAFC]'
  };
  
  const sizeStyles = {
    small: 'h-[40px] px-5 text-[14px]',
    medium: 'h-[48px] px-6 text-[16px]',
    large: 'h-[56px] px-8 text-[18px]'
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
}
