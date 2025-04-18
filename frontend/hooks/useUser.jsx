"use client";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  // console.log(context);
  return context;
};

export default useUser;
