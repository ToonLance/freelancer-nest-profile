import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setUsername: (username: string) => Promise<boolean>;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
}

interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  username: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if username exists
  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    if (!username || username.length < 3) return false;
    
    try {
      // Check if this username document exists
      const usernameDocRef = doc(db, 'usernames', username.toLowerCase());
      const usernameDoc = await getDoc(usernameDocRef);
      
      return !usernameDoc.exists();
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  // Set username for current user
  const setUsername = async (username: string): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        toast({
          title: "Username already taken",
          description: "Please choose another username",
          variant: "destructive"
        });
        return false;
      }
      
      // Create/update a username document
      await setDoc(doc(db, 'usernames', username.toLowerCase()), {
        uid: currentUser.uid
      });
      
      // Update user profile
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        username: username.toLowerCase(),
        updatedAt: new Date()
      });
      
      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          username: username.toLowerCase()
        });
      }
      
      toast({
        title: "Username set successfully",
        description: "You can now access your profile page"
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Error setting username:', error);
      toast({
        title: "Failed to set username",
        description: "Please try again",
        variant: "destructive"
      });
      return false;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if this is a new user
      const userRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // New user - create profile
        const userData: UserProfile = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          username: null,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        await setDoc(userRef, userData);
        setUserProfile(userData);
        
        toast({
          title: "Account created!",
          description: "Please set up your username"
        });
        
        // Redirect to username setup
        navigate('/setup-username');
      } else {
        // Existing user - get profile data
        const userData = userDoc.data() as UserProfile;
        setUserProfile(userData);
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${userData.displayName || userData.email}`
        });
        
        // If username is not set, redirect to setup
        if (!userData.username) {
          navigate('/setup-username');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast({
        title: "Sign in error",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
      toast({
        title: "Signed out successfully"
      });
      navigate('/');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get user profile data
          const userRef = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);
          
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data() as UserProfile;
            setUserProfile(userData);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signInWithGoogle,
    signOut,
    setUsername,
    checkUsernameAvailability
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
