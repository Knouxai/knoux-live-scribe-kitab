
import { useState, useEffect } from 'react';
import { KnouxHeader } from '@/components/KnouxHeader';
import { TemplateSelector } from '@/components/TemplateSelector';
import { LiveEditor } from '@/components/LiveEditor';
import { LivePreview } from '@/components/LivePreview';
import { StatusBar } from '@/components/StatusBar';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { useLocalAI } from '@/hooks/useLocalAI';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [content, setContent] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const { currentTask, isGenerating } = useLocalAI();

  const wordCount = content.split(' ').filter(word => word.length > 0).length;
  const characterCount = content.length;
  const estimatedReadingTime = Math.ceil(wordCount / 200);

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <KnouxHeader />
        <TemplateSelector 
          onSelectTemplate={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <KnouxHeader 
        projectName={selectedTemplate.name}
        isLive={isLive}
        hasUnsavedChanges={content.length > 0}
      />
      
      <div className="flex-1 flex">
        <div className="w-1/2 border-r border-gray-700">
          <LiveEditor
            content={content}
            onContentChange={setContent}
            isLive={isLive}
            onToggleLive={() => setIsLive(!isLive)}
            selectedTemplate={selectedTemplate.name}
          />
        </div>
        
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
