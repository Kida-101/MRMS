'use client';

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast"

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, { withCredentials: true });
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin`, { withCredentials: true });
      data.success ? setUser(data.data) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAuthState();
  }, [])

  const value = {
    isLoading,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    getAuthState,
    getUserData,
    backendUrl
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;