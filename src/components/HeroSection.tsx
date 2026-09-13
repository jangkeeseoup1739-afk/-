import React, { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Sparkles, MapPin, Layers, CheckCircle2, Award, Home, Building } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreFloors: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick, onExploreFloors }) => {
  const [heroTab, setHeroTab] = useState<'dormitory' | 'building'>('building');
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24" id="hero">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Value Propositions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-sm animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                파격 특별 프로모션 (대출 최대 70% · 기숙사 50% / 각 공급가 부가세제외)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800/80">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                주안국가산단역 2번 출구 100m
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/90 text-slate-300 border border-slate-700">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                지하2층~지상10층 올인원
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <p className="text-blue-400 font-semibold tracking-wide text-sm sm:text-base">
                인천 2호선 초역세권 프리미엄 복합 비즈니스 타워
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                주안국가산단역 <span className="text-amber-400">제이원플렉스</span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-200">
                  지식산업센터 · 근생 · 기숙사
                </span>
              </h1>
            </div>

            {/* Core Value Summary */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              주안국가산단역 2번 출구에서 <strong className="text-white font-bold">불과 100미터</strong>! 
              지하 2층~지상 4층 <strong className="text-amber-300 font-semibold">드라이브인 도어투도어</strong> 시스템과 
              전 호실 <strong className="text-amber-300 font-semibold">약 4평 테라스</strong>가 제공되는 프리미엄 기숙사까지, 
              비즈니스와 주거가 하나로 완성됩니다.
            </p>

            {/* Bullet Point Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">지하2층~지상4층 드라이브인</h4>
                  <p className="text-xs text-slate-400 mt-0.5">화물차량 호실 앞 직접 진입 도어 투 도어</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">약 4평 광폭 테라스 제공 기숙사</h4>
                  <p className="text-xs text-slate-400 mt-0.5">8~9층 기숙사 및 10층 복층 기숙사 특화</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">5층~7층 섹션오피스 (최대 3.9m 높은 층고)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">최대 3.9m 높은 층고 &amp; 소형 벤처부터 대형 R&amp;D까지 가변형 모듈 설계</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">기숙사 타입 (A-1, C-1 특화)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">전세대 약 4평 테라스 &amp; 10층 복층 특화 공급 (A~E 타입)</p>
                </div>
              </div>
            </div>

            {/* Direct Call & Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={`tel:${PROJECT_INFO.phone}`}
                className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-4 rounded-xl text-base sm:text-lg shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                id="hero-call-cta"
              >
                <Phone className="w-5 h-5 fill-slate-950" />
                <span>직통 상담 : {PROJECT_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={onRegisterClick}
                className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl text-base border border-blue-600 transition-all cursor-pointer"
                id="hero-register-cta"
              >
                <span>관심고객 등록하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Consultation Trust Note */}
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                전문 분양 상담팀 실시간 대기 중
              </div>
              <span className="text-slate-600">|</span>
              <span>번호를 남겨주시면 친절히 상담 도와드리겠습니다.</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Card with Building Render / Dormitory */}
          <div className="lg:col-span-5">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 mb-2.5">
              <button
                type="button"
                onClick={() => setHeroTab('dormitory')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  heroTab === 'dormitory'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                기숙사 타입 (약 4평 테라스)
              </button>
              <button
                type="button"
                onClick={() => setHeroTab('building')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  heroTab === 'building'
                    ? 'bg-blue-600 text-white shadow-md font-black'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                외관 조감도
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-blue-950/60">
              
              {/* Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden group">
                <img
                  key={heroTab}
                  src={
                    heroTab === 'dormitory'
                      ? '/images/regenerated_image_1789113832511.webp'
                      : '/images/regenerated_image_1789113730277.webp'
                  }
                  alt={
                    heroTab === 'dormitory'
                      ? '주안국가산단역 제이원플렉스 기숙사 테라스 특화 타입'
                      : '주안국가산단역 제이원플렉스 지식산업센터 외관 조감도'
                  }
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual Overlay Badges */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  {heroTab === 'dormitory' ? '기숙사 특화 타입 (A-1 · C-1)' : '제이원플렉스 외관 조감도 (예정)'}
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <div className="flex justify-between items-center text-white font-bold mb-1">
                    <span className="text-amber-400">
                      {heroTab === 'dormitory' ? '전세대 약 4평 광폭 테라스 기본 제공' : '지하 2층 ~ 지상 10층 복합시설'}
                    </span>
                    <span className="text-[11px] bg-blue-900/80 px-2 py-0.5 rounded text-blue-200">
                      {heroTab === 'dormitory' ? '10층 복층 특화' : '역세권 100m'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {heroTab === 'dormitory'
                      ? 'A-1 타입(단층 테라스) & C-1 타입(복층 테라스) 독립 주거 힐링 공간'
                      : '지산(제조/오피스) + 근생(상가) + 기숙사(4평 테라스) 올인원'}
                  </p>
                </div>
              </div>

              {/* Quick Info Strip */}
              <div className="p-4 bg-slate-900/95 grid grid-cols-3 divide-x divide-slate-800 text-center">
                <div className="px-2">
                  <p className="text-[11px] text-slate-400">지하철 접근성</p>
                  <p className="text-sm font-black text-amber-400 mt-0.5">2번출구 100m</p>
                </div>
                <div className="px-2">
                  <p className="text-[11px] text-slate-400">드라이브인</p>
                  <p className="text-sm font-black text-blue-400 mt-0.5">B2F ~ 4F</p>
                </div>
                <div className="px-2">
                  <p className="text-[11px] text-slate-400">기숙사 테라스</p>
                  <p className="text-sm font-black text-emerald-400 mt-0.5">약 4평 제공</p>
                </div>
              </div>

            </div>

            {/* Sub Banner */}
            <div 
              onClick={onExploreFloors}
              className="mt-4 p-3.5 rounded-xl bg-blue-950/60 border border-blue-900/60 hover:border-blue-700/80 flex items-center justify-between text-xs text-blue-200 cursor-pointer transition-all hover:bg-blue-950"
            >
              <span className="font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                10층 복층 기숙사 &amp; 8~9층 테라스 평면 살펴보기
              </span>
              <span className="text-amber-400 font-bold flex items-center">
                층별안내 보기 <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
