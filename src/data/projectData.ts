import { UnitType, FloorInfo, FloorPlanItem } from '../types';

export const PROJECT_INFO = {
  name: '주안국가산단역 제이원플렉스',
  officialName: '주안국가산단역 제이원플렉스 지식산업센터',
  tagline: '주안국가산단역 2번 출구 100m 초역세권 프리미엄 랜드마크',
  phone: '010-8873-7258',
  phoneDisplay: '010-8873-7258',
  location: '인천광역시 미추홀구 주안국가산업단지 내 (주안국가산단역 2번 출구 100m)',
  stationName: '인천 2호선 주안국가산단역',
  stationExit: '2번 출구',
  stationDistance: '100m (도보 약 5분)',
  composition: '지식산업센터 + 근린생활시설(근생) + 기숙사',
  structure: '지하 2층 ~ 지상 10층',
  driveInFloors: '지하 2층 ~ 지상 4층 (도어 투 도어 드라이브인 시스템)',
  promotionHeadline: '파격 특별 프로모션 진행 중!',
  promotionDetails: [
    '대출 최대 70%, 기숙사 50% (각 분양공급가 부가세 제외)',
    '취득세 최대 35% 감면 & 재산세 최대 35% 감면 (산단 입주 적격 기업)',
    '기숙사 전 호실 약 4평 광폭 테라스 무상 제공 (10층 일부세대 복층 특화)',
  ],
};

