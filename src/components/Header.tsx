
import React from 'react';
import { Link } from 'react-router-dom';
import { ActivitySquare, Home, LogIn, User } from 'lucide-react';
import { Button } from './ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const Header = () => {
  const { user, signIn, signOut } = useGoogleAuth();

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
                    <span>หน้าหลัก</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {user ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center gap-2">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName || "User"} 
                          className="w-6 h-6 rounded-full" 
                        />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span>{user.displayName || user.email}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-56">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={signOut}
                        >
                          ออกจากระบบ
                        </Button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <Button 
                variant="outline" 
                onClick={signIn}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>เข้าสู่ระบบ</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
