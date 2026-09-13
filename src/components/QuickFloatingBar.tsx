import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, UserCheck, Sparkles, ChevronUp } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

interface QuickFloatingBarProps {
  onScrollToRegister: () => void;
}

export const QuickFloatingBar: React.FC<QuickFloatingBarProps> = ({ onScrollToRegister }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="맨 위로"
          className="fixed bottom-22 right-4 sm:right-6 z-40 w-11 h-11 rounded-full bg-slate-900/90 text-white flex items-center justify-center shadow-lg border border-slate-700 hover:bg-slate-800 transition-all cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Fixed Sticky Quick Bottom Bar */}
      <aside aria-label="빠른 상담 신청" className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 sm:px-6 py-2.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left Text / Info (Desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" /> 프로모션 상담
            </span>
            <div>
              <p className="text-xs font-medium text-slate-300">
                주안국가산단역 2번 출구 100m <strong className="text-white">제이원플렉스</strong>
              </p>
              <p className="text-xs text-amber-400 font-bold">
                번호를 남겨주시면 상담 도와드리겠습니다.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            
            {/* Phone Call */}
            <a
              href={`tel:${PROJECT_INFO.phone}`}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-blue-700 shadow-md transition-all cursor-pointer"
              id="sticky-phone-call"
            >
              <Phone className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span className="truncate">{PROJECT_INFO.phoneDisplay}</span>
            </a>

            {/* SMS Message */}
            <a
              href={`sms:${PROJECT_INFO.phone}?body=${encodeURIComponent('주안국가산단역 제이원플렉스 특별 프로모션 분양 상담 신청합니다.')}`}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-2.5 rounded-xl text-xs border border-slate-700 transition-all cursor-pointer"
              id="sticky-sms"
            >
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <span>문자문의</span>
            </a>

            {/* Jump to Register */}
            <button
              onClick={onScrollToRegister}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              id="sticky-register"
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>관심고객등록</span>
            </button>

          </div>

        </div>
      </aside>
    </>
  );
};
