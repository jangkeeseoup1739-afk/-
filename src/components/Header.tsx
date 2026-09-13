import React, { useState } from 'react';
import { Phone, Menu, X, Building2, Sparkles, Clock, MapPin } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

interface HeaderProps {
  onOpenRegister: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs" id="main-header">
      {/* Top Notice Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[11px] shrink-0">
              <Sparkles className="w-3 h-3" /> 특별혜택
            </span>
            <p className="truncate font-medium text-slate-100">
              주안국가산단역 2번 출구 100m! <strong className="text-amber-300 font-bold">파격 특별 프로모션</strong> 선착순 진행 중
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs shrink-0 text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> 실시간 1:1 맞춤 상담 지원
            </span>
            <a 
              href={`tel:${PROJECT_INFO.phone}`} 
              className="text-amber-300 hover:text-white font-bold transition-colors"
            >
              상담전화: {PROJECT_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="cursor-pointer flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap"
            id="nav-logo"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black shadow-md shadow-blue-950/20 shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div className="whitespace-nowrap">
              <div className="flex items-center gap-1.5 leading-none mb-1">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded tracking-tight whitespace-nowrap">
                  2번 출구 100m
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 whitespace-nowrap">초역세권</span>
              </div>
              <h1 className="text-base sm:text-lg xl:text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 whitespace-nowrap">
                <span>제이원플렉스</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-800 hidden sm:inline whitespace-nowrap">지식산업센터</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 shrink-0 whitespace-nowrap">
            <button 
              onClick={() => scrollToSection('overview')} 
              className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer whitespace-nowrap px-1 py-1"
            >
              사업소개
            </button>
            <button 
              onClick={() => scrollToSection('location')} 
              className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap px-1 py-1"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span>입지환경</span>
            </button>
            <button 
              onClick={() => scrollToSection('floor-guide')} 
              className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer whitespace-nowrap px-1 py-1"
            >
              평면/층별안내
            </button>
            <button 
              onClick={() => scrollToSection('unit-types')} 
              className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer whitespace-nowrap px-1 py-1"
            >
              공급·평면도안내
            </button>
            <button 
              onClick={() => scrollToSection('promotions')} 
              className="text-xs xl:text-sm font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded-md hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0 border border-amber-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>특별프로모션</span>
            </button>
            <button 
              onClick={() => scrollToSection('calculator')} 
              className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer whitespace-nowrap px-1 py-1"
            >
              수익률계산기
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 whitespace-nowrap">
            <a
              href={`tel:${PROJECT_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 xl:gap-2 bg-blue-900 text-white font-bold px-2.5 xl:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-blue-950 transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
              id="header-call-btn"
            >
              <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span className="text-xs xl:text-sm tracking-tight whitespace-nowrap font-extrabold">{PROJECT_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={() => {
                const regSection = document.getElementById('registration');
                if (regSection) {
                  regSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onOpenRegister();
                }
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-black px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              id="header-register-btn"
            >
              관심고객등록
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="메뉴 열기"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-3 text-center">
            <p className="text-xs font-bold text-amber-900">
              🔥 파격 특별 프로모션 상담 진행 중
            </p>
            <a 
              href={`tel:${PROJECT_INFO.phone}`}
              className="text-base font-black text-blue-900 mt-1 inline-flex items-center gap-1"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              {PROJECT_INFO.phoneDisplay}
            </a>
          </div>

          <button
            onClick={() => scrollToSection('overview')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            1. 사업소개 (지산+근생+기숙사)
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            2. 입지환경 (주안국가산단역 2번 출구 100m)
          </button>
          <button
            onClick={() => scrollToSection('floor-guide')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            3. 평면안내 (지하2층~지상4층 드라이브인 / 기숙사 테라스)
          </button>
          <button
            onClick={() => scrollToSection('unit-types')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            4. 공급안내 · 평면도 (타입별 & 층별)
          </button>
          <button
            onClick={() => scrollToSection('promotions')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-amber-800 bg-amber-50/50 rounded-lg"
          >
            5. 파격 특별 프로모션
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            6. 금융 및 수익률 계산기
          </button>
          <button
            onClick={() => scrollToSection('registration')}
            className="w-full text-center py-3 text-sm font-bold bg-blue-900 text-white rounded-xl shadow-md"
          >
            관심고객등록 바로가기
          </button>
        </div>
      )}
    </header>
  );
};
