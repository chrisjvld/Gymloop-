import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { supabase } from './supabase';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize session from secure storage and Supabase
    initializeSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (session) {
          // Store session securely
          await SecureStore.setItemAsync('supabase_session', JSON.stringify(session));
          setSession(session);
        } else {
          // Clear stored session
          await SecureStore.deleteItemAsync('supabase_session');
          setSession(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const initializeSession = async () => {
    try {
      // First, check if there's a stored session
      const storedSession = await SecureStore.getItemAsync('supabase_session');
      
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        
        // Check if the stored session is still valid
        if (parsedSession.expires_at && new Date(parsedSession.expires_at * 1000) > new Date()) {
          // Set the session in Supabase
          await supabase.auth.setSession(parsedSession);
          setSession(parsedSession);
          console.log('Restored session from secure storage');
        } else {
          // Session expired, clear it
          await SecureStore.deleteItemAsync('supabase_session');
          console.log('Stored session expired, cleared');
        }
      }
      
      // Also check current Supabase session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (currentSession) {
        setSession(currentSession);
        // Store the current session securely
        await SecureStore.setItemAsync('supabase_session', JSON.stringify(currentSession));
      }
      
    } catch (error) {
      console.error('Error initializing session:', error);
      // Clear any corrupted stored session
      await SecureStore.deleteItemAsync('supabase_session');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      await SecureStore.deleteItemAsync('supabase_session');
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}; 