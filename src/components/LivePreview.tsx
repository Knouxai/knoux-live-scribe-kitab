import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, FileText, Maximize } from 'lucide-react';

interface LivePreviewProps {
  content: string;
  isLive: boolean;
  bookTitle?: string;
  author?: string;
}

export const LivePreview = ({ content, isLive, bookTitle = "كتاب جديد", author = "المؤلف" }: LivePreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current && isLive) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  }, [content, isLive]);

  const formatContent = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      return (
        <p key={index} className="mb-4 text-justify leading-relaxed">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-primary" />
          <span className="font-medium font-arabic">المعاينة المباشرة</span>
          {isLive && (
            <div className="w-2 h-2 bg-live-primary rounded-full animate-live-pulse" />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Maximize className="w-4 h-4" />
            ملء الشاشة
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div 
        ref={previewRef}
        className={`flex-1 overflow-auto bg-white ${isLive ? 'animate-pulse' : ''}`}
        style={{ direction: 'rtl' }}
      >
        {/* Book Page Simulation */}
        <div className="max-w-2xl mx-auto bg-white shadow-wisdom min-h-full">
          {/* Page Header */}
          <div className="px-12 pt-16 pb-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold font-arabic-serif text-primary mb-4">
                {bookTitle}
              </h1>
              <div className="w-24 h-0.5 bg-accent mx-auto mb-4"></div>
              <p className="text-muted-foreground font-arabic">{author}</p>
            </div>
          </div>

          {/* Page Content */}
          <div className="px-12 pb-16">
            <div className="font-arabic text-base leading-loose text-gray-800">
              {content ? (
                <div className={isLive ? 'transition-all duration-300' : ''}>
                  {formatContent(content)}
                  {isLive && (
                    <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground/60 py-16">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>ابدأ الكتابة لرؤية المعاينة المباشرة</p>
                </div>
              )}
            </div>
          </div>

          {/* Page Footer */}
          <div className="flex justify-between items-center px-12 pb-8 text-sm text-muted-foreground">
            <span>{bookTitle}</span>
            <span>صفحة ١</span>
          </div>
        </div>
      </div>
    </div>
  );
};