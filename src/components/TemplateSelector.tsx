import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Baby, 
  User, 
  Brain, 
  Palette, 
  Globe, 
  Zap,
  Star,
  Crown,
  Sparkles 
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
  gradient: string;
  features: string[];
  premium?: boolean;
}

const templates: Template[] = [
  {
    id: 'legacy-memoir',
    name: 'المذكرات الزمنية',
    description: 'اكتب سيرتك الذاتية بأسلوب زمني مؤثر',
    category: 'Knoux-LegacyForge',
    icon: User,
    gradient: 'wisdom-gradient',
    features: ['أسئلة موجهة', 'خط زمني تفاعلي', 'صور تراثية']
  },
  {
    id: 'sacred-tafsir',
    name: 'التفسير المبسط',
    description: 'اكتب تفسيراً مبسطاً للآيات القرآنية',
    category: 'Knoux-SacredScript',
    icon: BookOpen,
    gradient: 'sacred-gradient',
    features: ['مراجع تراثية', 'تدقيق شرعي', 'فهرسة آلية'],
    premium: true
  },
  {
    id: 'epic-fantasy',
    name: 'الملحمة الخيالية',
    description: 'اكتب رواية خيالية بعوالم ساحرة',
    category: 'Knoux-EpicWeaver',
    icon: Crown,
    gradient: 'golden-gradient',
    features: ['بناء الشخصيات', 'خرائط العوالم', 'مولد الأحداث']
  },
  {
    id: 'kids-adventure',
    name: 'مغامرة الأطفال',
    description: 'قصص أطفال تفاعلية مع رسوم ملونة',
    category: 'Knoux-KidLitCraft',
    icon: Baby,
    gradient: 'bg-gradient-to-br from-pink-400 to-purple-500',
    features: ['رسوم تلقائية', 'قوافي ذكية', 'أصوات تفاعلية']
  },
  {
    id: 'research-academic',
    name: 'البحث الأكاديمي',
    description: 'اكتب بحثك العلمي بمنهجية صحيحة',
    category: 'Knoux-ScholarForge',
    icon: GraduationCap,
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    features: ['مراجع آلية', 'فهرسة علمية', 'إحصائيات ذكية']
  },
  {
    id: 'transformation-guide',
    name: 'دليل التحول الشخصي',
    description: 'اكتب دليلاً عملياً للتطوير الذاتي',
    category: 'Knoux-TransformationLab',
    icon: Zap,
    gradient: 'bg-gradient-to-br from-green-500 to-teal-600',
    features: ['خطط عملية', 'تمارين تفاعلية', 'متابعة التقدم']
  }
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  selectedTemplate?: Template;
}

export const TemplateSelector = ({ onSelectTemplate, selectedTemplate }: TemplateSelectorProps) => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const getGradientClass = (gradient: string) => {
    if (gradient.includes('gradient')) return gradient;
    return `bg-gradient-to-br ${gradient}`;
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-arabic text-gradient-sacred mb-2">
          اختر قالب الكتابة
        </h2>
        <p className="text-muted-foreground font-arabic">
          كل قالب مصمم خصيصاً لنوع معين من الكتب مع ذكاء اصطناعي متخصص
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const IconComponent = template.icon;
          const isSelected = selectedTemplate?.id === template.id;
          const isHovered = hoveredTemplate === template.id;
          
          return (
            <Card
              key={template.id}
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer
                ${isSelected ? 'ring-2 ring-primary shadow-sacred' : 'hover:shadow-golden'}
                ${isHovered ? 'scale-105' : ''}
              `}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => onSelectTemplate(template)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 opacity-10 ${getGradientClass(template.gradient)}`} />
              
              {/* Premium Badge */}
              {template.premium && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-accent text-accent-foreground gap-1">
                    <Crown className="w-3 h-3" />
                    مميز
                  </Badge>
                </div>
              )}

              <div className="relative p-6">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${template.gradient} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold font-arabic text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground font-arabic">{template.description}</p>
                  </div>

                  {/* Category */}
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">المميزات:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selection Button */}
                <Button 
                  className={`w-full mt-4 ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : `${template.gradient} text-white hover:opacity-90`
                  }`}
                  variant={isSelected ? "default" : "outline"}
                >
                  {isSelected ? (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      محدد
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      اختيار
                    </div>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};