import { useState, useEffect } from 'react';
import { KnouxHeader } from '@/components/KnouxHeader';
import { TemplateSelector } from '@/components/TemplateSelector';
import { LiveEditor } from '@/components/LiveEditor';
import { LivePreview } from '@/components/LivePreview';
import { StatusBar } from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Sparkles, 
  Crown, 
  PlayCircle,
  Users,
  Globe,
  Star
} from 'lucide-react';
import heroImage from '@/assets/knoux-hero-banner.jpg';
import libraryImage from '@/assets/islamic-library-3d.jpg';
import broadcastImage from '@/assets/live-broadcast-bg.jpg';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [content, setContent] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  // محاكاة AI للمرحلة الأولى
  useEffect(() => {
    if (isLive && content.length > 0) {
      const tasks = [
        'تحليل النية...',
        'بناء الهيكل...',
        'توليد المحتوى...',
        'مراجعة الأسلوب...',
        'إدراج المراجع...'
      ];
      
      let taskIndex = 0;
      const interval = setInterval(() => {
        setCurrentTask(tasks[taskIndex]);
        taskIndex = (taskIndex + 1) % tasks.length;
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLive, content]);

  const wordCount = content.split(' ').filter(word => word.length > 0).length;
  const characterCount = content.length;
  const estimatedReadingTime = Math.ceil(wordCount / 200);

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <KnouxHeader />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="islamic-pattern absolute inset-0" />
          <div className="relative container mx-auto px-6 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <Badge className="sacred-gradient text-white px-4 py-2 text-sm gap-2">
                  <Crown className="w-4 h-4" />
                  الإصدار المميز
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold font-arabic mb-6">
                <span className="text-gradient-sacred">KNOUX</span><br />
                <span className="text-gradient-golden">Kitāb al-Mubīn</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-arabic mb-8 leading-relaxed">
                حيث الكلمة تُبَثّ على الهواء مباشرةً، والكتاب ينبض بالحياة، والمعرفة تجد موطنها
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="sacred-gradient text-white px-8 py-4 text-lg gap-3 shadow-sacred"
                  onClick={() => setShowWelcome(false)}
                >
                  <PlayCircle className="w-6 h-6" />
                  ابدأ التأليف الآن
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-lg gap-3 border-2"
                >
                  <BookOpen className="w-6 h-6" />
                  استكشف القوالب
                </Button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card className="p-6 shadow-wisdom transition-all hover:shadow-sacred">
                  <div className="w-12 h-12 sacred-gradient rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold font-arabic text-lg mb-2">ذكاء اصطناعي محلي</h3>
                  <p className="text-muted-foreground font-arabic text-sm">
                    نماذج ذكية تعمل على جهازك مباشرة للحفاظ على خصوصية المحتوى
                  </p>
                </Card>
                
                <Card className="p-6 shadow-wisdom transition-all hover:shadow-golden relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-5 bg-cover bg-center"
                    style={{ backgroundImage: `url(${libraryImage})` }}
                  />
                  <div className="relative">
                    <div className="w-12 h-12 golden-gradient rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold font-arabic text-lg mb-2">مكتبة تراثية ثلاثية الأبعاد</h3>
                    <p className="text-muted-foreground font-arabic text-sm">
                      استكشف كنوز المعرفة الإسلامية في بيئة ثلاثية الأبعاد تفاعلية
                    </p>
                  </div>
                </Card>
                
                <Card className="p-6 shadow-wisdom transition-all hover:shadow-sacred relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-5 bg-cover bg-center"
                    style={{ backgroundImage: `url(${broadcastImage})` }}
                  />
                  <div className="relative">
                    <div className="w-12 h-12 wisdom-gradient rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold font-arabic text-lg mb-2">بث حي للكتابة</h3>
                    <p className="text-muted-foreground font-arabic text-sm">
                      شاهد كتابك يتشكل أمام عينيك لحظة بلحظة مع معاينة مباشرة
                    </p>
                  </div>
                </Card>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">٧+</div>
                  <div className="text-sm text-muted-foreground font-arabic">أقسام متخصصة</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">٧٠+</div>
                  <div className="text-sm text-muted-foreground font-arabic">قالب جاهز</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sacred">١٠٠٪</div>
                  <div className="text-sm text-muted-foreground font-arabic">محلي وآمن</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-background">
        <KnouxHeader />
        <TemplateSelector 
          onSelectTemplate={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <KnouxHeader 
        projectName={selectedTemplate.name}
        isLive={isLive}
        hasUnsavedChanges={content.length > 0}
      />
      
      <div className="flex-1 flex">
        {/* Editor Panel */}
        <div className="w-1/2 border-r border-border">
          <LiveEditor
            content={content}
            onContentChange={setContent}
            isLive={isLive}
            onToggleLive={() => setIsLive(!isLive)}
          />
        </div>
        
        {/* Preview Panel */}
        <div className="w-1/2">
          <LivePreview
            content={content}
            isLive={isLive}
            bookTitle={selectedTemplate.name}
            author="المؤلف"
          />
        </div>
      </div>
      
      <StatusBar
        wordCount={wordCount}
        characterCount={characterCount}
        estimatedReadingTime={estimatedReadingTime}
        isLive={isLive}
        currentTask={currentTask}
      />
    </div>
  );
};

export default Index;
