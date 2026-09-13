# Vercel 배포 가이드

AI Studio에서 만든 이 프로젝트(Vite + React 19 + Tailwind 4)를 Vercel에 배포하는 방법입니다.
서버 코드가 없는 **순수 정적 사이트**라서 별도의 API 키나 서버 설정이 필요 없습니다.

---

## 0. 배포 전 준비 (이미 적용됨)

| 항목 | 내용 |
| --- | --- |
| `vercel.json` | 프레임워크(vite), 빌드 명령, 출력 폴더(`dist`), SPA 라우팅, 이미지 캐시 헤더 |
| 이미지 경로 | `/src/assets/images/...` → `/images/...` (`public/images/`로 이동) |
| 이미지 최적화 | 전부 WebP 변환 + 최대 가로 1920px로 리사이즈 (25.7MB → 1.3MB) |

> **중요**: AI Studio 미리보기에서는 `/src/assets/...` 경로가 열리지만, `vite build` 결과물에는
> `src/` 폴더가 포함되지 않습니다. 그대로 배포하면 배포된 사이트에서 이미지가 전부 깨집니다.
> 그래서 실제로 사용 중인 이미지를 `public/images/`로 옮기고 경로를 수정했습니다.
> 앞으로 AI Studio에서 이미지를 추가하면 `public/images/`에 넣고 `/images/파일명`으로 참조하세요.
> 용량이 큰 사진은 WebP로 변환해서 넣는 것을 권장합니다.

---

## 1. Vercel MCP 연결하기

Vercel은 공식 원격 MCP 서버(`https://mcp.vercel.com`)를 제공합니다.

**Claude Code에서:**

```bash
claude mcp add --transport http vercel https://mcp.vercel.com
```

추가한 뒤 Claude Code 안에서 `/mcp` 를 입력하면 인증(OAuth) 화면이 뜹니다.
브라우저에서 Vercel 계정으로 로그인/승인하면 연결이 끝납니다.

**Claude 데스크톱/웹앱에서:** 설정 → 커넥터 → 사용자 지정 커넥터 추가 →
URL에 `https://mcp.vercel.com` 입력 → 연결 후 로그인.

연결되면 `/mcp` 로 사용 가능한 도구 목록을 확인할 수 있습니다. 보통 이런 것들이 있습니다:

- 프로젝트/팀 목록 조회, 프로젝트 상세 조회
- 배포 목록 및 특정 배포 상태 조회
- **배포 빌드 로그 조회** (빌드 실패 원인 파악에 가장 유용)
- Vercel 공식 문서 검색
- 배포 실행 도구 (`deploy_to_vercel` 계열 — 버전에 따라 제공 여부가 다릅니다)

---

## 2. 배포 방법

### 방법 A — GitHub 연동 (권장)

가장 안정적이고, 한 번만 설정하면 이후 `git push`마다 자동 배포됩니다.

1. https://vercel.com/new 접속
2. 이 GitHub 저장소를 **Import**
3. 설정 확인 (`vercel.json`이 있어서 대부분 자동으로 채워집니다)
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: **없음** (이 프로젝트는 Gemini API를 호출하지 않습니다)
4. **Deploy** 클릭

이후 배포 상태 확인, 빌드 로그 분석, 실패 원인 수정은 MCP로 하면 됩니다. 예:

> "Vercel에서 제이원플렉스 프로젝트 최신 배포 상태 확인해줘"
> "빌드 실패했는데 로그 가져와서 원인 고쳐줘"

### 방법 B — MCP로 바로 배포

MCP 연결 후 채팅에서 이렇게 요청합니다:

> "Vercel MCP로 이 프로젝트를 배포해줘"

`deploy_to_vercel` 도구가 있으면 그대로 진행되고, 없으면 방법 A나 C로 안내됩니다.
(MCP 서버 도구 구성은 Vercel이 수시로 바꾸므로 `/mcp`에서 실제 목록을 먼저 확인하세요.)

### 방법 C — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel          # 미리보기 배포
vercel --prod   # 프로덕션 배포
```

---

## 3. 배포 후 체크리스트

- [ ] 이미지가 모두 보이는지 (특히 히어로 배경, 층별 안내, 약도)
- [ ] 모바일 화면에서 레이아웃 확인
- [ ] 고객 등록 폼 동작 확인 — **현재 `localStorage`에만 저장됩니다.**
      브라우저별로 따로 저장되며 서버로 전송되지 않으므로, 실제 상담 접수용으로 쓰려면
      Google Sheets / Formspree / Vercel Serverless Function 연동이 추가로 필요합니다.
- [ ] 커스텀 도메인 연결 (Vercel 프로젝트 → Settings → Domains)

---

## 4. 참고 / 남은 정리거리

- **이미지는 이미 최적화되어 있습니다.** 원본 4032x2268 사진과 14MB PNG를 WebP(최대 1920px)로
  변환해서 빌드 결과물이 약 26MB → 1.9MB가 되었습니다. 화질 저하는 육안으로 확인되지 않습니다.
- `src/assets/images/` 에 현재 사용하지 않는 원본 이미지 16장(약 40MB)이 남아 있습니다.
  빌드 결과물에는 포함되지 않지만, 저장소 용량을 줄이려면 정리해도 됩니다.
- `package.json`의 `express`, `@google/genai`, `jpeg-js` 는 실제로 사용되지 않습니다.
  (AI Studio 기본 템플릿 잔재 — 제거해도 빌드에 영향 없습니다.)
