
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Sparkles, 
  Crown, 
  Globe,
  Palette,
  Brain
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  gradient: string;
  isNew?: boolean;
  isPremium?: boolean;
  prompts: string[];
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  selectedTemplate: Template | null;
}

const templates: Template[] = [
  {
    id: 'epic-weaver',
    name: 'نساج الملاحم',
    description: 'لكتابة الروايات والقصص الملحمية',
    icon: BookOpen,
    category: 'إبداعي',
    gradient: 'from-purple-500 to-pink-500',
    isNew: true,
    prompts: [
      'اكتب بداية ملحمية مشوقة',
      'طور الشخصيات الرئيسية',
      'أنشئ صراعاً درامياً'
    ]
  },
  {
    id: 'scholar-forge',
    name: 'معمل العلماء',
    description: 'للبحوث والكتب الأكاديمية',
    icon: GraduationCap,
    category: 'أكاديمي',
    gradient: 'from-blue-500 to-cyan-500',
    prompts: [
      'ابدأ بمقدمة أكاديمية قوية',
      'اكتب مراجعة الأدبيات',
      'حلل البيانات والنتائج'
    ]
  },
  {
    id: 'sacred-script',
    name: 'المخطوط المقدس',
    description: 'للكتب الدينية والروحانية',
    icon: Heart,
    category: 'ديني',
    gradient: 'from-green-500 to-emerald-500',
    isPremium: true,
    prompts: [
      'اكتب مقدمة روحانية',
      'استشهد بالآيات والأحاديث',
      'اربط بين النصوص والحياة العملية'
    ]
  },
  {
    id: 'wonder-land',
    name: 'أرض العجائب',
    description: 'لقصص وكتب الأطفال',
    icon: Sparkles,
    category: 'أطفال',
    gradient: 'from-orange-500 to-red-500',
    prompts: [
      'ابدأ بـ "كان يا ما كان"',
      'أنشئ شخصيات محببة للأطفال',
      'اكتب نهاية سعيدة ومفيدة'
    ]
  },
  {
    id: 'legacy-forge',
    name: 'صانع الإرث',
    description: 'للسير الذاتية والمذكرات',
    icon: Crown,
    category: 'شخصي',
    gradient: 'from-indigo-500 to-purple-500',
    prompts: [
      'اكتب عن ذكريات الطفولة',
      'صف التحديات والانجازات',
      'شارك الحكم والدروس المستفادة'
    ]
  },
  {
    id: 'world-builder',
    name: 'بناء العوالم',
    description: 'لبناء عوالم خيالية متكاملة',
    icon: Globe,
    category: 'خيال علمي',
    gradient: 'from-teal-500 to-blue-500',
    isNew: true,
    prompts: [
      'صمم عالماً جديداً',
      'أنشئ نظاماً سياسياً واجتماعياً',
      'طور التقنيات والثقافات'
    ]
  }
];

export const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const handleTemplateSelect = (template: Template) => {
    onSelectTemplate(template);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-arabic mb-4 text-white">
          اختر قالبك الإبداعي
        </h1>
        <p className="text-xl text-gray-400 font-arabic max-w-2xl mx-auto">
          كل قالب مصمم خصيصاً بذكاء اصطناعي متقدم لنوع محدد من الكتب
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {templates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card 
              key={template.id}
              className="bg-gray-800/50 border-gray-700 p-8 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group hover:scale-105 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${template.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  {template.isNew && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs border-0">
                      جديد
                    </Badge>
                  )}
                  {template.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs border-0 gap-1">
                      <Crown className="w-3 h-3" />
                      مميز
                    </Badge>
                  )}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold font-arabic mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                {template.name}
              </h3>
              
              <p className="text-gray-400 font-arabic mb-4 leading-relaxed text-sm">
                {template.description}
              </p>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">ميزات هذا القالب:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  {template.prompts.slice(0, 2).map((prompt, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-500 rounded-full" />
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs">
                  {template.category}
                </Badge>
                
                <Button 
                  size="sm" 
                  className={`bg-gradient-to-r ${template.gradient} hover:opacity-90 text-white border-0 group-hover:scale-105 transition-all`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  اختيار
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
