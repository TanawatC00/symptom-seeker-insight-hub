
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ActivitySquare, Home, LogIn, LogOut, User, MessageCircle, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import AuthModal from './AuthModal';

const Header = () => {
  const { user, signOut } = useGoogleAuth();
  const { t } = useLanguage();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Get first letter of display name for avatar fallback
  const getInitials = () => {
    if (!user?.displayName) return 'U';
    return user.displayName.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ActivitySquare className="h-8 w-8 text-medical-blue" />
            <span className="font-bold text-xl text-medical-dark">SymptomSeeker</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-medical-blue transition-colors">
                    <Home className="h-4 w-4" />
                    <span>{t('header.home')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chatbot" className="flex items-center gap-1 text-gray-600 hover:text-medical-blue transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{t('header.chatbot')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/maps" className="flex items-center gap-1 text-gray-600 hover:text-medical-blue transition-colors">
                    <MapPin className="h-4 w-4" />
                    <span>{t('header.maps')}</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <LanguageToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      {user.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                      ) : (
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user.displayName || user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-red-500 focus:text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('header.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                onClick={openAuthModal}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>{t('header.login')}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
};

export default Header;
