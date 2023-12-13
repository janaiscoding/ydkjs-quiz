"use client"
import React, { useState, createContext } from "react";
import { User } from "../utils/types";


type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>({} as User);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};