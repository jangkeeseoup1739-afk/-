import React from 'react';
import { ShieldCheck, ArrowLeft, Phone } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

/**
 * 개인정보처리방침 전용 페이지 (/privacy)
 *
 * 보호책임자 성명과 이메일은 아직 비어 있습니다. 확정되면
 * 아래 PRIVACY_OFFICER 값을 채워 주세요.
 */
const PRIVACY_OFFICER = {
  /** 예: '홍길동' — 비워 두면 직책만 표기됩니다. */
  name: '',
  position: '분양 상담 담당자',
  phone: PROJECT_INFO.phone,
  /** 예: 'contact@example.com' — 비워 두면 전화만 안내됩니다. */
  email: '',
};

/** 방침 내용이 바뀌면 이 날짜도 함께 고쳐 주세요. */
const EFFECTIVE_DATE = '2026년 9월 13일';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="text-lg font-black text-slate-900">{title}</h2>
    <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">{children}</div>
  </section>
);

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-3">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{PROJECT_INFO.name} 홈으로</span>
          </a>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-amber-400 shrink-0" />
            개인정보처리방침
          </h1>
          <p className="text-sm text-blue-200">시행일자: {EFFECTIVE_DATE}</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-9">
        <p className="text-sm text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-2xl p-5">
          본 홈페이지({PROJECT_INFO.name} 분양 안내)는 분양 상담을 원하시는 분의 개인정보를 소중히 다루며,
          「개인정보 보호법」 등 관계 법령을 준수합니다. 수집하는 정보와 이용 방법을 아래와 같이 안내드립니다.
        </p>

        <Section title="1. 수집하는 개인정보 항목 및 수집 방법">
          <p>
            홈페이지의 <strong>관심고객 등록</strong> 화면에서 방문자가 직접 입력하는 방식으로만 수집합니다.
            그 외에 자동으로 수집되는 개인정보는 없습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>필수 항목:</strong> 성명, 휴대전화번호</li>
            <li><strong>선택 항목:</strong> 관심 상품 분야, 관심 공급 타입, 상담 희망 시간대, 문의 내용</li>
          </ul>
        </Section>

        <Section title="2. 개인정보의 수집 및 이용 목적">
          <p>
            {PROJECT_INFO.officialName} 분양 상담, 분양 조건 및 일정 안내, 현장 방문 예약 응대를 위해서만
            이용합니다. 이 목적 외의 용도로는 이용하지 않으며, 목적이 변경되는 경우 별도의 동의를 받겠습니다.
          </p>
        </Section>

        <Section title="3. 보유 및 이용 기간">
          <p>
            상담이 완료되거나 해당 분양이 종료되는 시점까지 보유하며, 그 이후에는 지체 없이 파기합니다.
            정보주체께서 삭제를 요청하시면 요청 즉시 파기합니다.
          </p>
        </Section>

        <Section title="4. 개인정보의 제3자 제공">
          <p>
            수집한 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에 따라 수사기관 등이 적법한 절차로
            요구하는 경우에는 예외로 합니다.
          </p>
        </Section>

        <Section title="5. 개인정보 처리의 위탁 및 국외 이전">
          <p>
            접수 내용의 보관과 알림 발송을 위해 아래 서비스를 이용합니다. 두 곳 모두 서버가 국외에 있어
            개인정보가 국외로 이전됩니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600">
                  <th className="text-left p-2.5 border border-slate-200 font-bold">수탁업체</th>
                  <th className="text-left p-2.5 border border-slate-200 font-bold">위탁 업무</th>
                  <th className="text-left p-2.5 border border-slate-200 font-bold">이전 국가</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr>
                  <td className="p-2.5 border border-slate-200 font-semibold">Google LLC</td>
                  <td className="p-2.5 border border-slate-200">접수 내용 보관(스프레드시트), 알림 이메일 발송</td>
                  <td className="p-2.5 border border-slate-200">미국</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-200 font-semibold">Vercel Inc.</td>
                  <td className="p-2.5 border border-slate-200">홈페이지 호스팅</td>
                  <td className="p-2.5 border border-slate-200">미국</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            이전 항목은 제1항의 수집 항목과 같으며, 이전 시기는 등록 버튼을 누르신 시점, 보유 기간은
            제3항과 같습니다.
          </p>
        </Section>

        <Section title="6. 방문자 기기에 저장되는 정보">
          <p>
            접수하신 내용은 다시 확인하실 수 있도록 방문자 본인의 브라우저 저장소에도 함께 보관됩니다.
            이 정보는 해당 기기 안에만 남고 외부로 전송되지 않으며, 브라우저의 인터넷 사용 기록 삭제 기능으로
            언제든 직접 지우실 수 있습니다.
          </p>
        </Section>

        <Section title="7. 정보주체의 권리와 행사 방법">
          <p>
            언제든지 본인의 개인정보에 대한 <strong>열람·정정·삭제·처리정지</strong>를 요구하실 수 있습니다.
            아래 연락처로 요청해 주시면 지체 없이 조치하고 결과를 알려드립니다. 동의를 거부하실 권리가 있으며,
            거부하시는 경우 분양 상담 안내가 제한될 수 있습니다.
          </p>
        </Section>

        <Section title="8. 개인정보의 파기 절차 및 방법">
          <p>
            보유 기간이 지나거나 처리 목적이 달성되면 지체 없이 파기합니다. 전자적 파일은 복구할 수 없는
            방법으로 영구 삭제하고, 출력물이 있는 경우 분쇄하거나 소각합니다.
          </p>
        </Section>

        <Section title="9. 안전성 확보 조치">
          <p>
            개인정보에 접근할 수 있는 인원을 상담 담당자로 최소화하고, 보관에 이용하는 서비스 계정은
            비밀번호와 2단계 인증으로 보호합니다. 홈페이지와 접수 처리 구간은 모두 암호화(HTTPS)된
            통신을 사용합니다.
          </p>
        </Section>

        <Section title="10. 개인정보 보호책임자">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
            {PRIVACY_OFFICER.name && (
              <p className="flex gap-3">
                <span className="text-slate-500 w-20 shrink-0">성명</span>
                <span className="font-bold text-slate-900">{PRIVACY_OFFICER.name}</span>
              </p>
            )}
            <p className="flex gap-3">
              <span className="text-slate-500 w-20 shrink-0">직책</span>
              <span className="font-bold text-slate-900">{PRIVACY_OFFICER.position}</span>
            </p>
            <p className="flex gap-3">
              <span className="text-slate-500 w-20 shrink-0">연락처</span>
              <a href={`tel:${PRIVACY_OFFICER.phone}`} className="font-bold text-blue-900 inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {PRIVACY_OFFICER.phone}
              </a>
            </p>
            {PRIVACY_OFFICER.email && (
              <p className="flex gap-3">
                <span className="text-slate-500 w-20 shrink-0">이메일</span>
                <a href={`mailto:${PRIVACY_OFFICER.email}`} className="font-bold text-blue-900 break-all">
                  {PRIVACY_OFFICER.email}
                </a>
              </p>
            )}
          </div>
          <p className="text-xs text-slate-500">
            개인정보 침해로 인한 상담이 필요하신 경우 개인정보침해신고센터(국번없이 118),
            개인정보 분쟁조정위원회(1833-6972), 대검찰청 사이버수사과(국번없이 1301),
            경찰청 사이버수사국(국번없이 182)으로 문의하실 수 있습니다.
          </p>
        </Section>

        <Section title="11. 방침의 변경">
          <p>
            법령이나 운영 내용이 바뀌어 방침을 변경하는 경우, 변경 사항을 본 페이지에 게시하고
            시행일자를 함께 안내드립니다.
          </p>
        </Section>

        <div className="pt-4 border-t border-slate-200">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{PROJECT_INFO.name} 홈으로 돌아가기</span>
          </a>
        </div>
      </main>
    </div>
  );
};
