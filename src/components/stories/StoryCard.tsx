
import { useState } from 'react';
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

interface StoryCardProps {
  story: Story;
  onClick?: () => void;
}

const StoryCard = ({ story, onClick }: StoryCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(story.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisliked) {
      setIsDisliked(false);
    }
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    }
    setIsDisliked(!isDisliked);
  };

  return (
    <div 
      className="relative h-screen w-full bg-black overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        <img 
          src={story.videoUrl} 
          alt="Story content"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
        {/* Top Section - User Info */}
        <div className="flex items-center justify-between pt-8">
          <div className="flex items-center space-x-3">
            <img 
              src={story.avatar} 
              alt={story.username}
              className="w-10 h-10 rounded-full border-2 border-white/30"
            />
            <div>
              <p className="font-semibold text-sm">{story.username}</p>
              <p className="text-xs text-white/80">{story.music}</p>
            </div>
          </div>
          <button className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
            Suivre
          </button>
        </div>

        {/* Bottom Section - Actions & Description */}
        <div className="flex items-end justify-between">
          {/* Description */}
          <div className="flex-1 mr-4">
            <p className="text-sm mb-2 line-clamp-3">{story.description}</p>
            <div className="flex items-center space-x-4 text-xs text-white/80">
              <span>♪ {story.music}</span>
            </div>
          </div>

          {/* Action Buttons */}
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

            <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <span className="text-xs font-medium">{story.comments}</span>

            <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
            <span className="text-xs font-medium">{story.shares}</span>
          </div>
        </div>
      </div>

      {/* Play Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
