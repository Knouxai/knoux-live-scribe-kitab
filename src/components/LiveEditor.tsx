
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Play, Square, Eye, Sparkles, Zap } from 'lucide-react';

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
    <div className="h-full flex flex-col bg-gray-900">
      {/* Modern Editor Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' : 'bg-gray-600'}`} />
            <span className="text-sm font-medium font-arabic text-white">
              {isLive ? 'البث مباشر' : 'غير مفعل'}
            </span>
          </div>
          {isLive && (
            <div className="text-xs text-green-400 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
              <Zap className="w-3 h-3 inline mr-1" />
              جاري التأليف الذكي
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
            className={`gap-2 border-gray-600 text-gray-300 hover:bg-gray-800 ${isRecording ? 'bg-red-500/20 border-red-500/50 text-red-400' : ''}`}
          >
            <Mic className="w-4 h-4" />
            {isRecording ? 'إيقاف الإملاء' : 'إملاء صوتي'}
          </Button>
          
          <Button
            onClick={onToggleLive}
            size="sm"
            className={`gap-2 ${isLive ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'} text-white border-0`}
          >
            {isLive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isLive ? 'إيقاف البث' : 'بدء البث المباشر'}
          </Button>
        </div>
      </div>

      {/* Editor Content with Modern Styling */}
      <div className={`flex-1 relative ${isLive ? 'ring-2 ring-green-500/30' : ''}`}>
        <textarea
          ref={editorRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-full p-8 bg-gray-900 border-0 outline-none resize-none 
            font-arabic text-lg leading-relaxed text-white
            placeholder:text-gray-500
            selection:bg-purple-500/30
          "
          style={{ direction: 'rtl' }}
          placeholder="ابدأ الكتابة هنا... سيظهر النص في نافذة المعاينة مباشرة مع التنسيق الاحترافي"
        />
        
        {isLive && (
          <div className="absolute bottom-6 right-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <Sparkles className="w-4 h-4 text-green-400 animate-spin" />
              <span className="text-sm font-medium text-green-400">الذكاء الاصطناعي يعمل</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
