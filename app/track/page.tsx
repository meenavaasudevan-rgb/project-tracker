"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Project = {
  _id: string;
  name: string;
  description: string;
  status: string;
};

export default function TrackPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("Pending");

  // Get projects from MongoDB
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

      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Update status
  const handleStatusChange = async (
    id: string,
    newStatus: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id
            ? response.data.project
            : project
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update project status.");
    }
  };

  // Start editing
  const handleEdit = (project: Project) => {
    setEditingId(project._id);
    setEditName(project.name);
    setEditDescription(project.description);
    setEditStatus(project.status);
  };

  // Save edited project
  const handleSaveEdit = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
        {
          name: editName,
          description: editDescription,
          status: editStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id
            ? response.data.project
            : project
        )
      );

      setEditingId(null);

      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    }
  };

  // Delete project
  const handleDelete = async (
    id: string,
    projectName: string
  ) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${projectName}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prevProjects) =>
        prevProjects.filter(
          (project) => project._id !== id
        )
      );

      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">
        <p className="text-xl font-semibold text-slate-700">
          Loading projects...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 p-6 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-indigo-700 font-semibold uppercase tracking-wider text-sm">
            Project Monitoring
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-2">
            Track Project Status 📊
          </h1>

          <p className="text-slate-700 mt-2">
            View, update, edit and manage your projects.
          </p>
        </div>

        {/* No projects */}
        {projects.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white p-10 text-center">

            <div className="text-6xl mb-4">
              📊
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              No Projects Found
            </h2>

            <p className="text-slate-500 mt-2">
              Create a project first to start tracking it.
            </p>

          </div>
        ) : (

          <div className="grid gap-6">

            {projects.map((project) => (

              <div
                key={project._id}
                className="bg-white rounded-3xl p-6 shadow-xl border border-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >

                {editingId === project._id ? (

                  /* EDIT MODE */
                  <div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-5">
                      Edit Project ✏️
                    </h2>

                    <label className="block font-semibold text-slate-700 mb-2">
                      Project Name
                    </label>

                    <input
                      type="text"
                      value={editName}
                      onChange={(e) =>
                        setEditName(e.target.value)
                      }
                      className="w-full border border-slate-300 p-3 rounded-xl mb-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    />

                    <label className="block font-semibold text-slate-700 mb-2">
                      Description
                    </label>

                    <textarea
                      value={editDescription}
                      onChange={(e) =>
                        setEditDescription(e.target.value)
                      }
                      className="w-full border border-slate-300 p-3 rounded-xl mb-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                      rows={4}
                    />

                    <label className="block font-semibold text-slate-700 mb-2">
                      Status
                    </label>

                    <select
                      value={editStatus}
                      onChange={(e) =>
                        setEditStatus(e.target.value)
                      }
                      className="w-full border border-slate-300 p-3 rounded-xl mb-5"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleSaveEdit(project._id)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                      >
                        💾 Save Changes
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-slate-500 hover:bg-slate-600 text-white px-5 py-3 rounded-xl font-semibold transition"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                ) : (

                  /* VIEW MODE */
                  <>

                    {/* Project Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {project.name}
                        </h2>

                        <p className="text-slate-500 mt-2">
                          {project.description}
                        </p>
                      </div>

                      <span
                        className={`w-fit px-4 py-2 rounded-full text-sm font-bold ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {project.status}
                      </span>

                    </div>

                    <div className="border-t border-slate-200 my-6"></div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Update Project Status
                      </label>

                      <select
                        className="w-full md:w-72 border border-slate-300 bg-slate-50 p-3 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                        value={project.status}
                        onChange={(e) =>
                          handleStatusChange(
                            project._id,
                            e.target.value
                          )
                        }
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">

                      <button
                        onClick={() =>
                          handleEdit(project)
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                      >
                        ✏️ Edit Project
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            project._id,
                            project.name
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                      >
                        🗑️ Delete Project
                      </button>

                    </div>

                  </>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}