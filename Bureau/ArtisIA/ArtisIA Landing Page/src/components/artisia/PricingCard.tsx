import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';

interface PricingCardProps {
  name: string;
  price: number;
  period?: string;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
  ctaText: string;
  ctaVariant?: 'primary' | 'secondary';
}

export function PricingCard({ 
  name, 
  price, 
  period = '/mois',
  description, 
  features, 
  badge,
  highlighted = false,
  ctaText,
  ctaVariant = 'secondary'
}: PricingCardProps) {
  const cardClasses = highlighted 
    ? 'border-[3px] border-[#2563EB] bg-[#EFF6FF] transform lg:-translate-y-2' 
    : 'border-2 border-[#E2E8F0] bg-white';
  
  return (
    <div className={`${cardClasses} rounded-2xl p-8 lg:p-12 relative`}>
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#2563EB] text-white text-[12px] font-semibold px-4 py-1 rounded-full uppercase">
            {badge}
          </span>
        </div>
      )}
      
      {/* Plan Name */}
      <h3 className="text-[24px] font-bold text-[#1E293B] mb-4">{name}</h3>
      
      {/* Price */}
      <div className="mb-4">
        <span className="text-[56px] font-bold text-[#1E293B]">{price}€</span>
        <span className="text-[20px] text-[#64748B]">{period}</span>
      </div>
      
      {/* Description */}
      <p className="text-[16px] text-[#64748B] mb-8">{description}</p>
      
      {/* Features */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
            <span className="text-[16px] text-[#1E293B]">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* CTA Button */}
      <Button 
        variant={ctaVariant} 
        size="large" 
        fullWidth
      >
        {ctaText}
      </Button>
    </div>
  );
}
