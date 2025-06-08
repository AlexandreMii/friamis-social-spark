
import { useState } from 'react';

const SubscriptionsSection = () => {
  const [subscriptions] = useState([
    {
      id: 1,
      username: '@marie_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      hasNewStory: true,
    },
    {
      id: 2,
      username: '@alex_comedy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      hasNewStory: true,
    },
    {
      id: 3,
      username: '@luna_art',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      hasNewStory: false,
    },
    {
      id: 4,
      username: '@cooking_master',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      hasNewStory: true,
    },
    {
      id: 5,
      username: '@travel_vibes',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      hasNewStory: false,
    },
  ]);

  return (
    <div className="px-4 py-3 bg-background/80 backdrop-blur-sm border-b border-border/30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Abonnements</h3>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Voir tout
        </button>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="flex-shrink-0 flex flex-col items-center space-y-1">
            <div className="relative">
              <div className={`w-14 h-14 rounded-full p-0.5 ${sub.hasNewStory ? 'gradient-friamis' : 'bg-border'}`}>
                <img 
                  src={sub.avatar} 
                  alt={sub.username}
                  className="w-full h-full rounded-full object-cover border-2 border-background"
                />
              </div>
              {sub.hasNewStory && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-friamis-pink rounded-full border-2 border-background flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <span className="text-xs text-center text-muted-foreground max-w-[60px] truncate">
              {sub.username.replace('@', '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsSection;
