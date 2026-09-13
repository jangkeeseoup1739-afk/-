import React, { useState } from 'react';
import { Layers, CheckCircle2, ArrowRight, Sparkles, Building, Car, Home, Briefcase, Maximize2 } from 'lucide-react';
import { FLOOR_GUIDES } from '../data/projectData';
import { FloorInfo } from '../types';

interface FloorGuideSectionProps {
  onRegisterClick: (initialInterest?: string) => void;
}

export const FloorGuideSection: React.FC<FloorGuideSectionProps> = ({ onRegisterClick }) => {
  const [selectedFloorId, setSelectedFloorId] = useState<string>('1-4F');
  const selectedFloor = FLOOR_GUIDES.find((f) => f.floorId === selectedFloorId) || FLOOR_GUIDES[0];

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden" id="floor-guide">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            FLOOR &amp; PLAN GUIDE
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            층별 특화 평면 및 <span className="text-amber-400">드라이브인 시스템</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            지하 2층부터 지상 4층까지 완비된 드라이브인과 5~7층 섹션오피스, 
            8~10층 약 4평 광폭 테라스가 제공되는 기숙사까지 맞춤형 설계를 확인하세요.
          </p>
        </div>

        {/* Floor Selection Tabs / Cross Section Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Vertical Floor Stack */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              층별 탭을 선택하여 세부 사양을 확인하세요
            </p>
            
            <div className="space-y-2">
              {FLOOR_GUIDES.map((floor) => {
                const isSelected = selectedFloor.floorId === floor.floorId;
                const isDriveIn = floor.floorId === '1-4F' || floor.floorId === 'B2-B1';
                const isTerrace = floor.floorId === '10F' || floor.floorId === '8-9F';

                return (
                  <button
                    key={floor.floorId}
                    onClick={() => setSelectedFloorId(floor.floorId)}
                    className={`w-full text-left p-4 rounded-xl transition-all border flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-blue-950 border-amber-400 shadow-lg shadow-blue-950/50 scale-[1.02]'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                        isSelected 
                          ? 'bg-amber-400 text-slate-950 shadow-xs' 
                          : 'bg-slate-700 text-slate-200'
                      }`}>
                        {floor.floorId}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>
                            {floor.category}
                          </span>
                          {isTerrace && (
                            <span className="text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.2 rounded">
                              4평 테라스
                            </span>
                          )}
                          {isDriveIn && (
                            <span className="text-[10px] font-extrabold bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.2 rounded">
                              드라이브인
                            </span>
                          )}
                          {floor.floorId === '5-7F' && (
                            <span className="text-[10px] font-extrabold bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.2 rounded">
                              최대 3.9m 층고
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-black text-white mt-0.5">
                          {floor.name}
                        </h4>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>

            {/* Drive-in Quick Info Callout */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/50 mt-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <Car className="w-4 h-4" />
                <span>드라이브인 핵심 구역 안내</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                <strong>지하 2층 ~ 지상 4층</strong>까지 화물 차량이 램프를 통해 각 층 호실 앞까지 직접 진입 가능한 도어 투 도어(Door-to-Door) 시스템을 지원합니다.
              </p>
            </div>
          </div>

          {/* Right: Detailed Floor Specification Viewer */}
          <div className="lg:col-span-8 bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
            
            {/* Top Badge & Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-700">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-1 rounded bg-amber-400 text-slate-950">
                    {selectedFloor.floorId}
                  </span>
                  <span className="text-xs font-bold text-blue-400 bg-blue-950/90 border border-blue-800 px-2 py-0.5 rounded">
                    {selectedFloor.tag}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {selectedFloor.name} : {selectedFloor.subName}
                </h3>
              </div>

              <button
                onClick={() => onRegisterClick(selectedFloor.category)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>{selectedFloor.name} 상담 신청</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Floor Description */}
            <p className="text-sm sm:text-base text-slate-300 mt-5 leading-relaxed">
              {selectedFloor.description}
            </p>

            {/* Floor Visual Render */}
            {selectedFloor.image && (
              <div className="mt-5 rounded-2xl overflow-hidden border border-slate-700/80 relative aspect-[16/10] sm:aspect-[16/9] shadow-xl group">
                <img
                  key={selectedFloor.image}
                  src={selectedFloor.image}
                  alt={`${selectedFloor.name} 특화 조감도 및 실물`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{selectedFloor.name} {selectedFloor.subName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {(selectedFloor.image.includes('real_') || selectedFloor.image.includes('1789120455292')) && (
                      <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-700/70 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        현장 실물 사진
                      </span>
                    )}
                    <span className="bg-blue-900/90 backdrop-blur-md text-blue-200 border border-blue-700/60 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {selectedFloor.tag}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block font-medium">설계 층고</span>
                <span className="text-sm sm:text-base font-black text-amber-400 mt-0.5 block">
                  {selectedFloor.ceilingHeight}
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block font-medium">바닥 하중 / 테라스</span>
                <span className="text-sm sm:text-base font-black text-blue-400 mt-0.5 block">
                  {selectedFloor.floorLoad || (selectedFloor.floorId.includes('F') && parseInt(selectedFloor.floorId) >= 8 ? '약 4평 테라스' : '0.6~1.2 ton/㎡')}
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/80 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 block font-medium">주요 용도</span>
                <span className="text-sm sm:text-base font-black text-emerald-400 mt-0.5 block truncate">
                  {selectedFloor.category}
                </span>
              </div>
            </div>

            {/* Key Features List */}
            <div className="mt-6 pt-5 border-t border-slate-700">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {selectedFloor.name} 핵심 설계 포인트
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedFloor.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
