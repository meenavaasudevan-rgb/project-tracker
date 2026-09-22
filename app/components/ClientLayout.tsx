"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import ProtectedRoute from "./ProtectedRoute";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login and Register pages have no Sidebar/Header/Footer
  if (pathname === "/login" || pathname === "/register") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-100">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <header className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 text-white px-6 md:px-8 py-4 shadow-lg flex items-center justify-between">

            <h1 className="text-2xl md:text-3xl font-extrabold">
              🚀 Project Tracker App
            </h1>

            <button
              onClick={handleLogout}
              className="border border-white/70 px-4 md:px-5 py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-white hover:text-pink-600 hover:scale-105 active:scale-95"
            >
              Logout
            </button>

          </header>

          {/* Page Content */}
          <main className="p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-black text-white text-center p-3">
            Next.js Frontend Project
          </footer>

        </div>

      </div>
    </ProtectedRoute>
  );
}