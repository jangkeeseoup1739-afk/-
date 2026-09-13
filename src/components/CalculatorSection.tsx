import React, { useState } from 'react';
import { Calculator, Coins, Percent, ArrowRight, Sparkles, HelpCircle, Phone } from 'lucide-react';
import { UNIT_TYPES, PROJECT_INFO } from '../data/projectData';

interface CalculatorSectionProps {
  onRegisterWithCalculation: (note: string) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onRegisterWithCalculation }) => {
  const [selectedTypeId, setSelectedTypeId] = useState<string>('type-a-1');
  
  // Preset estimated prices in 10,000 KRW (만원 단위)
  const priceMap: Record<string, number> = {
    'type-a': 38000,   // A타입 약 3.8억
    'type-b': 46000,   // B타입 약 4.6억
    'type-c': 19000,   // C타입 약 1.9억
    'type-d': 28000,   // D타입 약 2.8억
    'type-e': 39000,   // E타입 약 3.9억
    'type-a-1': 14500, // A-1 기숙사(테라스) 약 1.45억
    'type-c-1': 17500, // C-1 복층기숙사(테라스) 약 1.75억
  };

  const isDormitory = selectedTypeId === 'type-a-1' || selectedTypeId === 'type-c-1';
  const maxLoanRatio = isDormitory ? 50 : 70;

  const [supplyPrice, setSupplyPrice] = useState<number>(priceMap['type-a-1']);
  const [loanRatio, setLoanRatio] = useState<number>(50); // 기본 50%
  const [interestRate, setInterestRate] = useState<number>(4.0); // 4.0%
  const [monthlyRent, setMonthlyRent] = useState<number>(65); // 만원 단위 (65만원)
  const [deposit, setDeposit] = useState<number>(1000); // 만원 단위 (1000만원)

  const handleTypeChange = (typeId: string) => {
    setSelectedTypeId(typeId);
    const isDorm = typeId === 'type-a-1' || typeId === 'type-c-1';
    // Dormitory max loan is 50%, other units max loan is 70%
    setLoanRatio(isDorm ? 50 : 70);

    if (priceMap[typeId]) {
      setSupplyPrice(priceMap[typeId]);
      // Adjust standard estimated rent based on type
      if (typeId === 'type-a-1') {
        setMonthlyRent(65);
        setDeposit(1000);
      } else if (typeId === 'type-c-1') {
        setMonthlyRent(78);
        setDeposit(1000);
      } else if (typeId === 'type-c') {
        setMonthlyRent(90);
        setDeposit(1500);
      } else if (typeId === 'type-a') {
        setMonthlyRent(180);
        setDeposit(2500);
      } else {
        setMonthlyRent(120);
        setDeposit(2000);
      }
    }
  };

  // Calculations
  const contractDeposit = Math.round(supplyPrice * 0.1); // 계약금 10%
  const loanAmount = Math.round((supplyPrice * loanRatio) / 100);
  const actualEquity = supplyPrice - loanAmount - deposit; // 실투자금 (공급가 - 대출금 - 보증금)
  const safeEquity = actualEquity > 0 ? actualEquity : contractDeposit;

  const annualLoanInterest = (loanAmount * (interestRate / 100)); // 연 이자
  const annualRentIncome = monthlyRent * 12; // 연 임대료 수입
  const annualNetProfit = annualRentIncome - annualLoanInterest; // 연 순수익
  const returnOnEquity = safeEquity > 0 ? ((annualNetProfit / safeEquity) * 100).toFixed(1) : '0.0';

  // Tax reduction (취득세 기본 4.6%에서 최대 35% 감면 혜택)
  const normalAcquisitionTax = Math.round(supplyPrice * 0.046);
  const taxSavings = Math.round(normalAcquisitionTax * 0.35);

  const currentUnit = UNIT_TYPES.find(u => u.id === selectedTypeId);

  const handleInquiryFromCalc = () => {
    const summary = `[수익률계산기] ${currentUnit?.name || '관심타입'} / 공급가: ${supplyPrice.toLocaleString()}만원 / 대출: ${loanRatio}% / 예상수익률: ${returnOnEquity}%`;
    onRegisterWithCalculation(summary);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black mb-3">
            <Calculator className="w-3.5 h-3.5" />
            FINANCIAL SIMULATOR
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            분양 자금 및 <span className="text-emerald-700">예상 수익률 계산기</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            대출 최대 70%(기숙사 50%) - 각 분양공급가(부가세 제외) 및 취득세 최대 35% 감면 적용 시 
            실투자금과 금융 혜택을 직접 확인해 보세요.
          </p>
        </div>

        {/* Simulator Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Inputs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* 1. Unit Type Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                1. 관심 공급 타입 선택 (A ~ C-1)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {UNIT_TYPES.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleTypeChange(u.id)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTypeId === u.id
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {u.name}
                  </button>
                ))}
              </div>
              {currentUnit && (
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-blue-900 mt-2 font-medium bg-blue-50/70 p-2.5 rounded-xl border border-blue-100">
                  <span>선택: <strong>{currentUnit.name}</strong> ({currentUnit.category}, 전용 {currentUnit.exclusiveAreaPy}평{currentUnit.terraceAreaPy ? `, 테라스 약 ${currentUnit.terraceAreaPy}평` : ''})</span>
                  <span className="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    {isDormitory ? '기숙사 대출 50%' : '대출 최대 70%'}
                  </span>
                </div>
              )}
            </div>

            {/* 2. Supply Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-700">2. 분양 공급가액 (각 분양공급가 부가세 제외)</span>
                <span className="text-base font-black text-blue-900">
                  {supplyPrice.toLocaleString()} 만원 <span className="text-xs text-slate-500 font-normal">(약 {(supplyPrice / 10000).toFixed(2)}억원)</span>
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="80000"
                step="500"
                value={supplyPrice}
                onChange={(e) => setSupplyPrice(Number(e.target.value))}
                className="w-full accent-blue-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1억원</span>
                <span className="text-blue-900 font-semibold">각 분양공급가 (부가세 제외)</span>
                <span>8억원</span>
              </div>
            </div>

            {/* 3. Loan Ratio Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-700">
                  3. 대출 비율 (LTV) - {isDormitory ? '기숙사 50%' : '최대 70%'} (각 공급가 부가세제외)
                </span>
                <span className="text-base font-black text-emerald-700">
                  {loanRatio}% <span className="text-xs text-slate-500 font-normal">({loanAmount.toLocaleString()} 만원)</span>
                </span>
              </div>
              <input
                type="range"
                min="30"
                max={maxLoanRatio}
                step="5"
                value={loanRatio}
                onChange={(e) => setLoanRatio(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>30%</span>
                <span className="text-emerald-700 font-bold">
                  {isDormitory ? '기숙사 대출 50%' : '대출 최대 70%'} (각 분양공급가 부가세제외)
                </span>
                <span>{maxLoanRatio}%</span>
              </div>
            </div>

            {/* 4. Loan Interest & Rent Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  대출 금리 (연%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="2.0"
                    max="8.0"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-800"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">%</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  예상 보증금 (만원)
                </label>
                <input
                  type="number"
                  step="100"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  예상 월 임대료 (만원)
                </label>
                <input
                  type="number"
                  step="5"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-800"
                />
              </div>
            </div>

            {/* Small note */}
            <p className="text-[11px] text-slate-500 pt-1">
              * 상기 계산 결과는 시뮬레이션 예시이며, 실제 입주 시점의 개인/법인 신용도, 정책자금 융자 조건 및 금리에 따라 변동될 수 있습니다.
            </p>

          </div>

          {/* Right Results Dashboard (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400">예상 투자 분석 결과</span>
                <span className="text-[11px] bg-blue-900 text-blue-200 px-2 py-0.5 rounded">
                  {currentUnit?.name || '선택 호실'}
                </span>
              </div>

              {/* Main ROI Result Card */}
              <div className="mt-6 text-center bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">예상 자기자본 수익률 (ROI)</span>
                <div className="text-4xl sm:text-5xl font-black text-amber-400 mt-1 tracking-tight">
                  {returnOnEquity}%
                </div>
                <p className="text-xs text-emerald-400 mt-2 font-medium">
                  연간 순수익 : 약 {Math.round(annualNetProfit).toLocaleString()} 만원 (월 {Math.round(annualNetProfit / 12).toLocaleString()}만원)
                </p>
              </div>

              {/* Metric Breakdown */}
              <div className="mt-6 space-y-2.5 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">총 분양 공급가 (부가세 제외)</span>
                  <span className="font-bold text-white">{supplyPrice.toLocaleString()} 만원</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">예상 대출액 ({loanRatio}%)</span>
                  <span className="font-bold text-emerald-400">약 {loanAmount.toLocaleString()} 만원 ({isDormitory ? '기숙사 50%' : '최대 70%'})</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">실투자금 (보증금 제외)</span>
                  <span className="font-bold text-amber-300">약 {safeEquity.toLocaleString()} 만원</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">취득세 35% 감면 혜택</span>
                  <span className="font-bold text-blue-300">약 {taxSavings.toLocaleString()} 만원 절감</span>
                </div>
              </div>
            </div>

            {/* Bottom Inquire CTA */}
            <div className="mt-8 pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={handleInquiryFromCalc}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                id="calc-inquiry-btn"
              >
                <span>이 조건으로 맞춤 분양 상담 신청</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${PROJECT_INFO.phone}`}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>전화 상담 바로 연결: {PROJECT_INFO.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
