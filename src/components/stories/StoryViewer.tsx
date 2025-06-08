
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Story {
  id: number;
  username: string;
  avatar: string;
  videoUrl: string;
  likes: number;
  comments: number;
  shares: number;
  description: string;
  music: string;
}

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

const StoryViewer = ({ story, onClose, onNext, onPrev, canGoNext, canGoPrev }: StoryViewerProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(story.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: '@user1', text: 'Trop bien ! 😍', time: '2min' },
    { id: 2, user: '@user2', text: 'Comment tu fais ça ?', time: '5min' }
  ]);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    }
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleDislike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    }
    setIsDisliked(!isDisliked);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments(prev => [
        { id: Date.now(), user: '@toi', text: comment, time: 'maintenant' },
        ...prev
      ]);
      setComment('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && canGoNext) onNext();
      if (e.key === 'ArrowLeft' && canGoPrev) onPrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoNext, canGoPrev, onNext, onPrev, onClose]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex">
      {/* Story Content */}
      <div className="relative flex-1">
        <img 
          src={story.videoUrl} 
          alt="Story content"
          className="w-full h-full object-cover"
        />
        
        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4">
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Arrows */}
        {canGoPrev && (
          <button 
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {canGoNext && (
          <button 
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* User Info & Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="flex items-end justify-between">
            <div className="flex-1 mr-4">
              <div className="flex items-center space-x-3 mb-2">
                <img 
                  src={story.avatar} 
                  alt={story.username}
                  className="w-10 h-10 rounded-full border-2 border-white/30"
                />
                <div>
                  <p className="font-semibold text-sm">{story.username}</p>
                  <p className="text-xs text-white/80">{story.music}</p>
                </div>
                <button className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
                  Suivre
                </button>
              </div>
              <p className="text-sm mb-2">{story.description}</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <button 
                onClick={handleLike}
                className={cn(
                  "p-3 rounded-full transition-all duration-200",
                  isLiked 
                    ? "bg-friamis-pink text-white scale-110" 
                    : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                )}
              >
                <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <span className="text-xs font-medium">{likesCount.toLocaleString()}</span>

              <button 
                onClick={handleDislike}
                className={cn(
                  "p-3 rounded-full transition-all duration-200",
                  isDisliked 
                    ? "bg-red-500 text-white scale-110" 
                    : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                )}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button 
                onClick={() => setShowComments(!showComments)}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <span className="text-xs font-medium">{story.comments}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Panel */}
      {showComments && (
        <div className="w-80 bg-background border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Commentaires</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ajouter un commentaire..."
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-friamis-purple/20"
              />
              <button
                onClick={handleAddComment}
                className="p-2 gradient-friamis text-white rounded-full hover:scale-105 transition-transform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;
