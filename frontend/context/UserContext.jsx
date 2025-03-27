'use client';

import { createContext } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const value = {
    backendUrl,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;