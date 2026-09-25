"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
       `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        alert("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
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
            Create your account and start tracking projects.
          </p>

        </div>

        {/* Register Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-2xl font-bold text-white mb-6">
            Create Account
          </h2>

          {/* Name */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-white/10 border border-slate-600 text-white placeholder-slate-400 p-3.5 rounded-xl outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-white/15"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          {/* Email */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-slate-600 text-white placeholder-slate-400 p-3.5 rounded-xl outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-white/15"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* Password */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-white/10 border border-slate-600 text-white placeholder-slate-400 p-3.5 rounded-xl outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-white/15"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          {/* Confirm Password */}
          <div className="mb-6">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full bg-white/10 border border-slate-600 text-white placeholder-slate-400 p-3.5 rounded-xl outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-white/15"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-slate-400 mt-6">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition"
            >
              Login here
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}