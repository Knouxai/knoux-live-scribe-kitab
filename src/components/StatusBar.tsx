
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Eye, Zap, Brain } from 'lucide-react';

interface StatusBarProps {
  wordCount: number;
  characterCount: number;
  estimatedReadingTime: number;
  isLive: boolean;
  currentTask: string;
}

export const StatusBar = ({ 
  wordCount, 
  characterCount, 
  estimatedReadingTime, 
  isLive, 
  currentTask 
}: StatusBarProps) => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FileText className="w-4 h-4" />
            <span>{wordCount} كلمة</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Eye className="w-4 h-4" />
            <span>{characterCount} حرف</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{estimatedReadingTime} دقيقة قراءة</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLive && currentTask && (
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-arabic">{currentTask}</span>
            </div>
          )}
          
          <Badge 
            className={`gap-2 border-0 ${
              isLive 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <Zap className="w-3 h-3" />
            {isLive ? 'متصل' : 'غير متصل'}
          </Badge>
        </div>
      </div>
    </div>
  );
};
