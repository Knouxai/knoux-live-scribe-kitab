import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Settings, 
  User, 
  Bell, 
  Sparkles, 
  Moon, 
  Sun,
  Save,
  Share,
  Crown,
  Zap
} from 'lucide-react';

interface KnouxHeaderProps {
  projectName?: string;
  isLive?: boolean;
  hasUnsavedChanges?: boolean;
}

export const KnouxHeader = ({ 
  projectName = "مشروع جديد", 
  isLive = false,
  hasUnsavedChanges = false 
}: KnouxHeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-card/30 backdrop-blur-sm">
      <div className="h-full flex items-center justify-between px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sacred-gradient rounded-lg flex items-center justify-center">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-arabic text-gradient-sacred">
                KNOUX Kitāb al-Mubīn
              </h1>
              <div className="flex items-center gap-2 -mt-1">
                <Badge variant="outline" className="text-xs h-5">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <span className="text-xs text-muted-foreground">™</span>
              </div>
            </div>
          </div>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium font-arabic">{projectName}</span>
            {hasUnsavedChanges && (
              <div className="w-2 h-2 bg-accent rounded-full" />
            )}
          </div>
        </div>

        {/* Center Status */}
        <div className="flex items-center gap-4">
          {isLive && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-live-primary/10 border border-live-primary/20 rounded-full">
              <div className="w-2 h-2 bg-live-primary rounded-full animate-live-pulse" />
              <span className="text-sm font-medium text-live-primary font-arabic">
                البث المباشر نشط
              </span>
              <Zap className="w-4 h-4 text-live-primary" />
            </div>
          )}
          
          <div className="text-sm text-muted-foreground font-arabic">
            آخر حفظ: الآن
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            حفظ
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Share className="w-4 h-4" />
            مشاركة
          </Button>
          
          <div className="h-6 w-px bg-border" />
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};