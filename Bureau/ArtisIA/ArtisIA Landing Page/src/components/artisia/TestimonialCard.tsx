import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
}

export function TestimonialCard({ quote, author, role, company, image }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm h-full flex flex-col">
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className="text-[18px] text-[#1E293B] leading-relaxed italic mb-6 flex-grow">
        "{quote}"
      </blockquote>
      
      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[20px] font-bold text-[#2563EB]">
          {author.charAt(0)}
        </div>
        <div>
          <div className="text-[16px] font-bold text-[#1E293B]">{author}</div>
          <div className="text-[14px] text-[#64748B]">{role}</div>
        </div>
      </div>
    </div>
  );
}
