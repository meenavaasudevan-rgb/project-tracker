"use client";

import { useEffect, useState } from "react";

type Project = {
  _id: string;
  name: string;
};

type Task = {
  _id: string;
  title: string;
  description: string;
  projectId: string;
  status: "Todo" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  assignee: string;
  dueDate: string;
  userId: string;
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Todo");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(false);

  // GET TOKEN
  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
  try {
    const token = getToken();

    const response = await fetch(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await response.json();

    console.log("Projects API response:", data);

    if (Array.isArray(data)) {
      setProjects(data);
    } else if (Array.isArray(data.projects)) {
      setProjects(data.projects);
    } else {
      console.error("Unexpected projects response:", data);
      setProjects([]);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    setProjects([]);
  }
};

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const token = getToken();

      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  // RESET FORM
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setProjectId("");
    setStatus("Todo");
    setPriority("Medium");
    setAssignee("");
    setDueDate("");
    setEditingId(null);
  };

  // CREATE / UPDATE TASK
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !projectId || !assignee || !dueDate) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = getToken();

      const taskData = {
        title,
        description,
        projectId,
        status,
        priority,
        assignee,
        dueDate,
      };

      const url = editingId
        ? `${API_URL}/tasks/${editingId}`
        : `${API_URL}/tasks`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(editingId ? "Task updated successfully!" : "Task created successfully!");

      resetForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to save task");
    }
  };

  // EDIT TASK
  const handleEdit = (task: Task) => {
    setEditingId(task._id);

    setTitle(task.title);
    setDescription(task.description);
    setProjectId(task.projectId);
    setStatus(task.status);
    setPriority(task.priority);
    setAssignee(task.assignee);

    setDueDate(task.dueDate.split("T")[0]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE TASK
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      alert("Task deleted successfully!");

      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  // PROJECT NAME
  const getProjectName = (id: string) => {
    const project = projects.find((project) => project._id === id);

    return project ? project.name : "Unknown Project";
  };

  // SEARCH + FILTER
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()) ||
      task.assignee.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Task Management
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your project tasks, progress and deadlines.
        </p>
      </div>

      {/* CREATE / EDIT FORM */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingId ? "Edit Task" : "Create New Task"}
          </h2>

          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >

          {/* TITLE */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* PROJECT */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Project
            </label>

            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-lg border bg-white p-3 outline-none focus:border-blue-500"
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task"
              rows={3}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Task["status"])
              }
              className="w-full rounded-lg border bg-white p-3"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* PRIORITY */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Task["priority"])
              }
              className="w-full rounded-lg border bg-white p-3"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* ASSIGNEE */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Assignee
            </label>

            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Enter assignee name"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* DUE DATE */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {editingId ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border p-3 outline-none focus:border-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border bg-white p-3"
          >
            <option value="All">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

        </div>
      </div>

      {/* TASK LIST */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            My Tasks
          </h2>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {filteredTasks.length} Tasks
          </span>
        </div>

        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading tasks...
          </p>
        ) : filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p className="text-lg font-medium">No tasks found</p>
            <p className="mt-1 text-sm">
              Create a task or change your search/filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="rounded-xl border p-5 transition hover:shadow-md"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  {/* TASK INFO */}
                  <div className="flex-1">

                    <h3 className="text-lg font-bold text-gray-800">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {task.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm">

                      <span className="rounded-full bg-gray-100 px-3 py-1">
                        📁 {getProjectName(task.projectId)}
                      </span>

                      <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">
                        👤 {task.assignee}
                      </span>

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
                        📅 {task.dueDate.split("T")[0]}
                      </span>

                    </div>

                  </div>

                  {/* STATUS + PRIORITY */}
                  <div className="flex flex-wrap gap-2">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority} Priority
                    </span>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => handleEdit(task)}
                      className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}