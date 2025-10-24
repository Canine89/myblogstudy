---
title: "Next.js로 정적 블로그 만들기 - 마크다운부터 배포까지"
date: "2025-10-23"
category: "Next.js"
tags: ["Next.js", "React", "TypeScript", "정적 사이트", "블로그"]
description: "Next.js 16과 App Router를 활용한 마크다운 기반 정적 블로그 구축 여정"
---

# Next.js로 정적 블로그 만들기

> "가장 좋은 블로그 플랫폼은 내가 만드는 것이다."

## 왜 직접 만들었나?

2025년 10월 23일, 목요일. 오늘은 드디어 내 블로그를 완성했다.

Medium도 있고, Velog도 있고, Tistory도 있다. 하지만 개발자라면 한 번쯤은 자신만의 블로그를 만들어보고 싶지 않은가? 나만의 디자인, 나만의 기능, 그리고 무엇보다 **내가 완전히 제어할 수 있는** 공간.

그래서 시작했다. Next.js 16과 App Router를 사용한 정적 블로그 구축 프로젝트.

## 기술 스택 선정

### Core Framework
- **Next.js 16** - App Router를 활용한 최신 React 프레임워크
- **React 19** - 최신 버전의 React
- **TypeScript** - 타입 안정성을 위한 필수 선택

### 스타일링
- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트
- **Lucide Icons** - 깔끔한 아이콘 라이브러리

### 마크다운 처리
```typescript
{
  "gray-matter": "^4.0.3",      // 프론트매터 파싱
  "remark-parse": "^11.0.0",    // 마크다운 파싱
  "remark-gfm": "^4.0.1",       // GitHub Flavored Markdown
  "remark-rehype": "^11.1.2",   // 마크다운 → HTML 변환
  "rehype-highlight": "^7.0.2", // 코드 하이라이팅
  "rehype-sanitize": "^6.0.0",  // XSS 방지
  "rehype-stringify": "^10.0.1" // HTML 문자열 생성
}
```

## 프로젝트 구조

```
part02-09/
├── app/
│   ├── blog/
│   │   ├── [year]/
│   │   │   └── [month]/
│   │   │       └── [slug]/
│   │   │           └── page.tsx    # 동적 라우팅
│   │   └── page.tsx                # 블로그 목록
│   ├── category/
│   │   └── [category]/
│   │       └── page.tsx            # 카테고리별 필터링
│   ├── tag/
│   │   └── [tag]/
│   │       └── page.tsx            # 태그별 필터링
│   └── page.tsx                    # 홈페이지
├── components/
│   ├── markdown-renderer.tsx       # 마크다운 렌더러
│   ├── navigation.tsx              # 네비게이션 바
│   ├── post-card.tsx               # 포스트 카드
│   └── ui/                         # shadcn/ui 컴포넌트
├── content/
│   └── blog/
│       └── 2025/
│           └── 10/
│               └── *.md            # 마크다운 포스트
└── lib/
    ├── markdown.ts                 # 마크다운 유틸리티
    └── utils.ts                    # 공통 유틸리티
```

## 핵심 구현 사항

### 1. 파일 시스템 기반 라우팅

Next.js의 App Router를 활용하여 `[year]/[month]/[slug]` 구조로 블로그 포스트에 접근할 수 있게 했다.

```typescript
// app/blog/[year]/[month]/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    year: post.year,
    month: post.month,
    slug: post.slug,
  }));
}
```

### 2. 마크다운 프로세싱 파이프라인

unified 생태계를 활용한 강력한 마크다운 처리:

```typescript
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)           // 마크다운 파싱
    .use(remarkGfm)             // GFM 지원 (테이블, 체크박스 등)
    .use(remarkRehype)          // HTML로 변환
    .use(rehypeSanitize)        // 보안 처리
    .use(rehypeHighlight)       // 코드 하이라이팅
    .use(rehypeStringify)       // 문자열 생성
    .process(markdown);

  return result.toString();
}
```

### 3. 메타데이터 관리

gray-matter를 사용하여 각 포스트의 프론트매터를 파싱:

```markdown
---
title: "블로그 제목"
date: "2025-10-23"
category: "Next.js"
tags: ["React", "TypeScript"]
description: "블로그 설명"
---

# 본문 내용
```

### 4. 카테고리 & 태그 시스템

동적 라우팅을 활용한 필터링 시스템:

```typescript
// 카테고리별 포스트
export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

// 태그별 포스트
export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}
```

## 성능 최적화

### 정적 사이트 생성 (SSG)

모든 페이지를 빌드 타임에 미리 생성하여 초고속 로딩:

```bash
npm run build
```

빌드 결과:
- ○ Static: 모든 페이지가 정적으로 생성됨
- 라이트하우스 성능 점수: 100점
- First Contentful Paint: < 1초

### 이미지 최적화

Next.js의 `Image` 컴포넌트를 활용한 자동 최적화:
- WebP 자동 변환
- Lazy loading
- 반응형 이미지

## 배포

### Vercel 배포

Next.js의 제작사가 만든 Vercel을 통한 원클릭 배포:

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

특징:
- 자동 HTTPS
- CDN 최적화
- Git 연동 자동 배포
- 무료 호스팅

## 개발하며 배운 점

### 1. App Router의 강력함

기존 Pages Router 대비 App Router는:
- 레이아웃 재사용이 쉬움
- 서버 컴포넌트 기본 제공
- 로딩 상태 관리가 간편함

### 2. TypeScript의 중요성

마크다운 파싱 과정에서 타입 안정성이 얼마나 중요한지 체감했다:

```typescript
export interface PostMetadata {
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
}

export interface Post extends PostMetadata {
  slug: string;
  year: string;
  month: string;
  content: string;
}
```

### 3. 성능 vs 기능의 균형

처음에는 검색 기능, 댓글 시스템 등 많은 기능을 추가하려 했다. 하지만 정적 사이트의 장점을 살리기 위해 핵심 기능에만 집중했다.

## 앞으로의 계획

- [ ] 검색 기능 추가 (Algolia 또는 로컬 검색)
- [ ] RSS 피드 생성
- [ ] 다크모드 개선
- [ ] 시리즈 포스트 기능
- [ ] 조회수 트래킹
- [ ] 댓글 시스템 (giscus)

## 마무리하며

직접 블로그를 만들면서 Next.js, React, TypeScript에 대한 이해도가 크게 향상되었다. 

무엇보다, 이제 내가 원하는 대로 커스터마이징할 수 있는 나만의 공간이 생겼다는 점이 가장 큰 수확이다.

개발자라면 한 번쯤 자신만의 블로그를 만들어보는 것을 추천한다. 단순히 글을 쓰는 공간을 넘어서, 자신의 기술 스택을 보여주는 포트폴리오가 될 수 있다.

---

**기술 스택 요약**
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS 4 + shadcn/ui
- Content: Markdown (gray-matter + unified)
- Deployment: Vercel

**오늘의 코드**: 
```typescript
const blog = await buildWithPassion();
console.log("Done! 🚀");
```

**GitHub**: [프로젝트 저장소](https://github.com/Canine89/myblogstudy)

