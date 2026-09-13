/**
 * 관심고객 접수 전송 설정
 *
 * 홈페이지에서 고객이 남긴 연락처를 구글 시트에 자동으로 쌓고 이메일 알림을
 * 받으려면, 구글 앱스 스크립트 웹앱 주소를 아래 FALLBACK_LEAD_ENDPOINT 에
 * 붙여넣으세요. 설정 방법은 저장소 루트의 LEADS_SETUP.md 에 있습니다.
 *
 * Vercel/Cloudflare 대시보드에서 환경 변수 VITE_LEAD_ENDPOINT 를 넣어도 됩니다.
 * 환경 변수가 있으면 그 값이 우선합니다.
 *
 * 비워 두면 기존과 동일하게 고객 브라우저에만 저장되고 전송은 하지 않습니다.
 */
const FALLBACK_LEAD_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxkOitPmTT96EcgbV3vk4H7NApg9thvLi0QAlm5cHybwuuRBU1ainD11S9bNyGNynWl/exec';

// import.meta.env.VITE_* 는 빌드할 때 값으로 통째로 치환됩니다.
// 중간에 ?. 같은 것을 끼우면 치환이 안 되므로 이 형태를 유지하세요.
const fromEnv = String(import.meta.env.VITE_LEAD_ENDPOINT ?? '').trim();

export const LEAD_ENDPOINT: string = fromEnv || FALLBACK_LEAD_ENDPOINT.trim();

export const IS_LEAD_DELIVERY_ENABLED: boolean = LEAD_ENDPOINT.length > 0;
