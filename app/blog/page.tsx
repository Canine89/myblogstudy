import { getAllPosts, getPostsByMonth } from '@/lib/markdown';
import { PostCard } from '@/components/post-card';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';

export const metadata = {
  title: 'Blog | editop의 스터디 블로그',
  description: '모든 블로그 포스트',
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const postsByMonth = getPostsByMonth();

  // Map을 배열로 변환하고 정렬 (최신순)
  const sortedMonths = Array.from(postsByMonth.entries()).sort((a, b) => {
    return b[0].localeCompare(a[0]);
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            총 {allPosts.length}개의 포스트
          </p>
        </div>

        {allPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
            <p className="text-muted-foreground mt-2">
              /content/blog 폴더에 마크다운 파일을 추가해주세요.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {sortedMonths.map(([monthKey, posts]) => {
              const [year, month] = monthKey.split('-');
              const monthDate = new Date(parseInt(year), parseInt(month) - 1);
              const monthLabel = format(monthDate, 'yyyy년 M월', { locale: ko });

              return (
                <section key={monthKey}>
                  {/* Month Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">{monthLabel}</h2>
                    <Separator className="flex-1" />
                    <span className="text-sm text-muted-foreground">
                      {posts.length}개의 포스트
                    </span>
                  </div>

                  {/* Posts Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                      <PostCard 
                        key={`${post.year}-${post.month}-${post.slug}`} 
                        post={post} 
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

