"use client";

import { useState } from "react";
import axios from "axios";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleProject = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.post(
`${process.env.NEXT_PUBLIC_API_URL}/projects`,
        {
          name,
          description,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        alert("Project created successfully!");

        setName("");
        setDescription("");
        setStatus("Pending");
      }
    } catch (error) {
      console.error("Create project error:", error);
      alert("Failed to create project");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8">

      <div className="max-w-4xl mx-auto">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Project Management
          </p>

          <h1 className="text-4xl font-extrabold text-slate-800 mt-2">
            Create New Project 🚀
          </h1>

          <p className="text-slate-500 mt-2">
            Add a new project and start tracking your progress.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold">
              Project Details
            </h2>

            <p className="text-blue-100 mt-1">
              Enter the information about your project below.
            </p>
          </div>

          <div className="p-8 space-y-6">

            {/* Project Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Name
              </label>

              <input
                type="text"
                placeholder="Enter your project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 bg-slate-50 p-4 rounded-xl outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 hover:border-blue-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Description
              </label>

              <textarea
                placeholder="Describe your project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full border border-slate-300 bg-slate-50 p-4 rounded-xl outline-none resize-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 hover:border-blue-300"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-slate-300 bg-slate-50 p-4 rounded-xl outline-none cursor-pointer transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 hover:border-blue-300"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            {/* Button */}
            <button
              onClick={handleProject}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0"
            >
              🚀 Add Project
            </button>

          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          💡 Your project will be securely saved to MongoDB.
        </div>

      </div>
    </div>
  );
}