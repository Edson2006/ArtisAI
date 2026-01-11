import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-xl p-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[18px] font-bold text-[#1E293B]">{question}</h3>
        <ChevronDown 
          className={`w-6 h-6 text-[#64748B] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      
      {isOpen && (
        <p className="text-[16px] text-[#64748B] leading-relaxed mt-4">
          {answer}
        </p>
      )}
    </div>
  );
}
