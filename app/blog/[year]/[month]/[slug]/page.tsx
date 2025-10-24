import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, markdownToHtml } from '@/lib/markdown';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { Calendar, FolderOpen, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    year: post.year,
    month: post.month,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { year, month, slug } = await params;
  const post = getPostBySlug(year, month, slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | editop의 스터디 블로그`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { year, month, slug } = await params;
  const post = getPostBySlug(year, month, slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);
  const formattedDate = format(new Date(post.date), 'PPP', { locale: ko });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 mb-8">
            <ArrowLeft className="w-4 h-4" />
            블로그 목록으로
          </Button>
        </Link>

        {/* Post Header */}
        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
            
            {post.description && (
              <p className="text-xl text-muted-foreground">
                {post.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              
              <Separator orientation="vertical" className="h-4" />
              
              <Link 
                href={`/category/${encodeURIComponent(post.category)}`}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                <span>{post.category}</span>
              </Link>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                    <Badge 
                      variant="secondary" 
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          <Separator />

          {/* Post Content */}
          <div className="py-8">
            <MarkdownRenderer content={contentHtml} />
          </div>

          <Separator />

          {/* Footer Navigation */}
          <footer className="pt-8">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                블로그 목록으로 돌아가기
              </Button>
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}

