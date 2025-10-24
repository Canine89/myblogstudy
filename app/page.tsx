import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/post-card';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/markdown';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, FolderOpen, Tag } from 'lucide-react';

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 5);
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-20 space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
          editop의 스터디 블로그
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Next.js, React, TypeScript 등 다양한 기술을 학습하고 공유합니다.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/blog">
            <Button size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              블로그 둘러보기
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              소개 보기
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">최근 포스트</h2>
            <Link href="/blog">
              <Button variant="ghost" className="gap-2">
                모두 보기
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={`${post.year}-${post.month}-${post.slug}`} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories and Tags Section */}
      <section className="py-12 grid md:grid-cols-2 gap-8">
        {/* Categories */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FolderOpen className="w-6 h-6" />
            카테고리
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link key={category} href={`/category/${encodeURIComponent(category)}`}>
                <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors">
                  {category}
                </Badge>
              </Link>
            ))}
            {categories.length === 0 && (
              <p className="text-muted-foreground">아직 카테고리가 없습니다.</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="w-6 h-6" />
            태그
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="text-base py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
            {tags.length === 0 && (
              <p className="text-muted-foreground">아직 태그가 없습니다.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
