
import { useState } from 'react';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {
  const [selectedOption, setSelectedOption] = useState<'story' | 'message' | null>(null);

  if (!isOpen) return null;

  const createOptions = [
    {
      id: 'story' as const,
      title: 'Nouvelle Story',
      description: 'Créer une vidéo courte publique',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'gradient-friamis'
    },
    {
      id: 'message' as const,
      title: 'Message Snap',
      description: 'Envoyer un message éphémère',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'gradient-friamis-orange'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-background rounded-t-3xl p-6 animate-slide-up">
        {/* Handle */}
        <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6"></div>
        
        <h2 className="text-xl font-bold text-center mb-6">Créer du contenu</h2>
        
        <div className="space-y-4">
          {createOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-4 rounded-2xl transition-all duration-200 animate-fade-in hover:scale-105 ${
                selectedOption === option.id 
                  ? 'ring-2 ring-friamis-purple scale-105' 
                  : 'hover:bg-muted/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${option.gradient} text-white`}>
                  {option.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Actions rapides</h3>
          <div className="flex justify-around">
            <button className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-muted rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs">Galerie</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-muted rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs">Live</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-muted rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <span className="text-xs">Audio</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        {selectedOption && (
          <div className="mt-6 flex space-x-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 border border-border rounded-full text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={() => {
                console.log('Creating:', selectedOption);
                onClose();
              }}
              className="flex-1 py-3 gradient-friamis text-white rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateModal;
