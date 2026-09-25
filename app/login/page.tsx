"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          email,
          password,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        router.push("/");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-4">

      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="text-center mb-8">

          <div className="text-5xl mb-3">
            🚀
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Project Tracker
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back! Please login to continue.
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-2xl font-bold text-white mb-6">
            Login
          </h2>

          {/* Email */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>

           <input
  type="email"
  placeholder="Enter your email"
  autoComplete="username"
  className="w-full bg-white/10 border border-slate-600 text-white placeholder-slate-400 p-3.5 rounded-xl outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-white/15"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

           <input
  type="password"
  placeholder="Enter your password"
  autoComplete="current-password"
  className="w-full bg-white/10 border border-slate-600 text-white placeholder-slate-400 p-3.5 rounded-xl outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-white/15"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-slate-400 mt-6">
            New user?{" "}
            <Link
              href="/register"
              className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition"
            >
              Register here
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}