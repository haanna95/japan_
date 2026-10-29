# Gemini 일정 생성 서버

`POST /api/plan`은 날짜, 기간, 인원, 연구 분야, 관광 스타일과 희망 주제를 받아 Gemini에 검색 없는 일정 생성을 요청합니다. DB는 사용하지 않습니다. 서버가 날짜 수, 시간 형식과 중복을 검증하고 브라우저는 결과를 HTML 이스케이프하여 표시합니다. 실제 시설 운영·예약·이동 경로를 검증하는 시스템은 아니며 센터 확인이 필요합니다.

## API 키

노출되지 않은 새 키를 Sites의 서버 환경 변수 `GEMINI_API_KEY`에 secret으로 설정하고 저장된 버전을 다시 배포해야 합니다. 키는 GitHub, HTML, JS 번들 또는 hosting.json에 넣지 않습니다. `GEMINI_MODEL` 기본값은 `gemini-3.1-flash-lite`이며 구조화 출력을 지원하는 모델이 필요합니다.

로컬 입력은 PowerShell에서 `./scripts/set-gemini-key.ps1`을 실행합니다. 입력은 숨겨지며 Git에서 제외된 `.env.local`에만 저장됩니다. 이 로컬 파일을 만들었다고 운영 서버에 자동 등록되지는 않습니다.

## 실행·검증

- 로컬: `node --env-file=.env.local scripts/dev-server.mjs`
- 키 없이 UI 오류 처리 확인: `node scripts/dev-server.mjs`
- 서버 테스트: `node --test tests/gemini.test.mjs`
- Sites 빌드: `node scripts/build-worker.mjs` (프로젝트 ID가 있는 `.openai/hosting.json` 필요)

API 키 미설정 시 503과 연결 준비 안내를 반환하며 규칙 기반 결과를 Gemini 결과로 대체 표시하지 않습니다. 네트워크 타임아웃·응답 검증 실패·사용량 한도를 화면에 표시합니다. 호출 조건은 Google에 전달됩니다. 개인정보 입력 필드는 없습니다.

요청 크기·기간·인원을 제한하고 프로세스별 IP 호출 제한을 적용했습니다. 분산 전체 호출량이나 비용의 절대 상한은 아니므로 실제 공개 운영 전 Google 프로젝트 쿼터와 서비스 수준의 공유 호출 제한을 설정해야 합니다. API 사용 및 검색 비용은 해당 Google 계정에 적용됩니다.

테스트는 mock 응답으로 계약과 오류 처리를 검증합니다. 실제 키가 없으면 실 API 모델 지원 여부·검색 출처 반환·실제 생성 품질은 검증할 수 없습니다.
