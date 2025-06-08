
import { useState } from 'react';

interface EditProfileProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditProfile = ({ onClose, onSave }: EditProfileProps) => {
  const [formData, setFormData] = useState({
    username: '@ton_username',
    bio: 'Créateur de contenu 🎨 | Danse & Lifestyle ✨ | Friamis depuis 2025 🚀',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    website: '',
    isPrivate: false
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-background rounded-2xl p-6 m-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Modifier le profil</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src={formData.avatar} 
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
              <label className="absolute -bottom-2 -right-2 p-2 bg-friamis-purple text-white rounded-full cursor-pointer hover:scale-105 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden" 
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Changer la photo</p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">Nom d'utilisateur</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-friamis-purple/20"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-friamis-purple/20 resize-none"
              placeholder="Parlez-nous de vous..."
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-2">Site web</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-friamis-purple/20"
            />
          </div>

          {/* Privacy */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Compte privé</p>
              <p className="text-sm text-muted-foreground">Seuls vos abonnés peuvent voir vos vidéos</p>
            </div>
            <button
              onClick={() => setFormData(prev => ({ ...prev, isPrivate: !prev.isPrivate }))}
              className={`w-12 h-6 rounded-full transition-colors ${
                formData.isPrivate ? 'bg-friamis-purple' : 'bg-border'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                formData.isPrivate ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 py-3 border border-border rounded-full text-sm font-medium hover:bg-muted/50 transition-colors"
          >
            Annuler
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-3 gradient-friamis text-white rounded-full text-sm font-medium hover:scale-105 transition-transform"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
