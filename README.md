# OtaUta - 애니메이션 OST 검색 서비스

애니메이션 OST와 노래방 정보를 쉽게 검색할 수 있는 한국어 웹 서비스입니다.

## 🌟 주요 기능

### 🌍 다국어 지원

- OST 제목을 **원어로 표시**하고 **번역된 제목을 괄호 안에 표시**
- 한국어, 영어, 일본어 제목 지원

### 🎶 OST 상세 정보

- 노래 표시 형식: "애니메이션 제목 + 시즌 정보 + OP/ED 타입"
- 각 OST의 노래방 가용성 정보:
  - 일본: DAM, JOYSOUND
  - 한국: TJ, KY
- 노래방 곡 번호 표시
- 노래와 애니메이션 시리즈에 대한 "좋아요" 기능

### 💡 상호작용

- 로그인하지 않은 사용자가 "좋아요" 클릭 시 로그인 모달 표시
- 로그인 후 사용자 즐겨찾기 수집 및 노래/애니메이션 시리즈 분리
- 애니메이션 태그 클릭 시 해당 애니메이션의 모든 OST 표시
- 노래방 태그 클릭 시 **새 창에서 YouTube 검색 결과 열기**: `"노래 원제목 + 노래방 이름"`
- 노래 제목 옆 YouTube 버튼/아이콘 클릭 시 **새 창에서 노래 원제목으로 YouTube 검색 결과 열기**

### 🗂 네비게이션 & 레이아웃

- 최소한의 상단 네비게이션 바 (사이드바 불필요)
- 관리자만 접근 가능한 관리자 대시보드
- 애니메이션/OST 관계 관리 및 데이터 추가/편집을 위한 대시보드

### 📁 데이터 구조

- 애니메이션 시리즈는 **시즌 정보를 포함하지 않음**; 시즌은 OST 데이터의 일부
- 표시용:
  - 노래 카드의 애니메이션 정보는 **텍스트로 표시**: "애니메이션 제목 + 시즌 정보 + OP/ED"
  - 태그는 애니메이션 제목을 표시; 클릭 시 시리즈 상세 페이지로 이동

### ➕ 추가 기능

- 사용자가 노래나 시리즈를 제안/추가할 수 있는 페이지 포함

### 🔍 필터링 & 검색

- 애니메이션 시리즈별 검색/필터링 가능

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

1. 저장소 클론

```bash
git clone <repository-url>
cd otauta
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

```bash
cp .env.example .env
# .env 파일을 편집하여 필요한 환경 변수를 설정하세요
```

4. 데이터베이스 설정

```bash
npx prisma migrate dev
npm run seed
```

5. 개발 서버 실행

```bash
npm run dev
```

6. 브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 📁 프로젝트 구조

```
otauta/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # 메인 페이지
│   │   ├── favorites/      # 즐겨찾기 페이지
│   │   ├── submit/         # 제안하기 페이지
│   │   └── admin/          # 관리자 대시보드
│   ├── components/         # React 컴포넌트
│   │   ├── Navigation.tsx  # 네비게이션 바
│   │   ├── SearchForm.tsx  # 검색 폼
│   │   ├── SongCard.tsx    # 노래 카드
│   │   └── AnimeCard.tsx   # 애니메이션 카드
│   ├── lib/               # 유틸리티
│   │   └── db.ts          # 데이터베이스 연결
│   └── types/             # TypeScript 타입 정의
│       └── index.ts       # 타입 정의
├── prisma/                # 데이터베이스 스키마
│   ├── schema.prisma      # Prisma 스키마
│   └── seed.ts           # 샘플 데이터
└── public/               # 정적 파일
```

## 🛠 기술 스택

- **프론트엔드**: Next.js 15, React 19, TypeScript
- **스타일링**: Tailwind CSS
- **데이터베이스**: SQLite (개발), Prisma ORM
- **인증**: NextAuth.js
- **아이콘**: Lucide React

## 📊 데이터베이스 스키마

### 주요 모델

- **User**: 사용자 정보 및 즐겨찾기
- **Anime**: 애니메이션 정보
- **Song**: OST 정보
- **KaraokeInfo**: 노래방 가용성 정보
- **UserFavoriteSong/Anime**: 사용자 즐겨찾기
- **SongSubmission/AnimeSubmission**: 사용자 제안

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 샘플 데이터 추가
npm run seed

# Prisma Studio 실행 (데이터베이스 GUI)
npx prisma studio
```

## 🌐 배포

이 프로젝트는 Vercel, Netlify, 또는 다른 Next.js 호스팅 서비스에 배포할 수 있습니다.

### Vercel 배포

1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 연결
3. 환경 변수 설정
4. 자동 배포 완료

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.
