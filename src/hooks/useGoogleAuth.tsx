
import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'sonner';

// Define the user type
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: string;
}

// Create the auth context
interface AuthContextType {
  user: User | null;
  signIn: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user database (in a real app, this would be stored on a server)
const USERS_STORAGE_KEY = 'symptomseeker-users';
const CURRENT_USER_KEY = 'symptomseeker-user';

// Helper to get users from localStorage
const getStoredUsers = (): Record<string, User> => {
  const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
  return usersStr ? JSON.parse(usersStr) : {};
};

// Helper to save users to localStorage
const saveUsers = (users: Record<string, User>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Sign in with Google (mocked)
  const signIn = async () => {
    try {
      // This is a mock implementation
      // In a real app, you would use a library like Firebase
      const mockUser: User = {
        uid: 'google-' + Math.random().toString(36).substring(2, 9),
        email: 'user@example.com',
        displayName: 'ผู้ใช้ทดสอบ',
        photoURL: null,
        createdAt: new Date().toISOString()
      };

      setUser(mockUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mockUser));
      toast.success('เข้าสู่ระบบสำเร็จ');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('เข้าสู่ระบบล้มเหลว');
    }
  };

  // Register with email & password
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      // Check if email already exists
      const users = getStoredUsers();
      if (Object.values(users).some(u => u.email === email)) {
        toast.error('อีเมลนี้ถูกใช้งานแล้ว');
        return;
      }

      // Create new user
      const newUser: User = {
        uid: 'user-' + Math.random().toString(36).substring(2, 9),
        email,
        displayName,
        photoURL: null,
        createdAt: new Date().toISOString()
      };

      // Store in our mock database
      users[newUser.uid] = newUser;
      saveUsers(users);

      // Log user in
      setUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
      toast.success('สมัครสมาชิกสำเร็จ');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('สมัครสมาชิกล้มเหลว');
    }
  };

  // Sign in with email & password
  const emailSignIn = async (email: string, password: string) => {
    try {
      const users = getStoredUsers();
      const matchedUser = Object.values(users).find(u => u.email === email);
      
      if (!matchedUser) {
        toast.error('ไม่พบผู้ใช้งานที่มีอีเมลนี้');
        return;
      }

      // In a real implementation, we would verify the password here
      // For this mock version, we'll just sign them in
      
      setUser(matchedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(matchedUser));
      toast.success('เข้าสู่ระบบสำเร็จ');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('เข้าสู่ระบบล้มเหลว');
    }
  };

  // Sign out
  const signOut = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast.success('ออกจากระบบสำเร็จ');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, emailSignIn, signOut, loading }}>
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
