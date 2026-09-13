import React from 'react';
import { Sparkles, Phone, CheckCircle2, Percent, Coins, Landmark, Home, ArrowUpRight } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

interface PromotionBannerProps {
  onRegisterClick: () => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-12 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-slate-50 border-y border-amber-200" id="promotions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black mb-3 shadow-xs">
            <Sparkles className="w-4 h-4" />
            SPECIAL PROMOTION
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            프리미엄 <span className="text-blue-900 underline decoration-amber-500 decoration-4 underline-offset-4">파격 특별 프로모션</span> 진행 중
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            초기 자금 부담을 획기적으로 낮춘 파격 금융 혜택 및 세제 지원! 
            한정 호실 선착순 특별 프로모션을 놓치지 마세요.
          </p>
        </div>

        {/* Promotion Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 정책 자금 대출 */}
          <div className="bg-white rounded-2xl p-6 border border-indigo-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">융자 지원</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                대출 최대 70% · 기숙사 50%
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                지식산업센터 및 섹션오피스 대출 최대 70%, 기숙사 대출 50% 지원 (각 분양공급가 부가세 제외). 시중은행 및 정책자금 연계 지원.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
              <CheckCircle2 className="w-4 h-4" /> 각 분양공급가(부가세제외)
            </div>
          </div>

          {/* Card 2: 세제 감면 */}
          <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                <Percent className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">세제 혜택</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                취득세 &amp; 재산세 최대 35% 감면
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                지방세특례제한법에 따라 국가산업단지 지식산업센터 직접 입주 기업 대상 파격적인 세제 감면 혜택을 제공합니다.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
              <CheckCircle2 className="w-4 h-4" /> 산단 입주 세제 우대
            </div>
          </div>

          {/* Card 3: 기숙사 테라스 특화 */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">공간 특화</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                기숙사 약 4평 광폭 테라스 무상
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                8~9층 기숙사 전 세대 및 10층 일부 복층 기숙사에 약 4평 단독 광폭 테라스를 무상 서비스 면적으로 제공합니다.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" /> 실사용 면적 극대화 (10층 복층 특화)
            </div>
          </div>

        </div>

        {/* Action Bar */}
        <div className="mt-8 bg-blue-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-block px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black rounded text-xs mb-1">
              PROMOTION CALL
            </div>
            <h4 className="text-xl sm:text-2xl font-black">
              특별 프로모션 조건 및 잔여 호실 문의
            </h4>
            <p className="text-blue-200 text-sm">
              전화로 문의 주시거나 번호를 남겨주시면 담당 전문 상담사가 1:1로 상세히 안내해 드립니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${PROJECT_INFO.phone}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-base transition-all shadow-md"
              id="promo-call-btn"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>{PROJECT_INFO.phoneDisplay}</span>
            </a>
            
            <button
              onClick={onRegisterClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-xl text-sm border border-white/20 transition-all cursor-pointer"
              id="promo-register-btn"
            >
              <span>프로모션 상담 신청</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
