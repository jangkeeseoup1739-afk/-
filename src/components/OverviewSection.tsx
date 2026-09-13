import React from 'react';
import { Building2, Store, BedDouble, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

interface OverviewSectionProps {
  onFloorGuideClick: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onFloorGuideClick }) => {
  return (
    <section className="py-16 bg-white" id="overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black tracking-wider text-blue-900 uppercase bg-blue-50 px-3 py-1 rounded-full">
            PROJECT OVERVIEW
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            비즈니스와 라이프의 완성, <span className="text-blue-900">제이원플렉스</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            지식산업센터와 근린생활시설, 테라스 기숙사가 유기적으로 결합된 
            인천 주안국가산단의 독보적 복합 랜드마크입니다.
          </p>
        </div>

        {/* 3 Major Composition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          {/* 1. 지식산업센터 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold mb-5 shadow-md shadow-blue-900/20">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xs font-black text-blue-900 bg-blue-100/70 px-2 py-0.5 rounded">지하2층~지상7층</span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                지식산업센터
              </h3>
              <p className="text-xs text-blue-700 font-semibold mt-0.5">
                제조형(드라이브인) + 섹션오피스
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                지하 2층~지상 4층 문 앞 하역이 가능한 드라이브인 도어투도어 시스템과, 5~7층 채광과 개방감을 극대화한 모듈형 섹션오피스로 구성됩니다.
              </p>
              
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>도어 투 도어 드라이브인 시스템 (B2~4F)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>최대 4.2m 높은 층고 &amp; 고하중 설계 (B2~4F)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>최대 3.9m 높은 층고 섹션오피스 (5F~7F)</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-500">주요 대상:</span>
              <p className="text-xs text-slate-800 font-medium mt-0.5">정밀제조, IT연구, 물류유통, 벤처스타트업</p>
            </div>
          </div>

          {/* 2. 근린생활시설 (근생) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold mb-5 shadow-md shadow-amber-500/20">
                <Store className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">지상 1층 스트리트</span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                근린생활시설 (상가)
              </h3>
              <p className="text-xs text-amber-700 font-semibold mt-0.5">
                초역세권 100m 유동인구 독점 상권
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                주안국가산단역 2번 출구에서 100m 보행자 메인 동선상에 위치하며, 건물 상주인구와 주변 산단 근로자들의 필수 편의시설을 제공합니다.
              </p>
              
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>대로변 전면 스트리트형 상가 배치</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>지산·기숙사 고정 상주수요 독점</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>편의점, 카페, 구내식당 등 필수 MD</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-500">주요 대상:</span>
              <p className="text-xs text-slate-800 font-medium mt-0.5">F&amp;B 카페, 베이커리, 편의점, 식당, 금융</p>
            </div>
          </div>

          {/* 3. 기숙사 (약 4평 테라스 & 복층) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold mb-5 shadow-md shadow-emerald-700/20">
                <BedDouble className="w-6 h-6 text-emerald-200" />
              </div>
              <span className="text-xs font-black text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded">지상 8층~10층</span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                기숙사 (테라스 특화)
              </h3>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                약 4평 광폭 테라스 &amp; 10층 일부 복층
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                전 호실 약 4평 광폭 단독 테라스를 제공하여 도심 속 쾌적한 힐링을 선사하며, 10층 최상층은 복층 특화 구조로 공간 효율을 극대화했습니다.
              </p>
              
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>전 호실 약 4평 광폭 테라스 무상 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>10층 일부세대 복층(Duplex) 구조 특화</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>풀옵션 빌트인 가전 &amp; 고급 샤워부스</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-500">주요 대상:</span>
              <p className="text-xs text-slate-800 font-medium mt-0.5">입주기업 임직원 기숙사, 1인 가구, 임대투자자</p>
            </div>
          </div>

        </div>

        {/* Project Outline Table */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-black text-slate-900">제이원플렉스 사업 개요 안내</h3>
              <p className="text-xs text-slate-500 mt-0.5">체계적인 건축 계획과 최적의 비즈니스 인프라</p>
            </div>
            <button
              onClick={onFloorGuideClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-white border border-slate-300 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>층별 세부 평면 보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">사업명</span>
              <span className="font-bold text-slate-900 mt-1 block">{PROJECT_INFO.officialName}</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">시설 구성</span>
              <span className="font-bold text-blue-900 mt-1 block">{PROJECT_INFO.composition}</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">건축 규모</span>
              <span className="font-bold text-slate-900 mt-1 block">{PROJECT_INFO.structure}</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">드라이브인 시스템</span>
              <span className="font-bold text-amber-600 mt-1 block">{PROJECT_INFO.driveInFloors}</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">교통 입지</span>
              <span className="font-bold text-slate-900 mt-1 block">{PROJECT_INFO.stationName} 2번 출구 100m</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">기숙사 특화</span>
              <span className="font-bold text-emerald-700 mt-1 block">전 세대 약 4평 테라스 무상 제공 (10층 복층)</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">공급 타입 라인업</span>
              <span className="font-bold text-slate-900 mt-1 block">A, B, C, D, E, A-1, C-1</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">상담 및 문의</span>
              <span className="font-bold text-blue-900 mt-1 block">{PROJECT_INFO.phoneDisplay}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
