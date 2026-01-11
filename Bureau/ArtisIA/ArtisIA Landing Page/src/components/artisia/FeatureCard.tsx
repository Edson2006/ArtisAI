import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

export function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 hover-lift cursor-pointer">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#EFF6FF] text-[40px] mb-6">
        {icon}
      </div>
      <h3 className="text-[20px] font-bold text-[#1E293B] mb-4">{title}</h3>
      <p className="text-[16px] text-[#64748B] leading-relaxed mb-4">{description}</p>
      {link && (
        <a href={link} className="inline-flex items-center gap-2 text-[16px] text-[#2563EB] font-semibold hover:gap-3 transition-all">
          Voir comment <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
