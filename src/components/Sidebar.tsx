import {
    LayoutDashboard,
    Bell,
    BarChart3,
    Cpu,
    Users,
    FileText,
    ChevronDown,
    Box
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {

    const [reportOpen, setReportOpen] = useState(false);

    return (
        <div className="w-65 h-screen bg-[#2c344c] text-white flex flex-col">

            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-600">
                <div className="bg-white p-2 rounded">
                    <Box className="text-[#2c344c]" size={22} />
                </div>

                <span className="text-xl font-semibold text-indigo-400">
                    SAIL DSP
                </span>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-2 px-3 mt-6">

                {/* Dashboard */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${isActive
                            ? "bg-linear-to-r from-indigo-500 to-purple-500 shadow-lg"
                            : "hover:bg-[#3a425a]"
                        }`
                    }
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </NavLink>

                {/* Notifications */}
                <NavLink
                    to="/notifications"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#3a425a]"
                >
                    <Bell size={18} />
                    Notifications
                </NavLink>

                {/* Analytics */}
                <NavLink
                    to="/analytics"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#3a425a]"
                >
                    <BarChart3 size={18} />
                    Analytics
                </NavLink>

                {/* Devices */}
                <NavLink
                    to="/devices"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#3a425a]"
                >
                    <Cpu size={18} />
                    Devices
                </NavLink>

                {/* Users */}
                <NavLink
                    to="/users"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#3a425a]"
                >
                    <Users size={18} />
                    Users
                </NavLink>

                {/* Report Parent */}
                <button
                    onClick={() => setReportOpen(!reportOpen)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#3a425a]"
                >
                    <div className="flex items-center gap-3">
                        <FileText size={18} />
                        Report
                    </div>

                    <ChevronDown
                        size={16}
                        className={`transition-transform ${reportOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {/* Submenu */}
                {reportOpen && (
                    <div className="ml-8 flex flex-col gap-2 text-gray-300 text-sm">

                        <NavLink
                            to="/offline-logs"
                            className="flex items-center gap-2 py-2 hover:text-white"
                        >
                            <span className="w-2 h-2 border rounded-full"></span>
                            Offline Logs
                        </NavLink>

                        <NavLink
                            to="/sms-logs"
                            className="flex items-center gap-2 py-2 hover:text-white"
                        >
                            <span className="w-2 h-2 border rounded-full"></span>
                            SMS Logs
                        </NavLink>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Sidebar;