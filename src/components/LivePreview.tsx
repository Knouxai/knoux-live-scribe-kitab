
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download, FileText, Maximize } from 'lucide-react';
import { useBookExport } from '@/hooks/useBookExport';

interface LivePreviewProps {
  content: string;
  isLive: boolean;
  bookTitle?: string;
  author?: string;
}

export const LivePreview = ({ content, isLive, bookTitle = "كتاب جديد", author = "المؤلف" }: LivePreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { exportBook } = useBookExport();

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

  const handleExport = async (format: 'pdf' | 'epub' | 'docx') => {
    try {
      await exportBook({
        format,
        title: bookTitle,
        author: author,
        content: content
      });
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleFullscreen = () => {
    if (previewRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        previewRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-primary" />
          <span className="font-medium font-arabic">المعاينة المباشرة</span>
          {isLive && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleFullscreen}>
            <Maximize className="w-4 h-4" />
            ملء الشاشة
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => handleExport('pdf')}
            disabled={!content.trim()}
          >
            <Download className="w-4 h-4" />
            تصدير PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => handleExport('epub')}
            disabled={!content.trim()}
          >
            <Download className="w-4 h-4" />
            تصدير EPUB
          </Button>
        </div>
      </div>

      <div 
        ref={previewRef}
        className={`flex-1 overflow-auto bg-white ${isLive ? 'animate-pulse' : ''}`}
        style={{ direction: 'rtl' }}
      >
        <div className="max-w-2xl mx-auto bg-white shadow-lg min-h-full">
          <div className="px-12 pt-16 pb-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold font-arabic text-gray-800 mb-4">
                {bookTitle}
              </h1>
              <div className="w-24 h-0.5 bg-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-600 font-arabic">{author}</p>
            </div>
          </div>

          <div className="px-12 pb-16">
            <div className="font-arabic text-base leading-loose text-gray-800">
              {content ? (
                <div className={isLive ? 'transition-all duration-300' : ''}>
                  {formatContent(content)}
                  {isLive && (
                    <span className="inline-block w-2 h-5 bg-purple-500 animate-pulse ml-1" />
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-16">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>ابدأ الكتابة لرؤية المعاينة المباشرة</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center px-12 pb-8 text-sm text-gray-500">
            <span>{bookTitle}</span>
            <span>صفحة ١</span>
          </div>
        </div>
      </div>
    </div>
  );
};
