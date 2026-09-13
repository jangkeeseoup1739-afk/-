import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  ZoomIn, 
  X, 
  Link as LinkIcon, 
  Check, 
  Maximize2,
  Building,
  Layers,
  ChevronRight,
  Info,
  SlidersHorizontal,
  Home,
  Briefcase,
  Store,
  BedDouble
} from 'lucide-react';
import { FLOOR_PLANS_1_TO_10, UNIT_TYPES } from '../data/projectData';
import { FloorPlanItem, UnitType } from '../types';
import { compressImageFile, estimateBytes, formatSize, trySaveToStorage } from '../lib/imageStore';

interface UnitTypesSectionProps {
  onSelectUnit: (unit: UnitType) => void;
}

const STORAGE_KEY_UNIT_PLANS = 'joneflex_unit_type_plans_v2';
const STORAGE_KEY_FLOOR_PLANS = 'joneflex_floor_plans_1_to_10_v2';

/**
 * 분양 자료로 받은 타입별 평면도. 모든 방문객에게 보입니다.
 * A와 A-1, C와 C-1 은 같은 자료 한 장에 함께 실려 있어 같은 파일을 씁니다.
 */
const DEFAULT_UNIT_PLANS: Record<string, string> = {
  'type-a': '/images/plans/plan-a.webp',
  'type-a-1': '/images/plans/plan-a.webp',
  'type-b': '/images/plans/plan-b.webp',
  'type-c': '/images/plans/plan-c.webp',
  'type-c-1': '/images/plans/plan-c.webp',
  'type-d': '/images/plans/plan-d.webp',
  'type-e': '/images/plans/plan-e.webp',
};