export const FLOOR_GUIDES: FloorInfo[] = [
  {
    floorId: '10F',
    name: '10층',
    subName: '복층 기숙사 (일부세대) & 옥상 가든',
    category: '기숙사 (복층 특화)',
    tag: '복층 + 약 4평 테라스',
    ceilingHeight: '최대 4.5m 층고',
    keyFeatures: [
      '일부세대 복층 특화 설계로 2배의 공간 개방감 실현',
      '전 호실 약 4평 단독 광폭 테라스 서비스 면적 제공',
      '탁 트인 도심 파노라마 뷰와 옥상 정원 휴식 인프라',
      '풀퍼니시드 빌트인 가전 & 냉난방 시스템 완비'
    ],
    description: '10층 최고층에 위치하여 뛰어난 채광과 조망권을 자랑하며, 일부세대 복층 설계와 약 4평 테라스를 통해 최고급 주거 힐링 공간을 제공합니다.',
    image: '/images/regenerated_image_1789119972687.png',
  },
  {
    floorId: '8-9F',
    name: '8층 ~ 9층',
    subName: '테라스 특화 프리미엄 기숙사',
    category: '기숙사',
    tag: '약 4평 테라스 전 세대 제공',
    ceilingHeight: '3.6m 층고',
    keyFeatures: [
      '전 호실 약 4평 광폭 테라스 무상 제공 (독보적 서비스 면적)',
      '1~2인 가구 및 직주근접 임직원을 위한 맞춤형 쾌적 공간',
      '세탁기, 냉장고, 에어컨, 쿡탑 등 고품격 빌트인 풀옵션',
      '지식산업센터 업무 공간과 분리된 독립된 쾌적 주거 동선'
    ],
    description: '입주 기업 임직원의 쾌적한 웰빙 라이프를 위해 전 세대 약 4평의 넓은 테라스를 기본 제공하여 휴식과 여유를 더했습니다.',
    image: '/images/real_floor_8_terrace.jpg',
  },
  {
    floorId: '5-7F',
    name: '5층 ~ 7층',
    subName: '스마트 비즈니스 섹션오피스',
    category: '섹션오피스',
    tag: '최대 3.9m 높은 층고',
    ceilingHeight: '최대 3.9m 높은 층고',
    floorLoad: '0.6 ton/㎡',
    keyFeatures: [
      '최대 3.9m 높은 층고 설계로 개방감과 쾌적성 극대화',
      '소형 스타트업부터 중대형 기업까지 맞춤 공간 분할 가능',
      'IT, 벤처, 디자인, 연구개발(R&D) 등 첨단 업종 특화',
      '발코니 서비스 면적 제공으로 쾌적한 오피스 환경 구축'
    ],
    description: '최대 3.9m 높은 층고 설계로 공간 개방감을 극대화하였으며, 기업 규모에 맞춰 유연하게 확장·통합할 수 있는 스마트 모듈형 섹션오피스입니다.',
    image: '/images/real_floor_5_office.jpg',
  },
  {
    floorId: '1-4F',
    name: '지상 1층 ~ 4층',
    subName: '1층 드라이브인 진입 램프 & 제조형 공장',
    category: '1층 진입 드라이브인 + 상가',
    tag: '1층 드라이브인 직통 램프',
    ceilingHeight: '최대 4.2m 높은 층고',
    floorLoad: '1.0 ~ 1.2 ton/㎡',
    keyFeatures: [
      '지상 1층 램프를 통해 지상 4층까지 화물차량 직접 진입 가능한 드라이브인 시스템',
      '호실 바로 앞 하역 작업이 가능한 도어 투 도어(Door to Door)',
      '1층 커피숍, 편의점, 구내식당, 금융기관 등 원스톱 스트리트 상가',
      '최대 4.2m 층고로 호이스트 설치 및 복층형 사무공간 활용 가능'
    ],
    description: '지상 1층 곡선 드라이브인 램프를 통해 지상 4층까지 대형 화물 차량이 직접 진입하며, 1층 근린생활시설과 결합되어 최상의 물류 및 업무 편의성을 제공합니다.',
    image: '/images/regenerated_image_1789120455292.png',
  },
  {
    floorId: 'B2-B1',
    name: '지하 2층 ~ 지하 1층',
    subName: '광폭 램프 드라이브인 & 여유로운 주차 공간',
    category: '드라이브인 / 주차',
    tag: '지하 2층 드라이브인 진입',
    ceilingHeight: '5.4m 층고',
    floorLoad: '1.2 ton/㎡ 고하중',
    keyFeatures: [
      '대형 화물트럭도 원활하게 회전 및 교행 가능한 광폭 램프',
      '지하 2층부터 지상 4층까지 유기적으로 연결되는 드라이브인',
      '법정대비 여유로운 넉넉한 주차 대수 및 전기차 급속 충전소',
      '쾌적한 환기 및 방재 시스템 완비'
    ],
    description: '지하 2층부터 시작되는 직통 램프 드라이브인을 통해 하역 작업과 주차를 한 번에 해결하는 스마트 물류 환경을 조성했습니다.',
    image: '/images/real_floor_1_4_drivein.jpg',
  },
];

