
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  PlayCircle,
  ArrowRight,
  Brain,
  Globe,
  Zap,
  Shield
} from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10" />
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 text-sm gap-2 border-0">
                <Crown className="w-4 h-4" />
                الإصدار المتقدم
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold font-arabic mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                KNOUX
              </span>
              <br />
              <span className="text-white text-4xl md:text-5xl">
                Kitāb al-Mubīn
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-arabic mb-12 leading-relaxed max-w-3xl mx-auto">
              منصة الذكاء الاصطناعي المتقدمة للتأليف والإبداع
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg gap-3 border-0 shadow-2xl"
                onClick={onStart}
              >
                <PlayCircle className="w-6 h-6" />
                ابدأ الآن
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card className="bg-gray-800/50 border-gray-700 p-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold font-arabic text-xl mb-4 text-white">ذكاء اصطناعي محلي</h3>
                <p className="text-gray-400 font-arabic text-sm leading-relaxed">
                  تقنيات متقدمة تعمل على جهازك مباشرة مع حماية كاملة للخصوصية
                </p>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700 p-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold font-arabic text-xl mb-4 text-white">مكتبة تراثية تفاعلية</h3>
                <p className="text-gray-400 font-arabic text-sm leading-relaxed">
                  استكشف المعرفة الإسلامية في بيئة ثلاثية الأبعاد متطورة
                </p>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700 p-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold font-arabic text-xl mb-4 text-white">بث حي متقدم</h3>
                <p className="text-gray-400 font-arabic text-sm leading-relaxed">
                  شاهد أفكارك تتحول إلى كتاب منسق أمام عينيك مباشرة
                </p>
              </Card>
            </div>

            <div className="flex justify-center gap-12 text-center">
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">٧+</div>
                <div className="text-sm text-gray-400 font-arabic mt-2">أقسام متخصصة</div>
              </div>
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">٧٠+</div>
                <div className="text-sm text-gray-400 font-arabic mt-2">قالب احترافي</div>
              </div>
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">١٠٠٪</div>
                <div className="text-sm text-gray-400 font-arabic mt-2">محلي وآمن</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
