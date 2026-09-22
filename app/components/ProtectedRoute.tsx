"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SessionExpiredModal from "./SessionExpiredModal";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    null
  );

  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // No token
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const currentTime = Math.floor(Date.now() / 1000);

      // Token already expired
      if (payload.exp && payload.exp <= currentTime) {
        localStorage.removeItem("token");
        setSessionExpired(true);
        return;
      }

      setIsAuthenticated(true);

      // Calculate remaining token time
      const remainingTime = (payload.exp - currentTime) * 1000;

      // Automatically detect expiration
      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        setSessionExpired(true);
      }, remainingTime);

      return () => clearTimeout(timer);
    } catch (error) {
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [router]);

  const handleLogin = () => {
    setSessionExpired(false);
    router.replace("/login");
  };

  if (isAuthenticated === null && !sessionExpired) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl font-semibold">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && children}

      {sessionExpired && (
        <SessionExpiredModal onLogin={handleLogin} />
      )}
    </>
  );
}