"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaFolderPlus,
  FaEye,
  FaEdit,
  FaTasks,
  FaRobot,
  FaChartBar,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <FaHome />,
    },
    {
      name: "Create Project",
      href: "/create",
      icon: <FaFolderPlus />,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: <FaEye />,
    },
    {
  name: "Tasks",
  href: "/tasks",
  icon: <FaTasks />,
},
    {
      name: "Track Project",
      href: "/track",
      icon: <FaEdit />,
    },
    {
      name: "AI Assistant",
      href: "/ai",
      icon: <FaRobot />,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <FaChartBar />,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-400">
          🚀 Project Tracker
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Manage your projects easily
        </p>
      </div>

      <nav className="flex-1 p-4">

        <ul className="space-y-2">

          {menuItems.map((item) => (

            <li key={item.name}>

              <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 hover:text-blue-400"
                }`}
              >
                {item.icon}

                <span>{item.name}</span>

              </Link>

            </li>

          ))}

        </ul>

      </nav>

    </aside>
  );
}