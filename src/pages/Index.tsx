
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import StoriesModule from '@/components/stories/StoriesModule';
import MessagesModule from '@/components/messages/MessagesModule';
import ProfileModule from '@/components/profile/ProfileModule';
import CreateModal from '@/components/create/CreateModal';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'stories' | 'messages' | 'profile'>('stories');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'stories':
        return <StoriesModule />;
      case 'messages':
        return <MessagesModule />;
      case 'profile':
        return <ProfileModule />;
      default:
        return <StoriesModule />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="relative bg-background/95 backdrop-blur-sm border-b border-border/50 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient">Friamis</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="p-2 rounded-full gradient-friamis text-white hover:scale-105 transition-transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full">
        {renderActiveModule()}
      </main>

      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Create Modal */}
      <CreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
