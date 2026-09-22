"use client";

import ProjectAssistant from "../components/ProjectAssistant";

export default function AIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-6 md:p-8">
      
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          AI Project Assistant 🤖
        </h1>

        <p className="text-slate-600 mb-8">
          Search and find information about your projects.
        </p>

        <ProjectAssistant />

      </div>

    </div>
  );
}