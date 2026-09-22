"use client";

import DashboardCard from "./components/DashboardCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [userName, setUserName] = useState("");

  const projects = useSelector(
    (state: any) => state.projects.items
  );

  // Get logged-in user's name from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  console.log("Projects:", projects);

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project: any) => project.status === "Completed"
  ).length;

  const pendingProjects = projects.filter(
    (project: any) => project.status === "Pending"
  ).length;

  const inProgressProjects = projects.filter(
    (project: any) => project.status === "In Progress"
  ).length;

  return (
    <div className="space-y-8">

      {/* Welcome Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-10 text-white shadow-2xl">

        <div className="relative z-10">

          <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-3">
            Project Dashboard
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome back, {userName || "User"}! 👋
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            Manage your projects, track progress, and keep everything
            organized from one place.
          </p>

        </div>

        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full" />

      </section>

      {/* Overview Heading */}
      <section>

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-3xl font-extrabold text-slate-800">
              Dashboard Overview
            </h2>

            <p className="text-slate-500 mt-1">
              Here's a quick look at your project activity.
            </p>
          </div>

        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="transition-all duration-300 hover:-translate-y-2">
            <DashboardCard
              title="Total Projects"
              value={totalProjects}
              icon="📁"
            />
          </div>

          <div className="transition-all duration-300 hover:-translate-y-2">
            <DashboardCard
              title="Completed"
              value={completedProjects}
              icon="✅"
            />
          </div>

          <div className="transition-all duration-300 hover:-translate-y-2">
            <DashboardCard
              title="Pending"
              value={pendingProjects}
              icon="⏳"
            />
          </div>

          <div className="transition-all duration-300 hover:-translate-y-2">
            <DashboardCard
              title="In Progress"
              value={inProgressProjects}
              icon="🚀"
            />
          </div>

        </div>

      </section>

      {/* Quick Actions */}
      <section className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Quick Actions ⚡
        </h2>

        <p className="text-slate-500 mb-6">
          Quickly manage your projects from here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <a
            href="/create"
            className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400"
          >
            <div className="text-3xl mb-3">➕</div>

            <h3 className="font-bold text-slate-800 group-hover:text-blue-600">
              Create Project
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Start a new project.
            </p>
          </a>

          <a
            href="/projects"
            className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-400"
          >
            <div className="text-3xl mb-3">📋</div>

            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600">
              View Projects
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              See all your projects.
            </p>
          </a>

          <a
            href="/track"
            className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-400"
          >
            <div className="text-3xl mb-3">📊</div>

            <h3 className="font-bold text-slate-800 group-hover:text-purple-600">
              Track Progress
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Monitor project status.
            </p>
          </a>

        </div>

      </section>

    </div>
  );
}