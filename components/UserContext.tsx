import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from "react";
import useFetch from "@/app/hooks/useFetch";
import { User } from "@/app/types";

// Define the context type
interface UserContextType {
  user: User;
  loading: boolean;
  error: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  refetchUser: () => void; // Expose refetchUser function
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode }> = ({children,}) => {
  const [activeTab, setActiveTab] = useState<string>("properties");
  const { data: user, loading, error, refetch } = useFetch();

  useEffect(() => {
    refetch();
  }, [refetch]); 

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        activeTab,
        setActiveTab,
        refetch, // Provide the refetchUser function
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
