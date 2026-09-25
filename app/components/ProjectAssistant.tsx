"use client";

import { useState } from "react";
import axios from "axios";

type Project = {
  _id: string;
  name: string;
  description: string;
  status: string;
};

export default function ProjectAssistant() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) {
      setMessage("Please enter a search question.");
      setResults([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/projects`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const data = await response.json();

const projects: Project[] = data.projects || data;

const question = search.toLowerCase();

let filteredProjects = projects;

      // Search by status
      if (question.includes("pending")) {
        filteredProjects = projects.filter(
          (project) => project.status === "Pending"
        );
      } else if (
        question.includes("completed") ||
        question.includes("complete")
      ) {
        filteredProjects = projects.filter(
          (project) => project.status === "Completed"
        );
      } else if (
        question.includes("progress") ||
        question.includes("in progress")
      ) {
        filteredProjects = projects.filter(
          (project) => project.status === "In Progress"
        );
      }

      // Search by project name
      else {
        filteredProjects = projects.filter(
          (project) =>
            project.name.toLowerCase().includes(question) ||
            project.description.toLowerCase().includes(question)
        );
      }

      setResults(filteredProjects);

      if (filteredProjects.length === 0) {
        setMessage("No matching projects found.");
      } else {
        setMessage(
          `${filteredProjects.length} project(s) found.`
        );
      }
    } catch (error) {
      console.error("Search error:", error);
      setMessage("Unable to search projects.");
      setResults([]);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white p-6 mt-8">

      {/* Heading */}
      <div className="mb-5">
        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">
          Smart Project Search
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">
          🤖 Project Assistant
        </h2>

        <p className="text-slate-500 mt-2">
          Search your projects using simple questions.
        </p>
      </div>

      {/* Search Box */}
      <div className="flex flex-col md:flex-row gap-3">

        <input
          type="text"
          placeholder="Example: show pending projects"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 border border-slate-300 bg-white p-3 rounded-xl outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
        />

        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95"
        >
          🔍 Search
        </button>

      </div>

      {/* Message */}
      {message && (
        <div className="mt-5 bg-indigo-50 rounded-xl p-4 text-indigo-700 font-semibold">
          {message}
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-5 space-y-4">

          {results.map((project) => (
            <div
              key={project._id}
              className="bg-slate-50 rounded-xl p-5 border border-slate-200"
            >
              <div className="flex justify-between items-start gap-4">

                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {project.name}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    {project.description}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                  {project.status}
                </span>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}