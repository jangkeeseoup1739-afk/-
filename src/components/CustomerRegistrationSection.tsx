import React, { useState, useEffect } from 'react';
import { UserCheck, Phone, Send, CheckCircle2, ShieldCheck, AlertCircle, Sparkles, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { PROJECT_INFO, UNIT_TYPES } from '../data/projectData';
import { CustomerLead } from '../types';

interface CustomerRegistrationSectionProps {
  prefilledType?: string;
  prefilledNote?: string;
  onOpenLeadsModal?: () => void;
}

export const CustomerRegistrationSection: React.FC<CustomerRegistrationSectionProps> = ({
  prefilledType,
  prefilledNote,
  onOpenLeadsModal,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interestCategory, setInterestCategory] = useState('지식산업센터 (제조형 드라이브인)');
  const [preferredType, setPreferredType] = useState('전체 상담');
  const [preferredTime, setPreferredTime] = useState('언제나 상담 가능');
  const [message, setMessage] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<CustomerLead | null>(null);

  // Update when prefilled props change
  useEffect(() => {
    if (prefilledType) {
      setPreferredType(prefilledType);
    }
  }, [prefilledType]);

  useEffect(() => {
    if (prefilledNote) {
      setMessage((prev) => (prev ? `${prev}\n${prefilledNote}` : prefilledNote));
    }
  }, [prefilledNote]);

  // Format phone number
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }
    setPhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('성함을 입력해 주세요.');
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      alert('올바른 연락처(010-XXXX-XXXX)를 입력해 주세요.');
      return;
    }
    if (!privacyAgreed) {
      alert('개인정보 수집 및 이용 동의가 필요합니다.');
      return;
    }

    setIsSubmitting(true);

    const newLead: CustomerLead = {
      id: `LEAD-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      phone: phone.trim(),
      interestCategory,
      preferredType,
      preferredTime,
      message: message.trim(),
      createdAt: new Date().toLocaleString('ko-KR'),
      privacyAgreed: true,
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('joneflex_leads');
      const leadsList = existing ? JSON.parse(existing) : [];
      leadsList.unshift(newLead);
      localStorage.setItem('joneflex_leads', JSON.stringify(leadsList));
    } catch (err) {
      console.error('Failed to store lead:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedLead(newLead);
      // reset fields
      setName('');
      setPhone('');
      setMessage('');
    }, 600);
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden" id="registration">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black mb-3">
            <UserCheck className="w-4 h-4 text-amber-700" />
            VIP CUSTOMER REGISTRATION
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            관심고객등록
          </h2>

          {/* Prominent Core Requirement Message */}
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 max-w-2xl mx-auto shadow-xs">
            <p className="text-base sm:text-lg font-black text-slate-900 flex items-center justify-center gap-2 flex-wrap">
              <Phone className="w-5 h-5 text-amber-600 animate-bounce" />
              <span>
                <strong className="text-blue-900 text-xl font-black underline decoration-amber-500 underline-offset-4">
                  {PROJECT_INFO.phoneDisplay}
                </strong> 번호를 남겨주시면 상담 도와드리겠습니다.
              </span>
            </p>
            <p className="text-xs text-slate-600 mt-1">
              파격 특별 프로모션 분양가, 잔여 호실, 맞춤 금융 혜택을 전문 상담사가 가장 빠르게 안내해 드립니다.
            </p>
          </div>
        </div>

        {/* Quick Contact Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <a
            href={`tel:${PROJECT_INFO.phone}`}
            className="flex items-center justify-center gap-2.5 bg-blue-900 hover:bg-blue-950 text-white font-black py-4 px-6 rounded-2xl shadow-md transition-all text-base cursor-pointer"
            id="reg-direct-call"
          >
            <Phone className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>즉시 전화 상담: {PROJECT_INFO.phoneDisplay}</span>
          </a>

          <a
            href={`sms:${PROJECT_INFO.phone}?body=${encodeURIComponent('주안국가산단역 제이원플렉스 지식산업센터 관심고객 등록 및 분양 상담 요청드립니다.')}`}
            className="flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-md transition-all text-base cursor-pointer"
            id="reg-direct-sms"
          >
            <MessageSquare className="w-5 h-5" />
            <span>문자 상담 바로 보내기</span>
          </a>
        </div>

        {/* Registration Form Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg relative">
          
          {submittedLead ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                접수번호: {submittedLead.id}
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                관심고객 등록이 완료되었습니다!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                남겨주신 번호로 담당 전문 상담사가 신속하고 친절하게 파격 프로모션 혜택 및 호실 정보를 상담 도와드리겠습니다.
              </p>

              <div className="bg-white p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-xs text-left space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">신청 성함:</span>
                  <span className="font-bold">{submittedLead.name}님</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">연락처:</span>
                  <span className="font-bold">{submittedLead.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">관심 상품:</span>
                  <span className="font-bold text-blue-900">{submittedLead.interestCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">관심 타입:</span>
                  <span className="font-bold text-amber-700">{submittedLead.preferredType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">상담 희망:</span>
                  <span className="font-bold">{submittedLead.preferredTime}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${PROJECT_INFO.phone}`}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>지금 바로 전화 통화하기</span>
                </a>
                <button
                  onClick={() => setSubmittedLead(null)}
                  className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-3 rounded-xl text-sm transition-all"
                >
                  추가 문의 등록하기
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" id="lead-form">
              
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* 1. Name */}
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-bold text-slate-800 mb-1.5">
                    고객명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    placeholder="성함을 입력해 주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-300 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>

                {/* 2. Phone */}
                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-bold text-slate-800 mb-1.5">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={13}
                    className="w-full bg-white border border-slate-300 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-mono"
                  />
                </div>

                {/* 3. Interest Category */}
                <div>
                  <label htmlFor="lead-category" className="block text-xs font-bold text-slate-800 mb-1.5">
                    관심 상품 분야
                  </label>
                  <select
                    id="lead-category"
                    value={interestCategory}
                    onChange={(e) => setInterestCategory(e.target.value)}
                    className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-all"
                  >
                    <option value="지식산업센터 (제조형 드라이브인 B2~4F)">지식산업센터 (제조형 드라이브인 B2~4F)</option>
                    <option value="섹션오피스 (최대 3.9m 층고 5~7F)">섹션오피스 (최대 3.9m 층고 5~7F)</option>
                    <option value="기숙사 (전세대 약 4평 테라스 8~9F)">기숙사 (전세대 약 4평 테라스 8~9F)</option>
                    <option value="복층 기숙사 (10F 특화세대)">복층 기숙사 (10F 특화세대)</option>
                    <option value="근린생활시설 (1F 상가)">근린생활시설 (1F 상가)</option>
                    <option value="전체 상담 / 투자 목적">전체 상담 / 투자 목적</option>
                  </select>
                </div>

                {/* 4. Preferred Type */}
                <div>
                  <label htmlFor="lead-type" className="block text-xs font-bold text-slate-800 mb-1.5">
                    관심 공급 타입
                  </label>
                  <select
                    id="lead-type"
                    value={preferredType}
                    onChange={(e) => setPreferredType(e.target.value)}
                    className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-all"
                  >
                    <option value="전체 상담">전체 상담 (추천 희망)</option>
                    {UNIT_TYPES.map((u) => (
                      <option key={u.id} value={`${u.name} (${u.category})`}>
                        {u.name} - {u.category} (전용 {u.exclusiveAreaPy}평)
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* 5. Consultation Time Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  상담 희망 시간대
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['언제나 상담 가능', '오전 (09:00~12:00)', '오후 (12:00~18:00)', '저녁 (18:00~21:00)'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPreferredTime(t)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                        preferredTime === t
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Inquiries / Note */}
              <div>
                <label htmlFor="lead-message" className="block text-xs font-bold text-slate-800 mb-1.5">
                  문의 내용 (선택)
                </label>
                <textarea
                  id="lead-message"
                  rows={3}
                  placeholder="파격 프로모션 혜택, 실분양가, 잔여 호실, 현장 방문 예약 등 궁금하신 사항을 남겨주시면 상담 도와드리겠습니다."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl p-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="privacy-check"
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-blue-900 rounded cursor-pointer"
                />
                <label htmlFor="privacy-check" className="text-xs text-slate-600 leading-normal cursor-pointer select-none">
                  개인정보 수집 및 이용 동의 (필수): 주안국가산단역 제이원플렉스 분양 상담 및 관련 정보 안내 목적으로 성함, 연락처를 수집합니다.{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-blue-900 font-bold underline ml-1 cursor-pointer"
                  >
                    내용보기
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 px-6 rounded-2xl text-base sm:text-lg shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                id="submit-lead-btn"
              >
                {isSubmitting ? (
                  <span>접수 진행 중...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>관심고객 등록하고 특별 프로모션 상담 받기</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  개인정보는 상담 목적 외에 이용되지 않습니다.
                </span>
                
                {onOpenLeadsModal && (
                  <button
                    type="button"
                    onClick={onOpenLeadsModal}
                    className="text-blue-900 font-semibold hover:underline cursor-pointer"
                  >
                    상담 접수 내역 확인
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">개인정보 수집 및 이용 안내</h3>
            <div className="text-xs text-slate-600 space-y-2 max-h-60 overflow-y-auto p-3 bg-slate-50 rounded-xl leading-relaxed border border-slate-200">
              <p><strong>1. 수집 항목:</strong> 성명, 휴대전화번호, 관심 상품, 상담 희망시간, 문의내용</p>
              <p><strong>2. 수집 및 이용 목적:</strong> 주안국가산단역 제이원플렉스 지식산업센터 분양 상담, 맞춤 프로모션 및 방문 안내</p>
              <p><strong>3. 보유 및 이용 기간:</strong> 상담 완료 및 분양 종료 시까지 (고객 요청 시 지체 없이 파기)</p>
              <p><strong>4. 동의 거부 권리:</strong> 귀하는 동의를 거부할 권리가 있으나, 동의 거부 시 분양 상담 서비스가 제한될 수 있습니다.</p>
            </div>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full bg-blue-900 text-white font-bold py-2.5 rounded-xl text-sm"
            >
              확인 및 닫기
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
