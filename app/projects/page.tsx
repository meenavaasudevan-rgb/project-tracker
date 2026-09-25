"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Project = {
  _id: string;
  name: string;
  description: string;
  status: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
         `${process.env.NEXT_PUBLIC_API_URL}/projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Projects from MongoDB:", response.data);

        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-xl font-semibold">
          Loading projects...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
          Project Management
        </p>

        <h1 className="text-4xl font-extrabold text-slate-800 mt-2">
          My Projects 📁
        </h1>

        <p className="text-slate-500 mt-2">
          View and manage your projects from MongoDB.
        </p>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-5xl mb-4">📂</div>

          <h2 className="text-2xl font-bold text-slate-700">
            No Projects Found
          </h2>

          <p className="text-slate-500 mt-2">
            Create your first project to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">

          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex justify-between items-start gap-4">

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {project.name}
                  </h2>

                  <p className="text-slate-500 mt-3">
                    {project.description}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  {project.status}
                </span>

              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-400">
                  Project ID
                </p>

                <p className="text-sm text-slate-600 mt-1 break-all">
                  {project._id}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}