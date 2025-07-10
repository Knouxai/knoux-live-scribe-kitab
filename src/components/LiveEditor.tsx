import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Play, Square, Eye, Sparkles } from 'lucide-react';

interface LiveEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  isLive: boolean;
  onToggleLive: () => void;
}

export const LiveEditor = ({ content, onContentChange, isLive, onToggleLive }: LiveEditorProps) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.height = 'auto';
      editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-live-primary animate-live-pulse' : 'bg-muted'}`} />
            <span className="text-sm font-medium font-arabic">
              {isLive ? 'البث مباشر' : 'غير مفعل'}
            </span>
          </div>
          {isLive && (
            <div className="text-xs text-muted-foreground px-2 py-1 bg-live-primary/10 rounded-full">
              جاري التأليف...
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
            className={`gap-2 ${isRecording ? 'bg-live-primary/20 border-live-primary' : ''}`}
          >
            <Mic className="w-4 h-4" />
            {isRecording ? 'إيقاف' : 'إملاء'}
          </Button>
          
          <Button
            onClick={onToggleLive}
            size="sm"
            variant={isLive ? "destructive" : "default"}
            className={`gap-2 ${isLive ? 'bg-live-primary hover:bg-live-primary/90' : 'sacred-gradient'}`}
          >
            {isLive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isLive ? 'إيقاف البث' : 'بدء البث'}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className={`flex-1 relative ${isLive ? 'live-broadcast-border' : ''}`}>
        <textarea
          ref={editorRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className={`w-full h-full p-6 bg-transparent border-0 outline-none resize-none 
            font-arabic text-lg leading-relaxed
            placeholder:text-muted-foreground/60
            ${isLive ? 'text-primary' : 'text-foreground'}
          `}
          style={{ direction: 'rtl' }}
          placeholder="ابدأ الكتابة هنا... سيظهر النص في نافذة المعاينة مباشرة"
        />
        
        {isLive && (
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full shadow-sacred">
              <Sparkles className="w-4 h-4 text-live-primary" />
              <span className="text-sm font-medium text-live-primary">AI يعمل...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};