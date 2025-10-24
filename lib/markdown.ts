import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

const contentDirectory = path.join(process.cwd(), 'content/blog');

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

// 재귀적으로 모든 마크다운 파일 찾기
function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (path.extname(file) === '.md') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 파일 경로에서 year, month, slug 추출
function extractPathInfo(filePath: string): { year: string; month: string; slug: string } {
  const relativePath = path.relative(contentDirectory, filePath);
  const parts = relativePath.split(path.sep);
  
  // parts[0] = year, parts[1] = month, parts[2] = filename
  const year = parts[0];
  const month = parts[1];
  const filename = parts[2];
  const slug = filename.replace(/\.md$/, '');

  return { year, month, slug };
}

// 마크다운을 HTML로 변환
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

// 모든 포스트 가져오기
export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = getAllMarkdownFiles(contentDirectory);
  const posts = files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const { year, month, slug } = extractPathInfo(filePath);

    return {
      slug,
      year,
      month,
      content,
      title: data.title || 'Untitled',
      date: data.date || '',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      description: data.description || '',
    } as Post;
  });

  // 날짜순 정렬 (최신순)
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// 특정 포스트 가져오기
export function getPostBySlug(year: string, month: string, slug: string): Post | null {
  const filePath = path.join(contentDirectory, year, month, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    year,
    month,
    content,
    title: data.title || 'Untitled',
    date: data.date || '',
    category: data.category || 'Uncategorized',
    tags: data.tags || [],
    description: data.description || '',
  } as Post;
}

// 모든 카테고리 가져오기
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

// 모든 태그 가져오기
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

// 카테고리별 포스트 가져오기
export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

// 태그별 포스트 가져오기
export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

// 월별로 포스트 그룹화
export function getPostsByMonth(): Map<string, Post[]> {
  const posts = getAllPosts();
  const grouped = new Map<string, Post[]>();

  posts.forEach((post) => {
    const key = `${post.year}-${post.month}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(post);
  });

  return grouped;
}

