import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  FileText, 
  Target, 
  Zap, 
  Heart, 
  Sparkles,
  Activity,
  TrendingUp 
} from 'lucide-react';

interface StatusBarProps {
  wordCount: number;
  characterCount: number;
  estimatedReadingTime: number;
  isLive: boolean;
  currentTask?: string;
}

export const StatusBar = ({ 
  wordCount, 
  characterCount, 
  estimatedReadingTime, 
  isLive, 
  currentTask 
}: StatusBarProps) => {
  const [islamicReminder, setIslamicReminder] = useState('');
  
  const islamicReminders = [
    'سبحان الله وبحمده',
    'الحمد لله رب العالمين', 
    'لا إله إلا الله',
    'الله أكبر',
    'استغفر الله العظيم',
    'سبحان الله العظيم',
    'لا حول ولا قوة إلا بالله'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * islamicReminders.length);
      setIslamicReminder(islamicReminders[randomIndex]);
    }, 30000); // كل 30 ثانية

    return () => clearInterval(interval);
  }, []);

  const formatArabicNumber = (num: number) => {
    const arabicNumerals = '٠١٢٣٤٥٦٧٨٩';
    return num.toString().replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
  };

  return (
    <div className="h-12 border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Side - Statistics */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-arabic">
              {formatArabicNumber(wordCount)} كلمة
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="font-arabic">
              {formatArabicNumber(characterCount)} حرف
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-arabic">
              {formatArabicNumber(estimatedReadingTime)} دقيقة قراءة
            </span>
          </div>
          
          {isLive && (
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-live-primary animate-pulse" />
              <span className="text-live-primary font-arabic">
                معدل: {formatArabicNumber(12)} كلمة/دقيقة
              </span>
            </div>
          )}
        </div>

        {/* Center - Current Task */}
        <div className="flex items-center gap-3">
          {currentTask && isLive && (
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <Zap className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary font-arabic">
                {currentTask}
              </span>
            </div>
          )}
          
          {islamicReminder && (
            <div className="flex items-center gap-2 px-3 py-1 bg-sacred/10 rounded-full">
              <Heart className="w-3 h-3 text-sacred" />
              <span className="text-xs text-sacred font-arabic">
                {islamicReminder}
              </span>
            </div>
          )}
        </div>

        {/* Right Side - AI Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-muted-foreground font-arabic">AI محلي متصل</span>
          </div>
          
          {isLive && (
            <Badge variant="outline" className="gap-1">
              <Sparkles className="w-3 h-3" />
              <span className="font-arabic">ذكاء فائق</span>
            </Badge>
          )}
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            <span className="font-arabic">٩٨٪ كفاءة</span>
          </div>
        </div>
      </div>
    </div>
  );
};