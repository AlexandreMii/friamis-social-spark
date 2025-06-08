
import { useState } from 'react';
import StoryCard from './StoryCard';
import TrendingSection from './TrendingSection';
import StoryViewer from './StoryViewer';

const StoriesModule = () => {
  const [stories] = useState([
    {
      id: 1,
      username: '@marie_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      videoUrl: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=600&fit=crop',
      likes: 1234,
      comments: 89,
      shares: 23,
      description: 'Nouvelle danse tendance 💃 #dance #trending #friamis',
      music: 'Son original - Marie'
    },
    {
      id: 2,
      username: '@alex_comedy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      videoUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=600&fit=crop',
      likes: 856,
      comments: 42,
      shares: 15,
      description: 'Quand tu essaies de cuisiner pour la première fois 😅',
      music: 'Son trending - Comedy Gold'
    },
    {
      id: 3,
      username: '@luna_art',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      videoUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
      likes: 2156,
      comments: 156,
      shares: 78,
      description: 'Processus créatif en time-lapse ✨ #art #creation #process',
      music: 'Musique relaxante - Luna'
    }
  ]);

  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedStoryIndex(null);
  };

  const handleNextStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < stories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    }
  };

  const handlePrevStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

  if (selectedStoryIndex !== null) {
    return (
      <StoryViewer
        story={stories[selectedStoryIndex]}
        onClose={handleCloseViewer}
        onNext={handleNextStory}
        onPrev={handlePrevStory}
        canGoNext={selectedStoryIndex < stories.length - 1}
        canGoPrev={selectedStoryIndex > 0}
      />
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-background to-muted/20">
      <TrendingSection />
      
      <div className="space-y-1">
        {stories.map((story, index) => (
          <div 
            key={story.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <StoryCard 
              story={story} 
              onClick={() => handleStoryClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesModule;
