"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import fetchData from '@/utils/fetch';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children, userId }) => {
  const [user, setUser] = useState();
  const refetchUser = async () => {
    try {
      if (userId) {
        const data = await fetchData(userId, "User");
        setUser(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      refetchUser();  // Fetch user data when userId is available
    }
  }, [userId,user]);  // Trigger whenever userId changes

  return (
    <UserContext.Provider value={{ user, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
