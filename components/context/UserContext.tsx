"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import fetchData from '@/utils/fetch';

type User = {
  id: string;
  // Add other user properties as needed
};

const UserContext = createContext<{
  user?: User;
  refetchUser: () => Promise<void>;
  triggerRefetch: () => void;
  refetchTrigger: number;
}>({
  refetchUser: async () => {},
  triggerRefetch: () => {},
  refetchTrigger: 0
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ 
  children: React.ReactNode; 
  userId?: string | null 
}> = ({ children, userId }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetchUser = async () => {
    console.log('Refetch User Called', { userId });
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchData(userId, "User");
      console.log('Fetched User Data:', data);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const triggerRefetch = () => {
    console.log('Trigger Refetch Called');
    // Increment the trigger to cause a re-fetch
    setRefetchTrigger(prev => {
      console.log('Previous Trigger Value:', prev);
      return prev + 1;
    });
  };

  useEffect(() => {
    console.log('UseEffect Triggered', { 
      userId, 
      refetchTrigger 
    });
    if (userId) {
      refetchUser();
    } else {
      setUser(undefined);
    }
  }, [userId, refetchTrigger]);

  return (
    <UserContext.Provider value={{ 
      user, 
      refetchUser,
      triggerRefetch,
      refetchTrigger,
      isLoading,
      error 
    }}>
      {children}
    </UserContext.Provider>
  );
};