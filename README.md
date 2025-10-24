# editop의 스터디 블로그

Next.js 기반의 정적 블로그입니다. 마크다운으로 글을 작성하고 Vercel에 배포할 수 있습니다.

## 주요 기능

- ✅ **정적 사이트 생성**: Next.js의 `output: 'export'` 기능으로 완전한 정적 사이트 생성
- ✅ **마크다운 지원**: 마크다운으로 블로그 포스트 작성
- ✅ **월별 관리**: 연/월 폴더 구조로 포스트 관리 (`/content/blog/YYYY/MM/`)
- ✅ **카테고리 & 태그**: 포스트를 카테고리와 태그로 분류 및 필터링
- ✅ **아름다운 디자인**: shadcn/ui의 amethyst-haze 테마 적용
- ✅ **반응형 레이아웃**: 모바일, 태블릿, 데스크톱 모든 화면 크기 지원
- ✅ **코드 하이라이팅**: 코드 블록 문법 강조
- ✅ **SEO 최적화**: 메타데이터 및 정적 생성으로 검색 엔진 최적화

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (amethyst-haze theme)
- **Markdown**: gray-matter, remark, rehype
- **Icons**: lucide-react
- **Date Formatting**: date-fns

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 3. 블로그 포스트 작성

`/content/blog/` 폴더에 연도와 월 폴더를 만들고 마크다운 파일을 추가합니다.

```
content/
  blog/
    2024/
      10/
        my-first-post.md
        another-post.md
      11/
        new-post.md
```

#### 마크다운 포맷

각 마크다운 파일은 frontmatter를 포함해야 합니다:

```markdown
---
title: "포스트 제목"
date: "2024-10-24"
category: "카테고리명"
tags: ["태그1", "태그2", "태그3"]
description: "포스트 간단 설명"
---

# 본문 시작

여기에 마크다운 내용을 작성합니다...
```

### 4. 정적 빌드

```bash
npm run build
```

빌드된 정적 파일은 `/out` 폴더에 생성됩니다.

## 페이지 구조

- **Home (`/`)**: 메인 페이지, 최근 포스트 및 카테고리/태그 개요
- **About (`/about`)**: 블로그 소개 페이지
- **Blog (`/blog`)**: 모든 포스트를 월별로 그룹화하여 표시
- **Post (`/blog/[year]/[month]/[slug]`)**: 개별 블로그 포스트
- **Category (`/category/[category]`)**: 특정 카테고리의 포스트 목록
- **Tag (`/tag/[tag]`)**: 특정 태그의 포스트 목록

## Vercel 배포

### 1. GitHub에 푸시

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercel에 배포

1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `out`
5. "Deploy" 클릭

배포가 완료되면 자동으로 생성된 URL로 블로그에 접근할 수 있습니다.

## 커스터마이징

### 블로그 이름 변경

`/app/layout.tsx`의 메타데이터와 `/components/navigation.tsx`의 로고 텍스트를 수정하세요.

### 색상 테마 변경

다른 shadcn 테마를 사용하려면:

```bash
npx shadcn@latest add https://tweakcn.com/r/themes/[테마명].json
```

### About 페이지 수정

`/app/about/page.tsx` 파일을 수정하여 자신의 소개를 작성하세요.

## 프로젝트 구조

```
├── app/                      # Next.js 앱 라우터
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지
│   ├── about/               # About 페이지
│   ├── blog/                # 블로그 페이지
│   │   ├── page.tsx         # 블로그 목록
│   │   └── [year]/[month]/[slug]/  # 개별 포스트
│   ├── category/            # 카테고리 필터
│   └── tag/                 # 태그 필터
├── components/              # React 컴포넌트
│   ├── ui/                  # shadcn/ui 컴포넌트
│   ├── navigation.tsx       # 네비게이션
│   ├── post-card.tsx        # 포스트 카드
│   └── markdown-renderer.tsx # 마크다운 렌더러
├── content/                 # 블로그 콘텐츠
│   └── blog/                # 마크다운 포스트
│       └── YYYY/MM/         # 연/월 폴더
├── lib/                     # 유틸리티 함수
│   └── markdown.ts          # 마크다운 처리
└── public/                  # 정적 파일
```

## 라이선스

MIT

## 문의

문제가 발생하거나 제안사항이 있으시면 이슈를 등록해주세요.
