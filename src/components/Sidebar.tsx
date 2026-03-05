import {
    LayoutDashboard,
    BarChart3,
    Users,
    FileText,
    ChevronDown,
    Box,
    X
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const Sidebar = ({ open, setOpen }: Props) => {

    const [reportOpen, setReportOpen] = useState(false);

    return (
        <>
            {/* Overlay (mobile) */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={` shadow-lg
          fixed md:static
          top-0 left-0
          h-screen w-65
          bg-[#ffffff]
          text-black
          flex flex-col
          z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
            >

                {/* Close button (mobile) */}
                <div className="md:hidden flex justify-end p-4">
                    <button onClick={() => setOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-6">
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
                                : "hover:bg-[#d6d6d6]"
                            }`
                        }
                        onClick={() => setOpen(false)}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    {/* Analytics */}
                    <NavLink
                        to="/analytics"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#d6d6d6]"
                        onClick={() => setOpen(false)}
                    >
                        <BarChart3 size={18} />
                        Analytics
                    </NavLink>

                    {/* Users */}
                    <NavLink
                        to="/users"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#d6d6d6]"
                        onClick={() => setOpen(false)}
                    >
                        <Users size={18} />
                        Users
                    </NavLink>

                    {/* Report Parent */}
                    <button
                        onClick={() => setReportOpen(!reportOpen)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#d6d6d6]"
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
                        <div className="ml-8 flex flex-col gap-2 text-gray-600 text-sm">

                            <NavLink
                                to="/offline-logs"
                                className="flex items-center gap-2 py-2"
                                onClick={() => setOpen(false)}
                            >
                                <span className="w-2 h-2 border rounded-full"></span>
                                Offline Logs
                            </NavLink>

                            <NavLink
                                to="/sms-logs"
                                className="flex items-center gap-2 py-2"
                                onClick={() => setOpen(false)}
                            >
                                <span className="w-2 h-2 border rounded-full"></span>
                                SMS Logs
                            </NavLink>

                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default Sidebar;