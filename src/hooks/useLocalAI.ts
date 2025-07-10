
import { useState, useCallback } from 'react';

interface AIResponse {
  text: string;
  isGenerating: boolean;
}

export const useLocalAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTask, setCurrentTask] = useState('');

  const generateText = useCallback(async (prompt: string, template?: string): Promise<string> => {
    setIsGenerating(true);
    
    const tasks = [
      'تحليل النية...',
      'بناء الهيكل...',
      'توليد المحتوى...',
      'مراجعة الأسلوب...',
      'إدراج المراجع...'
    ];

    // Simulate AI processing with realistic delays
    for (let i = 0; i < tasks.length; i++) {
      setCurrentTask(tasks[i]);
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    }

    // Generate realistic content based on template
    let generatedText = '';
    
    if (template === 'نساج الملاحم') {
      generatedText = `في زمنٍ بعيد، حيث تتلاقى الأساطير مع الواقع، كانت هناك قصة لم تُروَ بعد...

في أعماق الصحراء الممتدة، حيث تتراقص حبات الرمل مع أشعة الشمس الذهبية، وقف البطل أمام مفترق طرق القدر. كان يعلم أن كل خطوة ستحدد مسار رحلته التي بدأت منذ أشهر عديدة.

الرياح تهمس بأسرار قديمة، والنجوم تشير إلى طريق لم يسلكه أحد من قبل. هذه هي بداية ملحمة ستُحكى للأجيال القادمة...`;
    } else if (template === 'معمل العلماء') {
      generatedText = `المقدمة

يهدف هذا البحث إلى تسليط الضوء على موضوع ذي أهمية بالغة في العصر الحديث. من خلال منهجية علمية دقيقة، سنستكشف الجوانب المختلفة لهذا الموضوع.

الفصل الأول: الإطار النظري

يُعتبر الأساس النظري حجر الزاوية في أي بحث علمي رصين. لذا، سنبدأ بتحليل الأدبيات السابقة والدراسات المرجعية التي تناولت هذا الموضوع.

1.1 التعريفات الأساسية
1.2 الدراسات السابقة
1.3 الثغرات في المعرفة الحالية`;
    } else {
      generatedText = `مرحباً بك في عالم الكتابة الإبداعية!

هذا هو بداية رحلتك الإبداعية. سنقوم معاً ببناء محتوى مميز يعكس رؤيتك وأفكارك.

${prompt}

دعنا نبدأ بتطوير هذه الفكرة وتحويلها إلى نص متماسك ومؤثر...`;
    }

    setIsGenerating(false);
    setCurrentTask('');
    return generatedText;
  }, []);

  const analyzeIntent = useCallback(async (input: string) => {
    setCurrentTask('تحليل النية...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple intent detection
    if (input.includes('رواية') || input.includes('قصة') || input.includes('ملحمة')) {
      return 'creative_writing';
    } else if (input.includes('بحث') || input.includes('دراسة') || input.includes('علمي')) {
      return 'academic';
    } else if (input.includes('أطفال') || input.includes('حكاية')) {
      return 'children';
    }
    return 'general';
  }, []);

  return {
    generateText,
    analyzeIntent,
    isGenerating,
    currentTask
  };
};
