import { createContext } from "react";

export type UserContextType = {
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | null>(null);
