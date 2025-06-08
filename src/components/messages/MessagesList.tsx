
import { useState } from 'react';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isOnline: boolean;
}

interface MessagesListProps {
  onSelectChat: (chatId: number) => void;
}

const MessagesList = ({ onSelectChat }: MessagesListProps) => {
  const [chats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      lastMessage: 'Hey! Tu as vu ma nouvelle story? 😍',
      timestamp: '2 min',
      unread: true,
      isOnline: true
    },
    {
      id: 2,
      name: 'Alex Martin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      lastMessage: 'Photo • Disparaîtra dans 5 min',
      timestamp: '15 min',
      unread: true,
      isOnline: false
    },
    {
      id: 3,
      name: 'Luna Creative',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      lastMessage: 'Merci pour les likes! ❤️',
      timestamp: '1h',
      unread: false,
      isOnline: true
    },
    {
      id: 4,
      name: 'Groupe Amis',
      avatar: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=100&h=100&fit=crop&crop=face',
      lastMessage: 'Marie: On se fait un live ce soir?',
      timestamp: '3h',
      unread: false,
      isOnline: false
    }
  ]);

  return (
    <div className="h-full bg-background">
      {/* Search Bar */}
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Rechercher une conversation..."
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-friamis-purple/20"
          />
        </div>
      </div>

      {/* Stories Bar */}
      <div className="p-4 border-b border-border/50">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Statuts récents</h3>
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {/* Add Story */}
          <div className="flex-shrink-0 text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-friamis flex items-center justify-center mb-1">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground">Ajouter</p>
          </div>
          
          {/* Friends Stories */}
          {chats.slice(0, 4).map((chat) => (
            <div key={`story-${chat.id}`} className="flex-shrink-0 text-center">
              <div className="relative">
                <img 
                  src={chat.avatar} 
                  alt={chat.name}
                  className="w-14 h-14 rounded-full border-2 border-friamis-purple"
                />
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate w-16">{chat.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, index) => (
          <div 
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="flex items-center p-4 hover:bg-muted/30 transition-colors cursor-pointer border-b border-border/20 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="relative">
              <img 
                src={chat.avatar} 
                alt={chat.name}
                className="w-12 h-12 rounded-full"
              />
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>
            
            <div className="flex-1 ml-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-foreground">{chat.name}</h4>
                <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
              </div>
              <p className={`text-sm mt-1 truncate ${chat.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {chat.lastMessage}
              </p>
            </div>
            
            {chat.unread && (
              <div className="w-2 h-2 bg-friamis-purple rounded-full ml-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
