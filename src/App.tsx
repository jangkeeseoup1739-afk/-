import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PromotionBanner } from './components/PromotionBanner';
import { OverviewSection } from './components/OverviewSection';
import { FloorGuideSection } from './components/FloorGuideSection';
import { UnitTypesSection } from './components/UnitTypesSection';
import { LocationSection } from './components/LocationSection';
import { CalculatorSection } from './components/CalculatorSection';
import { CustomerRegistrationSection } from './components/CustomerRegistrationSection';
import { Footer } from './components/Footer';
import { QuickFloatingBar } from './components/QuickFloatingBar';
import { RegisteredLeadsModal } from './components/RegisteredLeadsModal';
import { UnitType } from './types';

export default function App() {
  const [prefilledType, setPrefilledType] = useState<string>('전체 상담');
  const [prefilledNote, setPrefilledNote] = useState<string>('');
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState<boolean>(false);

  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFloorGuide = () => {
    const el = document.getElementById('floor-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectUnit = (unit: UnitType) => {
    setPrefilledType(`${unit.name} (${unit.category})`);
    setPrefilledNote(`[타입 문의] ${unit.name} (전용 ${unit.exclusiveAreaPy}평${unit.terraceAreaPy ? `, 테라스 약 ${unit.terraceAreaPy}평` : ''}) 분양가 및 잔여호실 상담 희망`);
    scrollToRegistration();
  };

  const handleFloorCategoryClick = (category?: string) => {
    if (category) {
      setPrefilledNote(`[층별 문의] ${category} 특화 및 잔여호실 상담 희망`);
    }
    scrollToRegistration();
  };

  const handleRegisterWithCalculation = (note: string) => {
    setPrefilledNote(note);
    scrollToRegistration();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Header */}
      <Header onOpenRegister={scrollToRegistration} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onRegisterClick={scrollToRegistration}
          onExploreFloors={scrollToFloorGuide}
        />

        {/* 2. Premium Promotion Banner */}
        <PromotionBanner onRegisterClick={scrollToRegistration} />

        {/* 3. Project Overview (지산 + 근생 + 기숙사) */}
        <OverviewSection onFloorGuideClick={scrollToFloorGuide} />

        {/* 4. Location Environment (주안국가산단역 2번 출구 100m) */}
        <LocationSection />

        {/* 5. Floor & Drive-in Guide (지하2층~지상4층 드라이브인, 기숙사 4평 테라스, 10층 복층) */}
        <FloorGuideSection onRegisterClick={handleFloorCategoryClick} />

        {/* 6. Unit Supply Guide (A, B, C, D, E, A-1, C-1) */}
        <UnitTypesSection onSelectUnit={handleSelectUnit} />

        {/* 7. Investment & Financial Calculator */}
        <CalculatorSection onRegisterWithCalculation={handleRegisterWithCalculation} />

        {/* 8. VIP Customer Registration Section (010-8873-7258) */}
        <CustomerRegistrationSection
          prefilledType={prefilledType}
          prefilledNote={prefilledNote}
          onOpenLeadsModal={() => setIsLeadsModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Quick Consultation Bar */}
      <QuickFloatingBar onScrollToRegister={scrollToRegistration} />

      {/* Registered Leads Management Modal */}
      <RegisteredLeadsModal
        isOpen={isLeadsModalOpen}
        onClose={() => setIsLeadsModalOpen(false)}
      />
    </div>
  );
}