export const UNIT_TYPES: UnitType[] = [
  {
    id: 'type-a',
    name: 'A 타입',
    category: '지식산업센터(제조)',
    exclusiveAreaPy: 28.5,
    exclusiveAreaM2: 94.21,
    contractAreaPy: 57.1,
    contractAreaM2: 188.76,
    recommendedUsage: '정밀제조, 첨단기계, 부품제작, IT장비',
    driveInCompatible: true,
    keyFeatures: [
      '호실 앞 직접 차량 진입 도어 투 도어 주차 구획',
      '층고 5.5m로 대형 장비 반입 및 호이스트 설치 용이',
      '바닥하중 1.2ton/㎡ 강력한 내하중 설계',
      '슬라이딩 도어 적용으로 지게차 및 화물 적재 최적화'
    ],
    description: '제조 및 물류 효율을 극대화한 대표 드라이브인 제조형 평면으로, 중소 제조업체 및 엔지니어링 기업에 이상적입니다.'
  },
  {
    id: 'type-b',
    name: 'B 타입',
    category: '지식산업센터(제조)',
    exclusiveAreaPy: 34.8,
    exclusiveAreaM2: 115.04,
    contractAreaPy: 69.8,
    contractAreaM2: 230.74,
    recommendedUsage: '물류유통, 바이오테크, 기계가공, 무역/도소매',
    driveInCompatible: true,
    keyFeatures: [
      '광폭 조업 공간 확보 및 대형 트럭 접근성 우수',
      '호실 내부 전용 발코니 서비스 면적 제공',
      '3상 4선식 동력 배전 용량 넉넉 확보',
      '직통 화물 엘리베이터 및 하역장 인접 배치'
    ],
    description: '넓은 전용 공간과 드라이브인 하역을 결합하여 자재 입출고가 빈번한 물류 및 제조 기업에 특화된 타입입니다.'
  },
  {
    id: 'type-c',
    name: 'C 타입',
    category: '섹션오피스',
    exclusiveAreaPy: 14.2,
    exclusiveAreaM2: 46.94,
    contractAreaPy: 28.6,
    contractAreaM2: 94.55,
    recommendedUsage: '소프트웨어 개발, 스타트업, 디자인 스튜디오, 세무/회계사무소',
    keyFeatures: [
      '최대 3.9m 높은 층고 설계로 개방감 우수',
      '가변형 벽체 시공으로 2~3개 호실 통합 확장 가능',
      '전면 통창 채광 설계 및 전용 서비스 발코니',
      '개별 FCU 천장형 냉난방기 기본 무상 설치',
      '소자본 투자 및 높은 임대 선호도 보유'
    ],
    description: '소형 사무실 수요가 급증하는 트렌드에 발맞춰 합리적인 분양가와 높은 공간 효율을 자랑하는 스마트 섹션오피스입니다.'
  },
  {
    id: 'type-d',
    name: 'D 타입',
    category: '섹션오피스',
    exclusiveAreaPy: 21.6,
    exclusiveAreaM2: 71.40,
    contractAreaPy: 43.4,
    contractAreaM2: 143.47,
    recommendedUsage: '중견 벤처기업, IT 연구소, 마케팅 에이전시, 엔지니어링',
    keyFeatures: [
      '임원실, 회의실, 워크스테이션 구획이 용이한 황금비율 평면',
      '코너 호실 특화 2면 개방형 발코니 조망 (일부 호실)',
      '최대 3.9m 높은 층고로 답답함 없는 쾌적한 업무 환경',
      '초역세권 출퇴근 인재 채용에 최적화'
    ],
    description: '팀 단위 협업과 업무 효율성을 극대화할 수 있는 중형 섹션오피스로 독립적인 임원실과 회의실 구성이 용이합니다.'
  },
  {
    id: 'type-e',
    name: 'E 타입',
    category: '근린생활시설',
    exclusiveAreaPy: 16.4,
    exclusiveAreaM2: 54.21,
    contractAreaPy: 33.1,
    contractAreaM2: 109.42,
    recommendedUsage: '커피전문점, 베이커리, 편의점, 일반음식점, 부동산',
    keyFeatures: [
      '1층 대로변 스트리트형 상가 배치로 뛰어난 가시성',
      '주안국가산단역 2번 출구 유동인구 100m 직결 동선',
      '상주 인원(지산, 오피스, 기숙사)의 탄탄한 독점 배후 수요',
      '쾌적한 야외 테라스 및 공개공지 연계'
    ],
    description: '초역세권 100m 보행자 동선과 건물 자체 상주 수요를 독점하는 1층 핵심 근린생활시설 상가입니다.'
  },
  {
    id: 'type-a-1',
    name: 'A-1 타입',
    category: '기숙사',
    exclusiveAreaPy: 7.8,
    exclusiveAreaM2: 25.79,
    contractAreaPy: 15.9,
    contractAreaM2: 52.56,
    recommendedUsage: '입주기업 임직원 기숙사, 1인 전문직 주거, 임대 투자',
    terraceAreaPy: 4.1,
    keyFeatures: [
      '★ 약 4평 광폭 단독 테라스 무상 제공 (도심 속 힐링 공간)',
      '풀퍼니시드 빌트인 시스템 (세탁기/냉장고/시스템에어컨 등)',
      '호텔식 샤워부스 및 건식 세면대 분리형 욕실',
      '산단 내 기숙사 희소성으로 높은 임대수익률 및 공실 리스크 최소화'
    ],
    description: '일반 오피스텔에서는 찾아볼 수 없는 약 4평 크기의 광폭 전용 테라스를 제공하여 탁월한 주거 쾌적성을 선사합니다.'
  },
  {
    id: 'type-c-1',
    name: 'C-1 타입',
    category: '기숙사',
    exclusiveAreaPy: 8.9,
    exclusiveAreaM2: 29.42,
    contractAreaPy: 18.2,
    contractAreaM2: 60.16,
    recommendedUsage: '복층 힐링 라이프, 고급 임직원 숙소, 프리미엄 임대',
    terraceAreaPy: 4.2,
    isDuplex: true,
    keyFeatures: [
      '★ 10층 일부세대 복층(Duplex) 구조 특화 설계',
      '★ 약 4평 프라이빗 테라스 서비스 면적 기본 제공',
      '층고 4.5m로 침실과 리빙 공간의 완벽한 수직 분리',
      '풍부한 수납공간 및 계단 하부 수납 특화 설계'
    ],
    description: '10층 최상층에 위치한 복층 특화 기숙사로, 4.5m의 웅장한 층고와 약 4평 테라스를 동시에 누리는 한정판 럭셔리 유닛입니다.'
  }
];

