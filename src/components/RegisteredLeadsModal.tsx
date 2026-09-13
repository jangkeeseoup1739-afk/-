import React, { useState, useEffect } from 'react';
import { X, UserCheck, Trash2, Phone, Calendar, Clock, CheckCircle } from 'lucide-react';
import { CustomerLead } from '../types';
import { PROJECT_INFO } from '../data/projectData';

interface RegisteredLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisteredLeadsModal: React.FC<RegisteredLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<CustomerLead[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('joneflex_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch (e) {
      console.error(e);
      setLeads([]);
    }
  };

  const handleClear = () => {
    if (window.confirm('저장된 관심고객 상담 신청 내역을 모두 정리하시겠습니까?')) {
      localStorage.removeItem('joneflex_leads');
      setLeads([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black">관심고객 상담 접수 내역</h3>
              <p className="text-xs text-slate-400">주안국가산단역 제이원플렉스 실시간 상담 관리</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span>총 <strong>{leads.length}</strong>건의 접수 내역이 있습니다.</span>
            {leads.length > 0 && (
              <button
                onClick={handleClear}
                className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> 내역 전체 삭제
              </button>
            )}
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <UserCheck className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
              <p className="text-sm font-bold text-slate-600">아직 등록된 관심고객 신청 내역이 없습니다.</p>
              <p className="text-xs">상담 신청 폼에서 번호를 남겨주시면 즉시 등록됩니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-900 transition-all text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{lead.name} 고객님</span>
                      <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded text-[11px]">
                        {lead.id}
                      </span>
                    </div>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lead.createdAt}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                    <div>
                      <span className="text-slate-400 block">연락처:</span>
                      <a href={`tel:${lead.phone}`} className="font-bold text-blue-900 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-amber-600" /> {lead.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block">희망 상품:</span>
                      <span className="font-semibold text-slate-800">{lead.interestCategory}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">관심 타입:</span>
                      <span className="font-semibold text-amber-700">{lead.preferredType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">상담 희망 시간:</span>
                      <span className="font-semibold text-slate-800">{lead.preferredTime}</span>
                    </div>
                  </div>

                  {lead.message && (
                    <div className="mt-2 p-2.5 bg-white rounded-xl border border-slate-200/80 text-slate-700">
                      <span className="text-[10px] text-slate-400 block font-bold mb-0.5">문의 및 요청사항:</span>
                      <p className="whitespace-pre-line">{lead.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <a
            href={`tel:${PROJECT_INFO.phone}`}
            className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            분양 상담 직통: {PROJECT_INFO.phoneDisplay}
          </a>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
