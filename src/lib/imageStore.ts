/**
 * 첨부한 사진을 브라우저에 저장하기 전에 줄여 주는 도구.
 *
 * 휴대폰 사진 한 장은 보통 3~5MB인데, 이것을 문자열(base64)로 바꾸면 용량이
 * 1.33배로 늘어납니다. 브라우저가 한 사이트에 허용하는 저장 공간은 보통 5MB라서
 * 원본을 그대로 저장하면 실패합니다. 그래서 저장 전에 크기를 줄입니다.
 */

const MAX_DIMENSION = 1600;
const QUALITY = 0.82;
/** 이 크기 아래면 줄이지 않고 그대로 씁니다. */
const SKIP_COMPRESSION_BYTES = 300 * 1024;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('파일을 읽지 못했습니다.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('이미지를 불러오지 못했습니다.'));
    img.src = src;
  });
}

/** data URL 이 실제로 차지하는 바이트 수(대략) */
export function estimateBytes(dataUrl: string): number {
  const comma = dataUrl.indexOf(',');
  const payload = comma >= 0 ? dataUrl.length - comma - 1 : dataUrl.length;
  return Math.round(payload * 0.75);
}

export function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  return `${Math.max(1, Math.round(bytes / 1024))}KB`;
}

/**
 * 사진을 긴 변 기준 1600px 이하로 줄이고 WebP(미지원 브라우저는 JPEG)로 다시 저장합니다.
 * 줄이는 데 실패하면 원본을 그대로 돌려줍니다.
 */
export async function compressImageFile(file: File): Promise<string> {
  const original = await readAsDataUrl(file);

  if (estimateBytes(original) <= SKIP_COMPRESSION_BYTES) return original;

  try {
    const img = await loadImage(original);
    const longest = Math.max(img.naturalWidth, img.naturalHeight);
    const scale = longest > MAX_DIMENSION ? MAX_DIMENSION / longest : 1;

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));

    const ctx = canvas.getContext('2d');
    if (!ctx) return original;

    // 투명한 PNG 가 검게 나오지 않도록 흰 바탕을 먼저 깔아 둡니다.
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const webp = canvas.toDataURL('image/webp', QUALITY);
    const encoded = webp.startsWith('data:image/webp')
      ? webp
      : canvas.toDataURL('image/jpeg', QUALITY);

    // 줄인 쪽이 더 크면 원본을 씁니다.
    return estimateBytes(encoded) < estimateBytes(original) ? encoded : original;
  } catch {
    return original;
  }
}

/** 저장에 성공하면 true, 공간 부족 등으로 실패하면 false */
export function trySaveToStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`LocalStorage save failed (${key}):`, err);
    return false;
  }
}
