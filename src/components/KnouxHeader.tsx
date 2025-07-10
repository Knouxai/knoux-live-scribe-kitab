
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  User, 
  Bell, 
  Save, 
  Share2,
  Crown,
  Zap
} from 'lucide-react';

interface KnouxHeaderProps {
  projectName?: string;
  isLive?: boolean;
  hasUnsavedChanges?: boolean;
}

export const KnouxHeader = ({ projectName, isLive, hasUnsavedChanges }: KnouxHeaderProps) => {
  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-arabic bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                KNOUX
              </h1>
              <div className="text-xs text-gray-400">Kitāb al-Mubīn</div>
            </div>
          </div>
          
          {projectName && (
            <>
              <div className="w-px h-8 bg-gray-700" />
              <div className="flex items-center gap-2">
                <span className="text-white font-arabic">{projectName}</span>
                {hasUnsavedChanges && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isLive && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white gap-2 border-0 animate-pulse">
              <Zap className="w-3 h-3" />
              مباشر
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 gap-2">
            <Save className="w-4 h-4" />
            حفظ
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
            <Share2 className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
            <Settings className="w-4 h-4" />
          </Button>
          
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};
