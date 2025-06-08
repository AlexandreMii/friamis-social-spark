
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps {
  activeTab: 'stories' | 'messages' | 'profile';
  onTabChange: (tab: 'stories' | 'messages' | 'profile') => void;
}

const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const { signOut } = useAuth();
  
  const tabs = [
    {
      id: 'stories' as const,
      label: 'Stories',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H19V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
        </svg>
      )
    },
    {
      id: 'messages' as const,
      label: 'Messages',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'profile' as const,
      label: 'Profil',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
                activeTab === tab.id
                  ? "text-friamis-purple scale-105"
                  : "text-muted-foreground hover:text-foreground hover:scale-102"
              )}
            >
              <div className={cn(
                "transition-all duration-200",
                activeTab === tab.id && "animate-bounce-gentle"
              )}>
                {tab.icon}
              </div>
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 bg-friamis-purple rounded-full mt-1 animate-pulse" />
              )}
            </button>
          ))}
          
          {/* Bouton de déconnexion */}
          <button
            onClick={signOut}
            className="flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 text-muted-foreground hover:text-red-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-xs mt-1 font-medium">Sortir</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
