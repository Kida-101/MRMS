"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "/hooks/useUser";

export default function GuestGuard({ children }) {
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useUser();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn && user) {
        router.replace("/dashboard");
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [isLoggedIn, user, isLoading, router]);

  if (isLoading || isCheckingAuth) {
    return;
  }

  return <>{children}</>;
}
