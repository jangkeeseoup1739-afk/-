import React, { useState } from 'react';
import { MapPin, Train, Navigation, Truck, Building2, CheckCircle2, Clock, Footprints, ZoomIn, Maximize2, X, Sparkles, Upload, Image as ImageIcon } from 'lucide-react';
import { LOCATION_POINTS, PROJECT_INFO } from '../data/projectData';
const stationRouteImg = '/images/station_route_map_1789266592273.webp';

const STORAGE_KEY_STATION_IMAGE = 'joneflex_station_route_custom_image';

export const LocationSection: React.FC = () => {
  const [stationImage, setStationImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATION_IMAGE);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return stationRouteImg;
  });

  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Allow uploading replacement image if desired
  const handleImageChange = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      if (res) {
        setStationImage(res);
        try {
          localStorage.setItem(STORAGE_KEY_STATION_IMAGE, res);
        } catch (err) {
          console.warn('Could not save station image:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="py-16 bg-white" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-black mb-3">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            LOCATION ENVIRONMENT
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            주안국가산단역 2번 출구 <span className="text-blue-900">100m 초역세권</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            출퇴근 도보 약 2분(100m)의 압도적 역세권 프리미엄과 수도권 서부권을 관통하는 사통팔달 쾌속 물류 교통망
          </p>
        </div>

        {/* 100m Distance Showcase Visual Box */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info & Station Walking Photo */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-sm">
                <Footprints className="w-3.5 h-3.5" /> 도보 5분 거리 (100m)
              </span>

              <h3 className="text-2xl sm:text-3xl font-black leading-snug">
                역에서 나와 눈앞에 펼쳐지는<br />
                <span className="text-amber-400">초근접 100미터</span> 비즈니스 타워
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                인천 2호선 주안국가산단역 2번 출구에서 불과 100m 거리에 위치하여 우수한 임직원 인재 채용과 높은 출퇴근 만족도를 보장합니다.
              </p>

              {/* Attached Station Image Banner */}
              <div className="relative group rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-xl mt-2">
                <img 
                  src={stationImage}
                  alt="주안국가산단역 2번 출구에서 제이원플렉스까지 이동 동선 (100m)" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[220px] transition-transform duration-300 group-hover:scale-[1.02]"
                />

                {/* Floating overlay on hover */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="bg-slate-900/90 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-600 shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>확대보기</span>
                  </button>

                  <label className="bg-blue-600/90 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500 shadow-md flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-white" />
                    <span>사진 교체</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageChange(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="p-2.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold flex items-center gap-1.5 text-slate-200 text-[11px] sm:text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    주안국가산단역 2번 출입구 → 제이원플렉스 이동 동선도
                  </span>
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <ZoomIn className="w-3 h-3" />
                    확대
                  </button>
                </div>
              </div>

              {/* Bottom Subway Route Line */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
                  <Train className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">인천 2호선</span>
                    <span className="text-xs font-bold text-white">주안국가산단역</span>
                  </div>
                </div>

                <div className="text-amber-400 font-black text-sm">→</div>

                <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
                  <Footprints className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">거리 / 도보</span>
                    <span className="text-xs font-bold text-white">100m (약 2~5분)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Graphic Transit Map Route Schematic (Original Preserved) */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6">
              <div className="text-xs font-bold text-slate-400 mb-4 flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Navigation className="w-4 h-4" /> 주요 거점 연결 네트워크
                </span>
                <span>서울 및 수도권 광역 접근성</span>
              </div>

              {/* Transit Nodes */}
              <div className="space-y-3.5">
                
                {/* Node 1: Subway */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">
                      2호선
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">주안국가산단역 (2번 출구 100m)</h4>
                      <p className="text-xs text-slate-400">도보 2~5분 초근접, 눈앞에 보이는 랜드마크</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-md">
                    도보 100m
                  </span>
                </div>

                {/* Node 2: 1호선 주안역 */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-black text-xs">
                      1호선
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">주안역 특급/급행 환승</h4>
                      <p className="text-xs text-slate-400">구로, 용산, 서울역 30분대 진입 쾌속 통근</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-300 bg-blue-950 border border-blue-800 px-2.5 py-1 rounded-md">
                    1정거장 환승
                  </span>
                </div>

                {/* Node 3: 고속도로 IC */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black text-xs">
                      IC
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">경인고속도로 가좌IC · 도화IC</h4>
                      <p className="text-xs text-slate-400">수도권 제1·2순환고속도로, 인천국제공항 및 인천항</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-md">
                    차량 5~7분
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* 4 Location Points Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOCATION_POINTS.map((point, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors">
              <span className="text-[11px] font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                {point.highlight}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-2.5">
                {point.title}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative max-w-6xl w-full bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-900 text-amber-400">
                  <Train className="w-4 h-4" />
                </div>
                <h4 className="text-sm sm:text-base font-black text-white">
                  주안국가산단역 2번 출구 이동 동선도 (도보 약 2분, 100m)
                </h4>
              </div>

              <button
                onClick={() => setIsZoomOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center flex-1 bg-black/40 min-h-[360px]">
              <img
                src={stationImage}
                alt="주안국가산단역 2번 출구에서 제이원플렉스 이동 동선도 상세"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800 text-center text-xs text-slate-400">
              인천 2호선 주안국가산단역 2번 출구에서 제이원플렉스까지 도보 약 2분 (100m)
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

