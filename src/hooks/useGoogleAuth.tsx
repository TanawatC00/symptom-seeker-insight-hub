
import { useState, useEffect, createContext, useContext } from 'react';

// Define the user type
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Create the auth context
interface AuthContextType {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock authentication for demonstration
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('symptomseeker-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Sign in with Google
  const signIn = async () => {
    try {
      // This is a mock implementation
      // In a real app, you would use a library like Firebase
      const mockUser: User = {
        uid: 'mock-uid-' + Math.random().toString(36).substring(2, 9),
        email: 'user@example.com',
        displayName: 'ผู้ใช้ทดสอบ',
        photoURL: null
      };

      setUser(mockUser);
      localStorage.setItem('symptomseeker-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Sign out
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('symptomseeker-user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useGoogleAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useGoogleAuth must be used within an AuthProvider');
  }
  return context;
};
