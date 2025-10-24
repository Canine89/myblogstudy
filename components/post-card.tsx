import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/lib/markdown';
import { Calendar, FolderOpen } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const postUrl = `/blog/${post.year}/${post.month}/${post.slug}`;
  const formattedDate = format(new Date(post.date), 'PPP', { locale: ko });

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <Link href={postUrl}>
          <CardTitle className="hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
              <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <Link 
          href={`/category/${encodeURIComponent(post.category)}`}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <FolderOpen className="w-4 h-4" />
          <span>{post.category}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}

