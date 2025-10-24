# 사용 가이드

## 빠른 시작

### 1. 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 2. 새 블로그 포스트 작성

#### 단계 1: 폴더 생성

현재 연도와 월에 해당하는 폴더를 만듭니다 (이미 있다면 생략):

```bash
mkdir -p content/blog/2024/11
```

#### 단계 2: 마크다운 파일 생성

`content/blog/2024/11/my-new-post.md` 파일을 만들고 다음 형식으로 작성:

```markdown
---
title: "나의 새로운 포스트"
date: "2024-11-15"
category: "개발"
tags: ["태그1", "태그2", "태그3"]
description: "포스트에 대한 간단한 설명입니다."
---

# 제목

여기에 본문 내용을 작성합니다...

## 부제목

- 리스트 아이템 1
- 리스트 아이템 2

\`\`\`javascript
// 코드 블록
const hello = "world";
\`\`\`
```

#### 단계 3: 확인

개발 서버가 실행 중이라면 자동으로 새 포스트가 반영됩니다.

## 마크다운 작성 팁

### Frontmatter 필드

- **title** (필수): 포스트 제목
- **date** (필수): 발행일 (YYYY-MM-DD 형식)
- **category** (필수): 카테고리 (한 개만)
- **tags** (필수): 태그 배열 (여러 개 가능)
- **description** (필수): 포스트 설명 (SEO 및 카드에 표시)

### 마크다운 문법

#### 제목

```markdown
# H1 제목
## H2 제목
### H3 제목
```

#### 강조

```markdown
**굵게**
*기울임*
~~취소선~~
```

#### 리스트

```markdown
- 순서 없는 리스트
- 항목 2
  - 중첩 항목

1. 순서 있는 리스트
2. 항목 2
```

#### 링크

```markdown
[링크 텍스트](https://example.com)
```

#### 이미지

```markdown
![대체 텍스트](/images/photo.jpg)
```

이미지 파일은 `/public/images/` 폴더에 저장하세요.

#### 코드

인라인 코드: \`code\`

코드 블록:

\`\`\`javascript
function hello() {
  console.log("Hello!");
}
\`\`\`

지원 언어: javascript, typescript, python, bash, jsx, tsx, css, html 등

#### 인용

```markdown
> 인용문입니다.
> 여러 줄도 가능합니다.
```

#### 테이블

```markdown
| 헤더1 | 헤더2 | 헤더3 |
|-------|-------|-------|
| 셀1   | 셀2   | 셀3   |
| 셀4   | 셀5   | 셀6   |
```

## 카테고리 및 태그 관리

### 카테고리

- 포스트당 하나의 카테고리만 지정
- 일관된 이름 사용 권장 (예: "Next.js", "React", "TypeScript")
- 자동으로 `/category/카테고리명` 페이지 생성

### 태그

- 포스트당 여러 태그 지정 가능
- 구체적이고 의미 있는 태그 사용
- 자동으로 `/tag/태그명` 페이지 생성

### 권장 사항

일관성을 위해 기존 카테고리와 태그를 먼저 확인하세요:

- 홈페이지 하단의 카테고리/태그 섹션 참고
- 또는 `/blog` 페이지에서 확인

## 빌드 및 배포

### 로컬 빌드

```bash
npm run build
```

빌드된 정적 파일은 `/out` 폴더에 생성됩니다.

### 빌드 확인

```bash
# 정적 파일 서버로 테스트 (npx serve 사용)
npx serve out
```

### Vercel 배포

#### 방법 1: GitHub 연동 (권장)

1. GitHub에 코드 푸시
2. [vercel.com](https://vercel.com)에서 프로젝트 연동
3. 자동 배포 완료

이후 `main` 브랜치에 푸시할 때마다 자동 배포됩니다.

#### 방법 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 커스터마이징

### 블로그 정보 수정

`/app/layout.tsx`:
- 블로그 이름
- 메타 설명

`/components/navigation.tsx`:
- 로고 텍스트
- 네비게이션 메뉴

### About 페이지 수정

`/app/about/page.tsx` 파일을 수정하여 자신의 소개를 작성하세요.

### 색상 테마 변경

다른 shadcn 테마를 사용하려면:

```bash
npx shadcn@latest add https://tweakcn.com/r/themes/[테마명].json
```

사용 가능한 테마는 [tweakcn.com](https://tweakcn.com)에서 확인하세요.

## 문제 해결

### 포스트가 표시되지 않을 때

1. frontmatter 형식 확인 (YAML 형식 준수)
2. 파일 경로 확인 (`content/blog/YYYY/MM/파일명.md`)
3. 날짜 형식 확인 (YYYY-MM-DD)
4. 개발 서버 재시작

### 빌드 에러

```bash
# 타입 체크
npm run build

# 린트 체크
npm run lint
```

### 이미지가 표시되지 않을 때

- 이미지는 `/public` 폴더에 저장
- 마크다운에서 `/이미지경로` 형식으로 참조
- 정적 빌드 시 `unoptimized: true` 설정 확인 (이미 설정됨)

## 추가 기능 아이디어

프로젝트를 확장하고 싶다면:

1. **검색 기능**: 포스트 제목/내용 검색
2. **RSS 피드**: 블로그 구독 기능
3. **댓글 시스템**: Giscus, Utterances 등 통합
4. **조회수 카운터**: Vercel Analytics 활용
5. **다크 모드 토글**: 수동 다크 모드 전환 버튼
6. **이전/다음 포스트 네비게이션**
7. **목차 (Table of Contents)**
8. **포스트 공유 버튼**: SNS 공유 기능

## 도움말

더 자세한 내용은 다음 문서를 참고하세요:

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Markdown 가이드](https://www.markdownguide.org/)

