
import { useState } from 'react';

const ProfileModule = () => {
  const [userStats] = useState({
    followers: 1234,
    following: 567,
    likes: 8901,
    videos: 42
  });

  const [userVideos] = useState([
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=200&h=300&fit=crop',
      views: '12.5K',
      likes: 234
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=300&fit=crop',
      views: '8.9K',
      likes: 156
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=300&fit=crop',
      views: '15.2K',
      likes: 445
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=300&fit=crop',
      views: '6.7K',
      likes: 89
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=200&h=300&fit=crop',
      views: '22.1K',
      likes: 678
    },
    {
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=300&fit=crop',
      views: '4.3K',
      likes: 234
    }
  ]);

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-32 gradient-friamis"></div>
        
        {/* Profile Info */}
        <div className="px-4 pb-6">
          <div className="flex items-end justify-between -mt-16 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
              alt="Mon profil"
              className="w-24 h-24 rounded-full border-4 border-background"
            />
            <button className="mb-2 px-6 py-2 gradient-friamis text-white rounded-full text-sm font-medium hover:scale-105 transition-transform">
              Modifier
            </button>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-xl font-bold">@ton_username</h1>
            <p className="text-muted-foreground">
              Créateur de contenu 🎨 | Danse & Lifestyle ✨ | Friamis depuis 2025 🚀
            </p>
            
            {/* Stats */}
            <div className="flex items-center space-x-6 pt-3">
              <div className="text-center">
                <p className="font-bold text-lg">{userStats.followers.toLocaleString()}</p>
                <p className="text-muted-foreground text-xs">Abonnés</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{userStats.following.toLocaleString()}</p>
                <p className="text-muted-foreground text-xs">Abonnements</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{userStats.likes.toLocaleString()}</p>
                <p className="text-muted-foreground text-xs">J'aime</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{userStats.videos}</p>
                <p className="text-muted-foreground text-xs">Vidéos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border/50">
        <div className="flex">
          <button className="flex-1 py-3 text-sm font-medium text-friamis-purple border-b-2 border-friamis-purple">
            Vidéos
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-muted-foreground">
            Favoris
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-muted-foreground">
            Privé
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-1">
          {userVideos.map((video, index) => (
            <div 
              key={video.id}
              className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden animate-fade-in cursor-pointer hover:scale-105 transition-transform"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img 
                src={video.thumbnail} 
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Stats */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 12C1 12 5 4 12 4S23 12 23 12 19 20 12 20 1 12 1 12Z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>{video.likes}</span>
                  </div>
                </div>
              </div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-80">
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileModule;
