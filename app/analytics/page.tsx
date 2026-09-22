"use client";

import { useEffect, useState } from "react";

type Project = {
  _id: string;
  name: string;
  description: string;
  status: string;
};

export default function AnalyticsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalProjects = projects.length;

  const pendingProjects = projects.filter(
    (project) => project.status === "Pending"
  ).length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Loading Analytics...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">
            Project Insights
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-2">
            Project Analytics 📊
          </h1>

          <p className="text-slate-600 mt-2">
            Get a quick overview of your project progress.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-white">
            <div className="text-4xl mb-3">📁</div>

            <p className="text-slate-500 font-medium">
              Total Projects
            </p>

            <h2 className="text-4xl font-extrabold text-slate-800 mt-2">
              {totalProjects}
            </h2>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-white">
            <div className="text-4xl mb-3">⏳</div>

            <p className="text-slate-500 font-medium">
              Pending
            </p>

            <h2 className="text-4xl font-extrabold text-yellow-600 mt-2">
              {pendingProjects}
            </h2>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-white">
            <div className="text-4xl mb-3">🔵</div>

            <p className="text-slate-500 font-medium">
              In Progress
            </p>

            <h2 className="text-4xl font-extrabold text-blue-600 mt-2">
              {inProgressProjects}
            </h2>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-white">
            <div className="text-4xl mb-3">✅</div>

            <p className="text-slate-500 font-medium">
              Completed
            </p>

            <h2 className="text-4xl font-extrabold text-green-600 mt-2">
              {completedProjects}
            </h2>
          </div>

        </div>

        {/* Project Progress */}
        <div className="bg-white rounded-3xl shadow-xl border border-white p-6 mt-8">

          <h2 className="text-2xl font-bold text-slate-800">
            Project Progress 📈
          </h2>

          <p className="text-slate-500 mt-1">
            Current status of your projects
          </p>

          <div className="mt-6 space-y-5">

            {/* Pending */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-700">
                  Pending
                </span>

                <span className="text-slate-500">
                  {pendingProjects}
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="bg-yellow-400 h-4 rounded-full transition-all duration-500"
                  style={{
                    width:
                      totalProjects > 0
                        ? `${(pendingProjects / totalProjects) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

            {/* In Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-700">
                  In Progress
                </span>

                <span className="text-slate-500">
                  {inProgressProjects}
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width:
                      totalProjects > 0
                        ? `${(inProgressProjects / totalProjects) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

            {/* Completed */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-700">
                  Completed
                </span>

                <span className="text-slate-500">
                  {completedProjects}
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width:
                      totalProjects > 0
                        ? `${(completedProjects / totalProjects) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}