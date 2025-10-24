import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Code, Lightbulb, Target } from 'lucide-react';

export const metadata = {
  title: 'About | editop의 스터디 블로그',
  description: '블로그 소개 및 운영 방침',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            About
          </h1>
          <p className="text-xl text-muted-foreground">
            학습과 성장을 기록하는 공간
          </p>
        </div>

        <Separator className="mb-12" />

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">안녕하세요!</CardTitle>
            <CardDescription>editop의 스터디 블로그입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              이 블로그는 웹 개발과 관련된 다양한 기술을 학습하고 정리하는 공간입니다.
              배운 내용을 기록하고 공유하면서 함께 성장하고자 합니다.
            </p>
            <p>
              주로 Next.js, React, TypeScript와 같은 프론트엔드 기술을 다루며,
              필요에 따라 백엔드 및 DevOps 관련 내용도 다룰 예정입니다.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>학습 기록</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              새롭게 배운 기술과 개념을 정리하고 기록합니다.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>문제 해결</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              개발 중 만난 문제와 해결 과정을 공유합니다.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>성장 추구</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              지속적인 학습과 개선을 통해 더 나은 개발자가 되고자 합니다.
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">주요 기술 스택</CardTitle>
            <CardDescription>이 블로그에서 주로 다루는 기술들</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Frontend</h3>
                <p className="text-muted-foreground">
                  Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Tools & Others</h3>
                <p className="text-muted-foreground">
                  Git, GitHub, Vercel, VS Code
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground text-center">
            이 블로그의 모든 내용은 학습 목적으로 작성되었으며, 지속적으로 업데이트됩니다.
            <br />
            잘못된 내용이나 개선할 점이 있다면 언제든 피드백 부탁드립니다.
          </p>
        </div>
      </div>
    </div>
  );
}

