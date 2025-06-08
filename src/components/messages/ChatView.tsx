
import { useState, useRef } from 'react';

interface Message {
  id: number;
  content: string;
  sender: 'me' | 'other';
  timestamp: string;
  type: 'text' | 'image' | 'disappearing';
  isDisappearing?: boolean;
  replyTo?: {
    id: number;
    content: string;
    sender: string;
  };
}

interface ChatViewProps {
  chatId: number;
  onBack: () => void;
}

const ChatView = ({ chatId, onBack }: ChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Salut! Comment ça va?',
      sender: 'other',
      timestamp: '14:30',
      type: 'text'
    },
    {
      id: 2,
      content: 'Ça va super bien! Et toi?',
      sender: 'me',
      timestamp: '14:32',
      type: 'text'
    },
    {
      id: 3,
      content: 'Regarde cette photo!',
      sender: 'other',
      timestamp: '14:35',
      type: 'disappearing',
      isDisappearing: true
    },
    {
      id: 4,
      content: 'Elle est magnifique! 😍',
      sender: 'me',
      timestamp: '14:36',
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        content: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        replyTo: replyingTo ? {
          id: replyingTo.id,
          content: replyingTo.content,
          sender: replyingTo.sender === 'me' ? 'Vous' : 'Sarah'
        } : undefined
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setReplyingTo(null);
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const message: Message = {
        id: Date.now(),
        content: file.type.startsWith('image/') ? 'Photo envoyée' : 'Fichier envoyé',
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'image'
      };
      
      setMessages(prev => [...prev, message]);
    }
  };

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <button 
          onClick={onBack}
          className="mr-3 p-2 hover:bg-muted/50 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <img 
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" 
          alt="Sarah Johnson"
          className="w-10 h-10 rounded-full"
        />
        
        <div className="ml-3 flex-1">
          <h3 className="font-semibold text-sm">Sarah Johnson</h3>
          <p className="text-xs text-green-500">En ligne</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-muted/50 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-muted/50 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={message.id}
            className={`flex animate-fade-in ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div 
              className={`max-w-xs lg:max-w-md group relative ${
                message.sender === 'me' ? 'ml-auto' : 'mr-auto'
              }`}
              onDoubleClick={() => handleReply(message)}
            >
              {/* Reply indicator */}
              {message.replyTo && (
                <div className={`mb-1 px-3 py-1 text-xs bg-muted/50 rounded-lg border-l-2 ${
                  message.sender === 'me' ? 'border-friamis-purple' : 'border-border'
                }`}>
                  <span className="font-medium">{message.replyTo.sender}: </span>
                  <span className="opacity-70">{message.replyTo.content}</span>
                </div>
              )}
              
              <div className={`px-4 py-2 rounded-2xl ${
                message.sender === 'me' 
                  ? 'gradient-friamis text-white' 
                  : 'bg-muted text-foreground'
              } ${message.isDisappearing ? 'animate-pulse border-2 border-friamis-orange' : ''}`}>
                {message.isDisappearing && (
                  <div className="flex items-center text-xs mb-1 opacity-70">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Disparaîtra après lecture
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 opacity-70`}>
                  {message.timestamp}
                </p>
              </div>

              {/* Reply button on hover */}
              <button
                onClick={() => handleReply(message)}
                className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-background border border-border rounded-full hover:bg-muted"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply indicator */}
      {replyingTo && (
        <div className="px-4 py-2 bg-muted/30 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-friamis-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span className="text-sm text-muted-foreground">
                Répondre à: {replyingTo.content}
              </span>
            </div>
            <button 
              onClick={() => setReplyingTo(null)}
              className="p-1 hover:bg-muted rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            className="hidden"
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-friamis-purple hover:bg-friamis-purple/10 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="w-full px-4 py-2 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-friamis-purple/20"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          
          <button 
            onClick={handleSendMessage}
            className="p-2 gradient-friamis text-white rounded-full hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