export const FLOOR_PLANS_1_TO_10: FloorPlanItem[] = [
  {
    floorId: '1F',
    floorNumber: 1,
    name: '지상 1층',
    shortName: '1F',
    category: '근생 & 드라이브인',
    tag: '1층 램프 & 스트리트 상가',
    ceilingHeight: '최대 4.2m',
    floorLoad: '1.2 ton/㎡',
    unitsOnFloor: 'E 타입 (근린생활시설 상가) & 물류 하역장',
    description: '주출입구 대로변 스트리트형 근생 상가와 지상 4층까지 연결되는 드라이브인 진입 램프 및 대형 하역 공간이 배치되어 있습니다.',
    features: [
      '지상 4층 직통 곡선 드라이브인 진입 램프',
      '대로변 스트리트형 근린생활시설 상가 배치 (가시성 최고)',
      '단지 내 상주 수요 독점 (카페, 편의점, 구내식당, 금융)',
      '대형 화물트럭 진출입 및 자주식 주차 시스템'
    ]
  },
  {
    floorId: '2F',
    floorNumber: 2,
    name: '지상 2층',
    shortName: '2F',
    category: '제조형 드라이브인',
    tag: '드라이브인 & 도어투도어',
    ceilingHeight: '최대 4.2m',
    floorLoad: '1.2 ton/㎡',
    unitsOnFloor: 'A, B 타입 (제조형 지식산업센터)',
    description: '화물차량이 지상 2층 호실 앞까지 직접 진입하여 편리하게 물품을 상·하역하는 도어 투 도어(Door to Door) 제조형 공간입니다.',
    features: [
      '호실 바로 앞 차량 진입 및 상하역 (Door to Door)',
      '최대 4.2m 높은 층고로 호이스트 및 복층 적재 가능',
      '광폭 통로 설계로 2.5톤~5톤 화물차량 교행 원활',
      '바닥 하중 1.2 ton/㎡ 중장비 설치 완벽 대응'
    ]
  },
  {
    floorId: '3F',
    floorNumber: 3,
    name: '지상 3층',
    shortName: '3F',
    category: '제조형 드라이브인',
    tag: '드라이브인 & 도어투도어',
    ceilingHeight: '최대 4.2m',
    floorLoad: '1.2 ton/㎡',
    unitsOnFloor: 'A, B 타입 (제조형 지식산업센터)',
    description: '호실 앞 주차 및 하역 작업이 동시에 가능한 원스톱 드라이브인 시스템으로 제조업 및 유통물류의 작업 생산성을 극대화합니다.',
    features: [
      '호실 앞 전용 주차 및 즉각적 물류 하역 시스템',
      '최대 4.2m 시원한 층고 및 쾌적한 환기 설계',
      '고하중 바닥 설계(1.2 ton/㎡)로 안전성 확보',
      '물류 상하역 동선 최단 거리 단축'
    ]
  },
  {
    floorId: '4F',
    floorNumber: 4,
    name: '지상 4층',
    shortName: '4F',
    category: '제조형 드라이브인',
    tag: '드라이브인 최상층',
    ceilingHeight: '최대 4.2m',
    floorLoad: '1.0 ~ 1.2 ton/㎡',
    unitsOnFloor: 'A, B 타입 (제조형 지식산업센터)',
    description: '지상 드라이브인 시스템의 최상층으로, 최적의 물류 편의성과 독립적인 제조 환경을 동시에 누릴 수 있는 특별한 층입니다.',
    features: [
      '지상 드라이브인 시스템 최상층의 쾌적한 독립성',
      '차량 호실 앞 직통 진입 및 도어투도어 하역',
      '최대 4.2m 층고의 웅장한 개방감',
      '5층 섹션오피스 층과의 유기적 연결성'
    ]
  },
  {
    floorId: '5F',
    floorNumber: 5,
    name: '지상 5층',
    shortName: '5F',
    category: '스마트 섹션오피스',
    tag: '섹션오피스 시작층',
    ceilingHeight: '3.9m',
    floorLoad: '0.6 ton/㎡',
    unitsOnFloor: 'C, D 타입 (스마트 섹션오피스)',
    description: '소형부터 중대형까지 기업 규모에 맞춰 공간을 자유롭게 확장·통합할 수 있는 가변형 스마트 비즈니스 섹션오피스입니다.',
    features: [
      '전 호실 서비스 발코니 무상 제공 (쾌적한 휴식)',
      '가변형 벽체 모듈로 소형~대형 사옥형 구성 자유',
      'IT, 벤처, 연구개발, 소프트웨어 업종 맞춤 설계',
      '3.9m 층고의 개방감과 세련된 오피스 인테리어'
    ]
  },
  {
    floorId: '6F',
    floorNumber: 6,
    name: '지상 6층',
    shortName: '6F',
    category: '스마트 섹션오피스',
    tag: '중층부 비즈니스 오피스',
    ceilingHeight: '3.9m',
    floorLoad: '0.6 ton/㎡',
    unitsOnFloor: 'C, D 타입 (스마트 섹션오피스)',
    description: '풍부한 채광과 안정된 뷰를 갖춘 중층부 오피스로, 집중도 높은 연구 및 비즈니스 업무 환경을 제공합니다.',
    features: [
      '안정적인 채광과 쾌적한 실내 공기 순환 환경',
      '필요 면적에 따른 맞춤형 호실 통합 솔루션',
      '호실별 개별 냉난방 및 초고속 정보통신 인프라',
      '서비스 발코니를 활용한 티테이블 및 휴게 공간'
    ]
  },
  {
    floorId: '7F',
    floorNumber: 7,
    name: '지상 7층',
    shortName: '7F',
    category: '스마트 섹션오피스',
    tag: '섹션오피스 최상층',
    ceilingHeight: '3.9m',
    floorLoad: '0.6 ton/㎡',
    unitsOnFloor: 'C, D 타입 (섹션오피스 최상층)',
    description: '섹션오피스 구역의 최상층으로 탁 트인 도심 조망권을 확보하였으며, 독립적 사옥형 공간으로 최상의 가치를 선사합니다.',
    features: [
      '섹션오피스 최상층의 탁 트인 도심 파노라마 뷰',
      '층 전체 단독 사옥형 오피스 구성 용이',
      '8층 이상 주거형 기숙사 구역과의 분리된 프라이버시',
      '전 호실 서비스 발코니 및 3.9m 여유로운 층고'
    ]
  },
  {
    floorId: '8F',
    floorNumber: 8,
    name: '지상 8층',
    shortName: '8F',
    category: '테라스 프리미엄 기숙사',
    tag: '전 세대 약 4평 테라스',
    ceilingHeight: '3.6m',
    floorLoad: '0.4 ton/㎡',
    unitsOnFloor: 'A-1, C-1 타입 (프리미엄 테라스 기숙사)',
    description: '전 호실에 약 4평 크기의 광폭 단독 테라스를 무상 제공하여 일과 삶의 균형을 이루는 호텔급 워라밸 기숙사입니다.',
    features: [
      '★ 전 세대 약 4평 광폭 단독 테라스 무상 제공',
      '풀퍼니시드 빌트인 시스템 (세탁기/냉장고/에어컨/쿡탑)',
      '입주기업 임직원을 위한 최상의 직주근접 웰빙 숙소',
      '호텔식 샤워부스 및 분리형 고급 욕실 설계'
    ]
  },
  {
    floorId: '9F',
    floorNumber: 9,
    name: '지상 9층',
    shortName: '9F',
    category: '테라스 프리미엄 기숙사',
    tag: '전 세대 약 4평 테라스',
    ceilingHeight: '3.6m',
    floorLoad: '0.4 ton/㎡',
    unitsOnFloor: 'A-1, C-1 타입 (프리미엄 테라스 기숙사)',
    description: '고층부에서 내려다보는 시원한 도심 조망과 약 4평의 넓은 테라스를 통해 도심 속 프라이빗 가든 라이프를 선사합니다.',
    features: [
      '★ 전 세대 약 4평 광폭 단독 테라스 서비스 면적',
      '고층부 탁 트인 개방감과 풍부한 일조권',
      '최고급 마감재와 완벽한 소음 차단 2중 창호',
      '임대 수요가 넘치는 산단 내 독점형 희소 기숙사'
    ]
  },
  {
    floorId: '10F',
    floorNumber: 10,
    name: '지상 10층',
    shortName: '10F',
    category: '최고층 복층 펜트 기숙사',
    tag: '복층 특화 + 테라스',
    ceilingHeight: '최대 4.5m',
    floorLoad: '0.4 ton/㎡',
    unitsOnFloor: '10층 복층(Duplex) 특화 기숙사',
    description: '지상 10층 최고층의 복층(Duplex) 구조 특화 설계와 약 4평 테라스를 동시에 누리는 주안국가산단 최고의 펜트하우스형 기숙사입니다.',
    features: [
      '★ 일부세대 복층(Duplex) 구조 설계로 2배의 공간 개방감',
      '★ 전 호실 약 4평 단독 야외 테라스 무상 제공',
      '최고 4.5m 층고로 리빙룸과 침실의 완벽한 분리',
      '옥상 하늘정원과 바로 연결되는 최상층 프리미엄 혜택'
    ]
  }
];

export const LOCATION_POINTS = [
  {
    title: '주안국가산단역 2번 출구 100m',
    highlight: '도보 5분 초역세권',
    desc: '인천지하철 2호선 주안국가산단역 2번 출구에서 단 100미터! 출퇴근 및 비즈니스 미팅에 최적화된 절대 입지'
  },
  {
    title: '트리플 광역 철도망 접근성',
    highlight: '1호선 주안역 & 환승 특급',
    desc: '인천 2호선 1정거장 거리의 1호선 주안역 급행 환승을 통해 서울 구로, 용산, 서울역으로 30분대 진입 가능'
  },
  {
    title: '경인고속도로 가좌IC · 도화IC 인접',
    highlight: '사통팔달 쾌속 물류망',
    desc: '경인고속도로 가좌IC 및 도화IC, 수도권 제2순환고속도로와 인접하여 인천항, 인천국제공항 및 수도권 전역 쾌속 연결'
  },
  {
    title: '주안국가산단 혁신 산업 배후 수요',
    highlight: '직주근접 및 풍부한 임차 수요',
    desc: '구조고도화 사업으로 첨단 지식기반 산업단지로 변모하는 주안국가산단의 핵심 중심부에 위치하여 탄탄한 배후 수요 확보'
  }
];
