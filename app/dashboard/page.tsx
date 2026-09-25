"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectAssistant from "../components/ProjectAssistant";

type Project = {
  _id: string;
  name: string;
  description: string;
  status: string;
};

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "Todo" | "In Progress" | "Completed";
  projectId: string;
  priority: "Low" | "Medium" | "High";
  assignee: string;
  dueDate: string;
};

const API_URL  = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userName, setUserName] = useState("User");

  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.name) {
        setUserName(payload.name);
      }

      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();

      if (currentTime >= expiryTime) {
        localStorage.removeItem("token");
        router.replace("/login");
        return;
      }

      setCheckingAuth(false);

      const remainingTime = expiryTime - currentTime;

      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        router.replace("/login");
      }, remainingTime);

      fetchDashboardData(token);

      return () => clearTimeout(timer);
    } catch (error) {
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [router]);

  const fetchDashboardData = async (token: string) => {
    try {
      setLoadingData(true);

      const [projectsResponse, tasksResponse] = await Promise.all([
        fetch(`${API_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const projectsData = await projectsResponse.json();
      const tasksData = await tasksResponse.json();

      if (Array.isArray(projectsData)) {
        setProjects(projectsData);
      } else if (Array.isArray(projectsData.projects)) {
        setProjects(projectsData.projects);
      } else {
        setProjects([]);
      }

      if (Array.isArray(tasksData)) {
        setTasks(tasksData);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Dashboard data error:", error);
    } finally {
      setLoadingData(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-slate-600">
          Checking authentication...
        </p>
      </div>
    );
  }
const completedProjects = projects.filter(
  (project) => project.status === "Completed"
).length;

const inProgressProjects = projects.filter(
  (project) => project.status === "In Progress"
).length;

const pendingProjects = projects.filter(
  (project) => project.status === "Not Started"
).length;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Todo"
  ).length;

  const getProjectProgress = (projectId: string) => {
    const projectTasks = tasks.filter(
      (task) => task.projectId === projectId
    );

    if (projectTasks.length === 0) {
      return 0;
    }

    const completed = projectTasks.filter(
      (task) => task.status === "Completed"
    ).length;

    return Math.round((completed / projectTasks.length) * 100);
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(
      (project) => project._id === projectId
    );

    return project?.name || "Project";
  };

  const getStatusStyle = (status: Task["status"]) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700 border-green-200";
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700 border-blue-200";
    }

    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  const getPriorityStyle = (priority: Task["priority"]) => {
    if (priority === "High") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "Medium") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 px-6 py-8">

      {/* HERO */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 p-8 text-white shadow-xl">

        <div className="relative z-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-100">
            Project Workspace
          </p>

          <h1 className="text-4xl font-extrabold">
            Welcome back, {userName}! 👋
          </h1>

          <p className="mt-3 max-w-2xl text-indigo-100">
            Track your projects, manage your tasks and stay on top of
            your deadlines from one place.
          </p>
        </div>

        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-32 h-56 w-56 rounded-full bg-white/10" />
      </div>

      {/* STAT CARDS */}
      {loadingData ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
          <p className="font-medium text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {/* PROJECTS */}
            <div className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-blue-100 p-3 text-2xl">
                  📁
                </div>
              </div>

              <p className="text-sm font-medium text-slate-500">
                Total Projects
              </p>

              <h2 className="mt-1 text-4xl font-extrabold text-blue-600">
                {projects.length}
              </h2>
            </div>

            {/* TASKS */}
            <div className="group rounded-2xl border border-purple-100 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 rounded-xl bg-purple-100 p-3 text-2xl w-fit">
                📋
              </div>

              <p className="text-sm font-medium text-slate-500">
                Total Tasks
              </p>

              <h2 className="mt-1 text-4xl font-extrabold text-purple-600">
                {totalTasks}
              </h2>
            </div>

            {/* IN PROGRESS */}
            <div className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 rounded-xl bg-blue-100 p-3 text-2xl w-fit">
                🔄
              </div>

              <p className="text-sm font-medium text-slate-500">
                In Progress
              </p>

              <h2 className="mt-1 text-4xl font-extrabold text-blue-600">
                {inProgressProjects}
              </h2>
            </div>

            {/* COMPLETED */}
            <div className="group rounded-2xl border border-green-100 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 rounded-xl bg-green-100 p-3 text-2xl w-fit">
                ✅
              </div>

              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <h2 className="mt-1 text-4xl font-extrabold text-green-600">
                {completedProjects}
              </h2>
            </div>

            {/* PENDING */}
            <div className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 rounded-xl bg-orange-100 p-3 text-2xl w-fit">
                ⏳
              </div>

              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>

              <h2 className="mt-1 text-4xl font-extrabold text-orange-500">
                {pendingProjects}
              </h2>
            </div>

          </div>

          {/* PROJECT PROGRESS */}
          <div className="mb-8 rounded-3xl bg-white p-7 shadow-lg">

            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  📊 Project Progress
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  See how much work has been completed in each project.
                </p>
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-8 text-center">
                <p className="font-medium text-slate-500">
                  No projects found.
                </p>
              </div>
            ) : (
              <div className="space-y-6">

                {projects.map((project) => {
                  const progress = getProjectProgress(project._id);

                  return (
                    <div
                      key={project._id}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                    >
                      <div className="mb-3 flex items-center justify-between">

                        <div>
                          <h3 className="text-lg font-bold text-slate-800">
                            {project.name}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {project.description}
                          </p>
                        </div>

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                          {progress}%
                        </span>
                      </div>

                      <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

              </div>
            )}
          </div>

          {/* TASK OVERVIEW */}
          <div className="mb-8 rounded-3xl bg-white p-7 shadow-lg">

            <div className="mb-7">
              <h2 className="text-2xl font-bold text-slate-800">
                📋 Task Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Quickly see what needs your attention.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

              {/* IN PROGRESS */}
              <div className="overflow-hidden rounded-2xl border border-blue-200">

                <div className="bg-blue-600 px-5 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">
                      🔵 In Progress
                    </h3>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
                      {inProgressTasks}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 p-4">

                  {tasks
                    .filter((task) => task.status === "In Progress")
                    .map((task) => (
                      <div
                        key={task._id}
                        className="rounded-xl border border-blue-100 bg-blue-50 p-4"
                      >
                        <h4 className="font-bold text-slate-800">
                          {task.title}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          📁 {getProjectName(task.projectId)}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            👤 {task.assignee}
                          </span>

                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityStyle(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}

                  {inProgressTasks === 0 && (
                    <p className="py-6 text-center text-sm text-slate-400">
                      No tasks in progress.
                    </p>
                  )}

                </div>
              </div>

              {/* PENDING */}
              <div className="overflow-hidden rounded-2xl border border-yellow-200">

                <div className="bg-yellow-500 px-5 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">
                      🟡 Pending
                    </h3>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
                      {pendingTasks}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 p-4">

                  {tasks
                    .filter((task) => task.status === "Todo")
                    .map((task) => (
                      <div
                        key={task._id}
                        className="rounded-xl border border-yellow-100 bg-yellow-50 p-4"
                      >
                        <h4 className="font-bold text-slate-800">
                          {task.title}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          📁 {getProjectName(task.projectId)}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            👤 {task.assignee}
                          </span>

                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityStyle(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}

                  {pendingTasks === 0 && (
                    <p className="py-6 text-center text-sm text-slate-400">
                      No pending tasks.
                    </p>
                  )}

                </div>
              </div>

              {/* COMPLETED */}
              <div className="overflow-hidden rounded-2xl border border-green-200">

                <div className="bg-green-600 px-5 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">
                      🟢 Completed
                    </h3>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
                      {completedTasks}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 p-4">

                  {tasks
                    .filter((task) => task.status === "Completed")
                    .map((task) => (
                      <div
                        key={task._id}
                        className="rounded-xl border border-green-100 bg-green-50 p-4"
                      >
                        <h4 className="font-bold text-slate-800">
                          {task.title}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          📁 {getProjectName(task.projectId)}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            👤 {task.assignee}
                          </span>

                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityStyle(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}

                  {completedTasks === 0 && (
                    <p className="py-6 text-center text-sm text-slate-400">
                      No completed tasks yet.
                    </p>
                  )}

                </div>
              </div>

            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-7 text-white shadow-xl">

            <h2 className="text-2xl font-bold">
              ⚡ Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-300">
              Jump directly to the work you want to manage.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">

              <button
                onClick={() => router.push("/create")}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
              >
                ➕ Create Project
              </button>

              <button
                onClick={() => router.push("/tasks")}
                className="rounded-xl bg-purple-600 px-5 py-3 font-semibold transition hover:bg-purple-700"
              >
                📋 Manage Tasks
              </button>

              <button
                onClick={() => router.push("/projects")}
                className="rounded-xl bg-green-600 px-5 py-3 font-semibold transition hover:bg-green-700"
              >
                📁 View Projects
              </button>

            </div>
          </div>
        </>
      )}

      {/* EXISTING ASSISTANT */}
      <div className="mt-8">
        <ProjectAssistant />
      </div>

    </div>
  );
}