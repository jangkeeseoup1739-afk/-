/**
 * 관리자 모드
 *
 * 평면도 첨부·교체·삭제 같은 편집 기능은 운영자만 쓰는 것이라
 * 일반 방문자에게는 보이지 않아야 합니다.
 *
 * 켜기:  주소 뒤에 ?admin=1 을 붙여 한 번 접속
 * 끄기:  주소 뒤에 ?admin=0 을 붙여 한 번 접속
 *
 * 한 번 켜면 그 브라우저에서는 계속 켜져 있습니다.
 *
 * 주의: 비밀번호 수준의 보안이 아닙니다. 주소를 아는 사람은 누구나 켤 수 있습니다.
 * 다만 편집 대상이 모두 그 사람 브라우저 안에만 저장되는 값이라,
 * 다른 방문자나 실제 홈페이지 내용에는 영향을 주지 않습니다.
 */

const STORAGE_KEY = 'joneflex_admin_mode';

export function isAdminMode(): boolean {
  if (typeof window === 'undefined') return false;

  let fromQuery: string | null = null;
  try {
    fromQuery = new URLSearchParams(window.location.search).get('admin');
  } catch {
    fromQuery = null;
  }

  if (fromQuery === '1') {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // 저장이 막힌 브라우저에서는 이번 방문에만 켜집니다.
    }
    return true;
  }

  if (fromQuery === '0') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // 무시
    }
    return false;
  }

  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}
