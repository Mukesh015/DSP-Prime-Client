import {
    LayoutDashboard,
    BarChart3,
    FileText,
    ChevronDown,
    X,
    Bell,
    Info,
    User
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo1.jpg";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const Sidebar = ({ open, setOpen }: Props) => {
    const [reportOpen, setReportOpen] = useState(false);

    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
            ? "bg-indigo-50 text-indigo-600 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`;

    const subLinkStyle = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 py-2 rounded transition ${isActive
            ? "text-indigo-600 font-medium"
            : "text-gray-600 hover:text-indigo-500"
        }`;

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={`shadow-lg
        fixed md:static
        top-0 left-0
        h-screen w-65
        bg-white
        text-black
        flex flex-col
        z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
            >
                {/* Close button mobile */}
                <div className="md:hidden flex justify-end p-4">
                    <button onClick={() => setOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-6">

                    <div>
                        <img
                            src={logo}
                            alt="SAIL DSP Logo"
                            className="w-14 h-14 object-contain"
                        />
                    </div>

                    <span className="text-xl font-semibold text-indigo-600">
                        SAIL DSP
                    </span>

                </div>

                {/* Menu */}
                <div className="flex flex-col gap-2 px-3 mt-6">

                    {/* Dashboard */}
                    <NavLink to="/" className={linkStyle} onClick={() => setOpen(false)}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    {/* Notifications */}
                    <NavLink
                        to="/notifications"
                        className={linkStyle}
                        onClick={() => setOpen(false)}
                    >
                        <Bell size={18} />
                        Notifications
                    </NavLink>

                    {/* Analytics */}
                    <NavLink
                        to="/analytics"
                        className={linkStyle}
                        onClick={() => setOpen(false)}
                    >
                        <BarChart3 size={18} />
                        Analytics
                    </NavLink>

                    {/* Users */}
                    <NavLink
                        to="/parameters"
                        className={linkStyle}
                        onClick={() => setOpen(false)}
                    >
                        <Info size={18} />
                        Parameters
                    </NavLink>

                    {/* Users */}
                    <NavLink
                        to="/users"
                        className={linkStyle}
                        onClick={() => setOpen(false)}
                    >
                        <User size={18} />
                        Users
                    </NavLink>

                    {/* Report Parent */}
                    <button
                        onClick={() => setReportOpen(!reportOpen)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition"
                    >
                        <div className="flex items-center gap-3">
                            <FileText size={18} />
                            Report
                        </div>

                        <ChevronDown
                            size={16}
                            className={`transition-transform ${reportOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {/* Submenu */}
                    {reportOpen && (
                        <div className="ml-8 flex flex-col gap-1 text-sm">

                            <NavLink
                                to="/report/offline-logs"
                                className={subLinkStyle}
                                onClick={() => setOpen(false)}
                            >
                                <span className="w-2 h-2 border rounded-full"></span>
                                Offline Logs
                            </NavLink>

                            <NavLink
                                to="/report/sms-logs"
                                className={subLinkStyle}
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