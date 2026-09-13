export interface UnitType {
  id: string;
  name: string; // A, B, C, D, E, A-1, C-1
  category: '지식산업센터(제조)' | '섹션오피스' | '기숙사' | '근린생활시설';
  exclusiveAreaPy: number; // 전용면적 (평)
  exclusiveAreaM2: number; // 전용면적 (㎡)
  contractAreaPy: number; // 계약면적 (평)
  contractAreaM2: number; // 계약면적 (㎡)
  recommendedUsage: string; // 권장 업종
  keyFeatures: string[];
  terraceAreaPy?: number; // 테라스 제공 면적 (기숙사 약 4평)
  isDuplex?: boolean; // 10층 복층 기숙사
  driveInCompatible?: boolean; // 드라이브인 호실 여부
  description: string;
  floorPlanImage?: string; // 등록된 평면도 이미지 경로 또는 base64
}

export interface FloorPlanItem {
  floorId: string; // '1F', '2F', ..., '10F'
  floorNumber: number; // 1 to 10
  name: string; // '지상 1층', '지상 2층', ..., '지상 10층'
  shortName: string; // '1F', '2F', ..., '10F'
  category: string; // '근생 & 드라이브인', '제조형 드라이브인', '스마트 섹션오피스', '테라스 기숙사', '최고층 복층 기숙사'
  tag: string; // '1층 램프 & 스트리트 상가', '드라이브인 & 도어투도어', '약 4평 테라스', '10층 복층 특화'
  ceilingHeight: string;
  floorLoad?: string;
  unitsOnFloor: string; // 'E 타입 (근린생활시설)', 'A, B 타입 (제조형 지산)', etc.
  description: string;
  features: string[];
  defaultImage?: string;
}

export interface FloorInfo {
  floorId: string;
  name: string;
  subName: string;
  category: string;
  tag: string;
  ceilingHeight: string;
  floorLoad?: string;
  keyFeatures: string[];
  description: string;
  image?: string;
}

export interface CustomerLead {
  id: string;
  name: string;
  phone: string;
  interestCategory: string;
  preferredType: string;
  preferredTime: string;
  message?: string;
  createdAt: string;
  privacyAgreed: boolean;
}