export const UnitTypesSection: React.FC<UnitTypesSectionProps> = ({ onSelectUnit }) => {
  // Main view tab: 'units' (A, B, C, D, E, A-1, C-1) vs 'floors' (1F ~ 10F)
  const [activeTab, setActiveTab] = useState<'units' | 'floors'>('units');

  // Selected items
  const [selectedUnit, setSelectedUnit] = useState<UnitType>(UNIT_TYPES[0]);
  const [selectedFloor, setSelectedFloor] = useState<FloorPlanItem>(FLOOR_PLANS_1_TO_10[0]);
  const [activeFloorCategory, setActiveFloorCategory] = useState<string>('all');
  const [activeUnitCategory, setActiveUnitCategory] = useState<string>('all');

  // Stored plans for Unit Types (A, B, C, D, E, A-1, C-1)
  const [unitPlans, setUnitPlans] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_UNIT_PLANS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Stored plans for Floors (1F ~ 10F)
  const [floorPlans, setFloorPlans] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FLOOR_PLANS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Modal & Interaction states
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Sync to LocalStorage.
  // 첫 렌더에서는 방금 읽어온 값을 그대로 되쓰는 것이라 건너뜁니다.
  // (저장이 아예 막힌 브라우저에서 방문 즉시 경고가 뜨는 것을 막기 위함)
  const unitPlansFirstSync = useRef(true);
  const floorPlansFirstSync = useRef(true);

  useEffect(() => {
    if (unitPlansFirstSync.current) {
      unitPlansFirstSync.current = false;
      return;
    }
    if (!trySaveToStorage(STORAGE_KEY_UNIT_PLANS, JSON.stringify(unitPlans))) {
      showToast('저장 공간이 부족해 사진이 저장되지 않았습니다. 등록된 평면도를 일부 삭제한 뒤 다시 시도해 주세요.');
    }
  }, [unitPlans]);

  useEffect(() => {
    if (floorPlansFirstSync.current) {
      floorPlansFirstSync.current = false;
      return;
    }
    if (!trySaveToStorage(STORAGE_KEY_FLOOR_PLANS, JSON.stringify(floorPlans))) {
      showToast('저장 공간이 부족해 사진이 저장되지 않았습니다. 등록된 평면도를 일부 삭제한 뒤 다시 시도해 주세요.');
    }
  }, [floorPlans]);

  // Toast Notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 홈페이지에 기본으로 들어 있는 타입별 평면도.
  // 사장님이 직접 첨부한 사진이 있으면 그쪽이 우선합니다.
  const resolvedUnitPlans: Record<string, string> = { ...DEFAULT_UNIT_PLANS, ...unitPlans };

  // Helper getters based on current activeTab
  const currentTargetName = activeTab === 'units' ? selectedUnit.name : selectedFloor.name;
  const currentTargetId = activeTab === 'units' ? selectedUnit.id : selectedFloor.floorId;
  const currentAttachedImage = activeTab === 'units' ? resolvedUnitPlans[selectedUnit.id] : floorPlans[selectedFloor.floorId];

  // 사진을 줄여서 등록합니다.
  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(JPG, PNG, WEBP 등)만 등록 가능합니다.');
      return;
    }

    let result: string;
    try {
      result = await compressImageFile(file);
    } catch {
      alert('사진을 처리하지 못했습니다. 다른 사진으로 다시 시도해 주세요.');
      return;
    }

    const size = formatSize(estimateBytes(result));

    if (activeTab === 'units') {
      setUnitPlans((prev) => ({
        ...prev,
        [selectedUnit.id]: result,
      }));
      showToast(`[${selectedUnit.name}] 평면도 사진이 등록되었습니다. (${size})`);
    } else {
      setFloorPlans((prev) => ({
        ...prev,
        [selectedFloor.floorId]: result,
      }));
      showToast(`[${selectedFloor.name}] 평면도 사진이 등록되었습니다. (${size})`);
    }
    setIsEditModalOpen(false);
  };

  // Drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Direct URL submission
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    if (activeTab === 'units') {
      setUnitPlans((prev) => ({
        ...prev,
        [selectedUnit.id]: inputUrl.trim(),
      }));
      showToast(`[${selectedUnit.name}] 평면도 경로가 등록되었습니다.`);
    } else {
      setFloorPlans((prev) => ({
        ...prev,
        [selectedFloor.floorId]: inputUrl.trim(),
      }));
      showToast(`[${selectedFloor.name}] 평면도 경로가 등록되었습니다.`);
    }
    setInputUrl('');
    setIsEditModalOpen(false);
  };

  // Delete attached plan
  const handleDeletePlan = () => {
    // 타입별 평면도는 분양 자료가 기본으로 들어 있어, 삭제하면 그 자료로 되돌아갑니다.
    const revertsToDefault = activeTab === 'units' && !!DEFAULT_UNIT_PLANS[selectedUnit.id];
    const question = revertsToDefault
      ? `${currentTargetName}에 첨부한 사진을 지우고 기본 분양 자료 평면도로 되돌리시겠습니까?`
      : `${currentTargetName}의 등록된 평면도 사진을 삭제하시겠습니까?`;

    if (window.confirm(question)) {
      if (activeTab === 'units') {
        setUnitPlans((prev) => {
          const next = { ...prev };
          delete next[selectedUnit.id];
          return next;
        });
        showToast(
          revertsToDefault
            ? `${selectedUnit.name} 평면도가 기본 분양 자료로 되돌아갔습니다.`
            : `${selectedUnit.name} 평면도 사진이 삭제되었습니다.`
        );
      } else {
        setFloorPlans((prev) => {
          const next = { ...prev };
          delete next[selectedFloor.floorId];
          return next;
        });
        showToast(`${selectedFloor.name} 평면도 사진이 삭제되었습니다.`);
      }
      setIsEditModalOpen(false);
    }
  };

  // Category filters for Unit Types
  const unitCategories = [
    { id: 'all', label: '전체 타입 (A, B, C, D, E, A-1, C-1)' },
    { id: 'office', label: '섹션오피스 (C, D)' },
    { id: 'factory', label: '기숙사 (A, B)' },
    { id: 'dorm', label: '테라스 기숙사 (A-1, C-1)' },
    { id: 'retail', label: '근린생활시설 상가 (E)' },
  ];

  const filteredUnits = UNIT_TYPES.filter((unit) => {
    if (activeUnitCategory === 'office') return unit.id === 'type-c' || unit.id === 'type-d';
    if (activeUnitCategory === 'factory') return unit.id === 'type-a' || unit.id === 'type-b';
    if (activeUnitCategory === 'dorm') return unit.id === 'type-a-1' || unit.id === 'type-c-1';
    if (activeUnitCategory === 'retail') return unit.id === 'type-e';
    return true;
  });

  // Category filters for Floors
  const floorCategories = [
    { id: 'all', label: '전체 층 (1F ~ 10F)' },
    { id: 'drivein', label: '지상 1~4층 (드라이브인·상가)' },
    { id: 'office', label: '지상 5~7층 (섹션오피스)' },
    { id: 'dormitory', label: '지상 8~10층 (테라스·복층 기숙사)' },
  ];

  const filteredFloors = FLOOR_PLANS_1_TO_10.filter((f) => {
    if (activeFloorCategory === 'drivein') return f.floorNumber <= 4;
    if (activeFloorCategory === 'office') return f.floorNumber >= 5 && f.floorNumber <= 7;
    if (activeFloorCategory === 'dormitory') return f.floorNumber >= 8;
    return true;
  });

  // Icon helper for unit categories
  const getUnitIcon = (unit: UnitType) => {
    if (unit.id === 'type-e') return <Store className="w-4 h-4 text-emerald-600" />;
    if (unit.id === 'type-a-1' || unit.id === 'type-c-1') return <BedDouble className="w-4 h-4 text-amber-600" />;
    if (unit.id === 'type-c' || unit.id === 'type-d') return <Briefcase className="w-4 h-4 text-blue-600" />;
    return <Building className="w-4 h-4 text-slate-700" />;
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="unit-types">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-3 animate-fade-in text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black mb-3">
            <LayoutGrid className="w-3.5 h-3.5 text-blue-800" />
            공급안내 · 평면도 첨부 &amp; 편집 시스템
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            제이원플렉스 <span className="text-blue-900">공급안내 평면도 갤러리</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            <strong>오피스/지산/상가/기숙사 타입별 평면도(A, B, C, D, E, A-1, C-1)</strong> 및 
            <strong>지상 1층부터 10층까지의 층별 평면도</strong>를 직접 첨부하고 언제든 편집하실 수 있습니다.
          </p>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-2xl bg-white p-1.5 border border-slate-300 shadow-sm max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('units')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'units'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>타입별 평면도 (A타입, B, C, D, E, A-1, C-1)</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'units' ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
              }`}>
                {Object.keys(resolvedUnitPlans).length}/7개 첨부됨
              </span>
            </button>

            <button
              onClick={() => setActiveTab('floors')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'floors'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4 text-amber-400" />
              <span>지상 1층 ~ 10층 층별 평면도</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'floors' ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
              }`}>
                {Object.keys(floorPlans).length}/10개 첨부됨
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE 1: 타입별 평면도 (A타입, B, C, D, E, A-1, C-1) */}
        {/* ========================================================================= */}
        {activeTab === 'units' && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {unitCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveUnitCategory(cat.id);
                    const matches = UNIT_TYPES.filter((u) => {
                      if (cat.id === 'office') return u.id === 'type-c' || u.id === 'type-d';
                      if (cat.id === 'factory') return u.id === 'type-a' || u.id === 'type-b';
                      if (cat.id === 'dorm') return u.id === 'type-a-1' || u.id === 'type-c-1';
                      if (cat.id === 'retail') return u.id === 'type-e';
                      return true;
                    });
                    if (matches.length > 0 && !matches.some(m => m.id === selectedUnit.id)) {
                      setSelectedUnit(matches[0]);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeUnitCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Main Unit Types Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: 7 Unit Types Selector */}
              <div className="lg:col-span-4 space-y-2">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-2 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-900" />
                    유닛 타입 선택 (총 7개)
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {Object.keys(resolvedUnitPlans).length}/7개 사진 등록
                  </span>
                </div>

                <div className="space-y-2">
                  {filteredUnits.map((unit) => {
                    const isSelected = selectedUnit.id === unit.id;
                    const hasPlan = !!resolvedUnitPlans[unit.id];

                    return (
                      <div
                        key={unit.id}
                        onClick={() => setSelectedUnit(unit)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/20 scale-[1.01]'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 shadow-sm'
                              : 'bg-slate-100 text-blue-900 border border-slate-200'
                          }`}>
                            {unit.name.replace(' 타입', '')}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-black truncate">{unit.name}</p>
                              {unit.terraceAreaPy && (
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-50 text-emerald-700'
                                }`}>
                                  테라스
                                </span>
                              )}
                              {unit.isDuplex && (
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  isSelected ? 'bg-amber-900 text-amber-200' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  복층
                                </span>
                              )}
                            </div>
                            <p className={`text-xs truncate ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                              {unit.category} · 전용 {unit.exclusiveAreaPy}평 ({unit.exclusiveAreaM2}㎡)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {hasPlan ? (
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-0.5 ${
                              isSelected 
                                ? 'bg-amber-400 text-slate-950' 
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            }`}>
                              <Check className="w-2.5 h-2.5" />
                              평면도
                            </span>
                          ) : (
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                              isSelected ? 'text-blue-300' : 'text-slate-400'
                            }`}>
                              미첨부
                            </span>
                          )}
                          <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Unit Floor Plan Workspace */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                
                {/* Header of Selected Unit */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black bg-blue-900 text-white px-3 py-1 rounded-md">
                        {selectedUnit.name}
                      </span>
                      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                        {getUnitIcon(selectedUnit)}
                        {selectedUnit.category}
                      </span>
                      {selectedUnit.terraceAreaPy && (
                        <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-700" />
                          단독 테라스 약 {selectedUnit.terraceAreaPy}평
                        </span>
                      )}
                      {selectedUnit.isDuplex && (
                        <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-300">
                          10층 복층(Duplex) 특화
                        </span>
                      )}
                      {selectedUnit.driveInCompatible && (
                        <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2.5 py-1 rounded-md border border-blue-300">
                          도어투도어 드라이브인
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 flex items-center gap-2">
                      {selectedUnit.name} 정밀 평면도 &amp; 사양
                    </h3>
                  </div>

                  <button
                    onClick={() => onSelectUnit(selectedUnit)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
                  >
                    <span>{selectedUnit.name} 분양 상담 신청</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
                  {selectedUnit.description}
                </p>

                {/* Area Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-center">
                    <span className="text-[11px] text-blue-800 font-bold">전용 면적</span>
                    <p className="text-base sm:text-lg font-black text-blue-950 mt-0.5">{selectedUnit.exclusiveAreaPy}평</p>
                    <p className="text-[10px] text-slate-500">{selectedUnit.exclusiveAreaM2}㎡</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 font-medium">계약 면적</span>
                    <p className="text-base sm:text-lg font-black text-slate-800 mt-0.5">{selectedUnit.contractAreaPy}평</p>
                    <p className="text-[10px] text-slate-400">{selectedUnit.contractAreaM2}㎡</p>
                  </div>

                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-center">
                    <span className="text-[11px] text-amber-800 font-bold">서비스 / 특화</span>
                    <p className="text-xs sm:text-sm font-black text-amber-900 mt-1 truncate">
                      {selectedUnit.terraceAreaPy ? `테라스 ${selectedUnit.terraceAreaPy}평` : (selectedUnit.isDuplex ? '복층 4.5m 층고' : '서비스 발코니')}
                    </p>
                    <p className="text-[10px] text-amber-700">무상 제공 혜택</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 font-medium">추천 용도</span>
                    <p className="text-xs font-bold text-slate-800 mt-1 truncate">{selectedUnit.recommendedUsage}</p>
                    <p className="text-[10px] text-blue-700">최적 입주 업종</p>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* UNIT FLOOR PLAN ATTACHMENT & VIEWER WORKSPACE */}
                {/* ========================================================================= */}
                <div className="mt-8 rounded-2xl bg-slate-900 text-white border border-slate-800 overflow-hidden shadow-md">
                  
                  {/* Action Toolbar */}
                  <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-900/70 border border-blue-700 text-amber-400">
                        <LayoutGrid className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                          <span>{selectedUnit.name} 평면도</span>
                          {resolvedUnitPlans[selectedUnit.id] ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                              평면도 사진 첨부됨
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                              사진 첨부 대기
                            </span>
                          )}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Upload / Edit Button */}
                      <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                        title={`${selectedUnit.name} 평면도 사진 첨부 및 편집`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{resolvedUnitPlans[selectedUnit.id] ? '사진 편집 / 교체' : `${selectedUnit.name} 사진 첨부`}</span>
                      </button>

                      {/* Zoom Button */}
                      {resolvedUnitPlans[selectedUnit.id] && (
                        <button
                          onClick={() => setIsZoomModalOpen(true)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 p-2 rounded-xl transition-all cursor-pointer"
                          title="평면도 크게 보기"
                        >
                          <ZoomIn className="w-4 h-4 text-amber-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main Display Canvas */}
                  <div className="p-4 sm:p-6">
                    {resolvedUnitPlans[selectedUnit.id] ? (
                      // Display Uploaded Unit Plan
                      <div className="relative group rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[320px] max-h-[520px]">
                        <img
                          src={resolvedUnitPlans[selectedUnit.id]}
                          alt={`${selectedUnit.name} 실제 평면도`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain max-h-[500px] p-2 transition-transform duration-300 group-hover:scale-[1.01]"
                        />

                        {/* Hover Overlay Controls */}
                        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                          <button
                            onClick={() => setIsZoomModalOpen(true)}
                            className="bg-slate-900/95 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-600 shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                          >
                            <Maximize2 className="w-4 h-4 text-amber-400" />
                            <span>전체화면 확대 보기</span>
                          </button>
                          <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="bg-blue-600/95 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-blue-500 shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                          >
                            <Upload className="w-4 h-4" />
                            <span>다른 사진으로 교체</span>
                          </button>
                        </div>

                        {/* Bottom Tag */}
                        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 pointer-events-none">
                          <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700">
                            {selectedUnit.name} ({selectedUnit.category}) 건축 평면도
                          </span>
                          <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 text-amber-300">
                            클릭하여 확대
                          </span>
                        </div>
                      </div>
                    ) : (
                      // Empty Dropzone State for Unit
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[320px] ${
                          isDragging
                            ? 'border-amber-400 bg-blue-950/60'
                            : 'border-slate-700 bg-slate-950/50 hover:bg-slate-900/80 hover:border-slate-500'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileProcess(e.target.files[0]);
                            }
                          }}
                        />

                        <div className="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-700 flex items-center justify-center mb-4 text-amber-400 shadow-inner group-hover:scale-110 transition-transform">
                          <Upload className="w-8 h-8" />
                        </div>

                        <h4 className="text-base sm:text-lg font-black text-white mb-2">
                          {selectedUnit.name} 평면도 사진 첨부하기
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                          이곳을 <strong>클릭</strong>하여 {selectedUnit.name} 평면도 이미지(JPG, PNG)를 선택하거나,<br />
                          파일을 여기에 <strong>드래그 &amp; 드롭</strong>하여 즉시 첨부하세요.
                        </p>

                        <div className="mt-6">
                          <button
                            type="button"
                            className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow"
                          >
                            <ImageIcon className="w-4 h-4" />
                            <span>{selectedUnit.name} 평면도 사진 찾기</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Info & Delete Action */}
                  <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      A타입, B, C, D, E, A-1, C-1 총 7개 타입의 평면도를 개별적으로 첨부하고 관리할 수 있습니다.
                    </span>
                    {resolvedUnitPlans[selectedUnit.id] && (
                      <button
                        onClick={handleDeletePlan}
                        className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{selectedUnit.name} 사진 삭제</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Key Features for Selected Unit */}
                <div className="mt-8">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    {selectedUnit.name} 특화 설계 및 공간 장점
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedUnit.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: 지상 1층 ~ 10층 층별 평면도 */}
        {/* ========================================================================= */}
        {activeTab === 'floors' && (
          <div>
            {/* Floor Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {floorCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveFloorCategory(cat.id);
                    const matches = FLOOR_PLANS_1_TO_10.filter((f) => {
                      if (cat.id === 'drivein') return f.floorNumber <= 4;
                      if (cat.id === 'office') return f.floorNumber >= 5 && f.floorNumber <= 7;
                      if (cat.id === 'dormitory') return f.floorNumber >= 8;
                      return true;
                    });
                    if (matches.length > 0 && !matches.some(m => m.floorId === selectedFloor.floorId)) {
                      setSelectedFloor(matches[0]);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeFloorCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Main 1F~10F Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: 10 Floors Selector */}
              <div className="lg:col-span-4 space-y-2">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-2 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-blue-900" />
                    층 선택 (지상 1층 ~ 10층)
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {Object.keys(floorPlans).length}/10개 첨부됨
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-1 gap-2">
                  {[...filteredFloors].reverse().map((floor) => {
                    const isSelected = selectedFloor.floorId === floor.floorId;
                    const hasPlan = !!floorPlans[floor.floorId];

                    return (
                      <div
                        key={floor.floorId}
                        onClick={() => setSelectedFloor(floor)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/20 scale-[1.01]'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 shadow-sm'
                              : 'bg-slate-100 text-blue-900 border border-slate-200'
                          }`}>
                            {floor.shortName}
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-black truncate flex items-center gap-1">
                              <span>{floor.name}</span>
                            </p>
                            <p className={`text-[11px] truncate ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                              {floor.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {hasPlan ? (
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-0.5 ${
                              isSelected 
                                ? 'bg-amber-400 text-slate-950' 
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            }`}>
                              <Check className="w-2.5 h-2.5" />
                              평면도
                            </span>
                          ) : (
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                              isSelected ? 'text-blue-300' : 'text-slate-400'
                            }`}>
                              미등록
                            </span>
                          )}
                          <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Floor Blueprint Workspace */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                
                {/* Header of Selected Floor */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black bg-blue-900 text-white px-3 py-1 rounded-md">
                        {selectedFloor.name}
                      </span>
                      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                        {selectedFloor.category}
                      </span>
                      <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-700" />
                        {selectedFloor.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 flex items-center gap-2">
                      {selectedFloor.name} 평면도 &amp; 사양
                    </h3>
                  </div>

                  <button
                    onClick={() => onSelectUnit(UNIT_TYPES[0])}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
                  >
                    <span>{selectedFloor.name} 잔여호실 상담 신청</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
                  {selectedFloor.description}
                </p>

                {/* Specifications Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 font-medium">층고</span>
                    <p className="text-base font-black text-blue-900 mt-0.5">{selectedFloor.ceilingHeight}</p>
                    <p className="text-[10px] text-slate-400">시원한 개방감</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 font-medium">바닥 하중</span>
                    <p className="text-base font-black text-slate-800 mt-0.5">{selectedFloor.floorLoad || '0.6 ton/㎡'}</p>
                    <p className="text-[10px] text-slate-400">구조 안전성</p>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
                    <span className="text-[11px] text-amber-800 font-bold">배치 유닛</span>
                    <p className="text-xs font-black text-amber-900 mt-1 line-clamp-1">{selectedFloor.unitsOnFloor}</p>
                    <p className="text-[10px] text-amber-700">추천 타입 라인업</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 font-medium">특화 설계</span>
                    <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">{selectedFloor.tag}</p>
                    <p className="text-[10px] text-blue-700">제이원플렉스 특장점</p>
                  </div>
                </div>

                {/* Floor Blueprint Display & Dropzone */}
                <div className="mt-8 rounded-2xl bg-slate-900 text-white border border-slate-800 overflow-hidden shadow-md">
                  
                  {/* Action Toolbar */}
                  <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-900/70 border border-blue-700 text-amber-400">
                        <LayoutGrid className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                          <span>{selectedFloor.name} 정밀 평면도</span>
                          {floorPlans[selectedFloor.floorId] ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                              평면도 사진 첨부됨
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                              사진 첨부 대기
                            </span>
                          )}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                        title={`${selectedFloor.name} 평면도 사진 첨부 및 편집`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{floorPlans[selectedFloor.floorId] ? '사진 편집 / 교체' : `${selectedFloor.shortName} 사진 첨부`}</span>
                      </button>

                      {floorPlans[selectedFloor.floorId] && (
                        <button
                          onClick={() => setIsZoomModalOpen(true)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 p-2 rounded-xl transition-all cursor-pointer"
                          title="평면도 크게 보기"
                        >
                          <ZoomIn className="w-4 h-4 text-amber-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Floor Plan Display */}
                  <div className="p-4 sm:p-6">
                    {floorPlans[selectedFloor.floorId] ? (
                      <div className="relative group rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[320px] max-h-[520px]">
                        <img
                          src={floorPlans[selectedFloor.floorId]}
                          alt={`${selectedFloor.name} 실제 평면도`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain max-h-[500px] p-2 transition-transform duration-300 group-hover:scale-[1.01]"
                        />

                        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                          <button
                            onClick={() => setIsZoomModalOpen(true)}
                            className="bg-slate-900/95 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-600 shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                          >
                            <Maximize2 className="w-4 h-4 text-amber-400" />
                            <span>전체화면 확대 보기</span>
                          </button>
                          <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="bg-blue-600/95 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-blue-500 shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                          >
                            <Upload className="w-4 h-4" />
                            <span>다른 사진으로 교체</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[320px] ${
                          isDragging
                            ? 'border-amber-400 bg-blue-950/60'
                            : 'border-slate-700 bg-slate-950/50 hover:bg-slate-900/80 hover:border-slate-500'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileProcess(e.target.files[0]);
                            }
                          }}
                        />

                        <div className="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-700 flex items-center justify-center mb-4 text-amber-400 shadow-inner group-hover:scale-110 transition-transform">
                          <Upload className="w-8 h-8" />
                        </div>

                        <h4 className="text-base sm:text-lg font-black text-white mb-2">
                          {selectedFloor.name} 평면도 사진 첨부하기
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                          이곳을 <strong>클릭</strong>하여 {selectedFloor.name} 평면도 이미지(JPG, PNG)를 선택하거나,<br />
                          파일을 여기에 <strong>드래그 &amp; 드롭</strong>하여 즉시 첨부하세요.
                        </p>

                        <div className="mt-6">
                          <button
                            type="button"
                            className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow"
                          >
                            <ImageIcon className="w-4 h-4" />
                            <span>{selectedFloor.name} 평면도 사진 찾기</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Info & Delete Action */}
                  <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      지상 1층부터 10층까지 원하는 층을 선택하여 각 층의 평면도를 독립적으로 등록 및 관리할 수 있습니다.
                    </span>
                    {floorPlans[selectedFloor.floorId] && (
                      <button
                        onClick={handleDeletePlan}
                        className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{selectedFloor.shortName} 사진 삭제</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Key Features for Floor */}
                <div className="mt-8">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    {selectedFloor.name} 특화 설계 및 공간 장점
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedFloor.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* SHARED EDIT / ATTACH MODAL */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-900/60 border border-blue-700 text-amber-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {currentTargetName} 평면도 사진 첨부 및 편집
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeTab === 'units' ? `${selectedUnit.category} · ${selectedUnit.exclusiveAreaPy}평` : `${selectedFloor.category} · ${selectedFloor.tag}`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              {/* Option 1: File Pick / Drag & Drop */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  1. 내 컴퓨터/스마트폰에서 평면도 사진 선택
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => modalFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-xl p-6 text-center bg-slate-950/50 hover:bg-slate-950 transition-all cursor-pointer flex flex-col items-center justify-center"
                >
                  <input
                    ref={modalFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileProcess(e.target.files[0]);
                      }
                    }}
                  />
                  <ImageIcon className="w-8 h-8 text-amber-400 mb-2" />
                  <span className="text-sm font-bold text-white">
                    {currentTargetName} 사진 파일 첨부하기 (클릭 또는 드래그)
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    JPG, PNG, WEBP 등 지원
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-slate-500">또는</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              {/* Option 2: Image URL / Path */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  2. 이미지 파일 경로 또는 웹 URL 직접 입력
                </label>
                <form onSubmit={handleUrlSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="/images/... 또는 https://..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer"
                  >
                    적용
                  </button>
                </form>
              </div>

              {/* Current Image Status & Delete */}
              {currentAttachedImage && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={currentAttachedImage}
                      alt="현재 평면도 썸네일"
                      className="w-10 h-10 object-cover rounded-lg border border-slate-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{currentTargetName} 평면도 등록됨</p>
                      <p className="text-[10px] text-slate-400">교체하려면 위에서 새 이미지를 선택하세요</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDeletePlan}
                    className="text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/70 border border-red-800/60 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>삭제</span>
                  </button>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHARED FULLSCREEN LIGHTBOX / ZOOM MODAL */}
      {/* ========================================================================= */}
      {isZoomModalOpen && currentAttachedImage && (
        <div 
          onClick={() => setIsZoomModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-amber-400 text-slate-950 px-2.5 py-1 rounded">
                  {currentTargetName}
                </span>
                <h4 className="text-sm font-bold text-white">
                  정밀 평면도 고화질 원본 뷰어
                </h4>
              </div>

              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img
                src={currentAttachedImage}
                alt={`${currentTargetName} 정밀 평면도`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Footer */}
            <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                {activeTab === 'units' 
                  ? `${selectedUnit.name} · ${selectedUnit.category} · 전용 ${selectedUnit.exclusiveAreaPy}평` 
                  : `${selectedFloor.name} · ${selectedFloor.category} · ${selectedFloor.tag}`}
              </span>
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all cursor-pointer"
              >
                닫기 (ESC)
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
