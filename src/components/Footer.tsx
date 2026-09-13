import React from 'react';
import { Building2, Phone, MapPin, Sparkles, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-24 border-t border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-black">
                <Building2 className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                {PROJECT_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              인천 2호선 주안국가산단역 2번 출구 100m 초역세권! 
              지식산업센터, 근린생활시설, 테라스 기숙사가 결합된 프리미엄 복합 비즈니스 타워입니다.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>파격 특별 프로모션 분양 선착순 진행 중</span>
            </div>
          </div>

          {/* Col 2: Project Specifications */}
          <div className="md:col-span-4 space-y-2 text-slate-400">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
              사업 안내 요약
            </h4>
            <p className="flex items-center gap-2">
              <span className="text-slate-500 w-16 shrink-0">사업명:</span>
              <span className="text-slate-300 font-medium">{PROJECT_INFO.officialName}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-slate-500 w-16 shrink-0">시설 구성:</span>
              <span className="text-slate-300 font-medium">{PROJECT_INFO.composition}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-slate-500 w-16 shrink-0">건축 규모:</span>
              <span className="text-slate-300 font-medium">지하 2층 ~ 지상 10층 (드라이브인 B2~4F)</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-slate-500 w-16 shrink-0">기숙사:</span>
              <span className="text-slate-300 font-medium">전 세대 약 4평 테라스 제공 (10층 복층 특화)</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-slate-500 w-16 shrink-0">공급 타입:</span>
              <span className="text-slate-300 font-medium">A, B, C, D, E, A-1, C-1</span>
            </p>
          </div>

          {/* Col 3: Customer Hotline */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              분양 상담 및 관심고객 등록
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">대표 상담 번호</span>
              <a
                href={`tel:${PROJECT_INFO.phone}`}
                className="text-xl font-black text-amber-400 hover:text-amber-300 transition-colors block"
              >
                {PROJECT_INFO.phoneDisplay}
              </a>
              <p className="text-[11px] text-slate-400 pt-1">
                번호를 남겨주시면 친절히 상담 도와드리겠습니다.
              </p>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p className="flex items-start gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>[안내 및 면책사항]</strong> 본 홈페이지에 사용된 CG, 조감도, 일러스트, 평면도, 아이소메트릭, 이미지 및 면적 수치는 소비자의 이해를 돕기 위한 것으로 실제 시공 및 인허가 과정에서 다소 변경될 수 있습니다. 
              세제 감면 혜택(취득세, 재산세 등) 및 정책자금 대출 조건은 정부 정책 및 관련 법령, 개인 및 기업 신용도에 따라 달라질 수 있으므로 반드시 분양 상담사를 통해 최종 확인하시기 바랍니다.
            </span>
          </p>
          <p className="pt-2 text-slate-600">
            © 2026 주안국가산단역 제이원플렉스 지식산업센터 분양안내센터. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
