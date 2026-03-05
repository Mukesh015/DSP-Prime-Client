import { Bell, Menu, AlertTriangle, X } from "lucide-react";
import React, { useState } from "react";
import { getNotifications } from "../api/notification";
import { useNavigate } from "react-router-dom";

interface Props {
    onMenuClick?: () => void;
}

interface Notification {
    id: number;
    tank_no: string;
    device_id: string;
    type: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

const Header: React.FC<Props> = ({ onMenuClick }) => {

    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleFetchNotifications = async () => {
        try {
            setLoading(true);

            const res = await getNotifications(1, 10, "");
            setNotifications(res.data);

            setOpen(true);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-4">

                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>

                <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Aqua Sense System
                </h1>

            </div>

            {/* Right */}
            <div className="flex items-center gap-6">

                {/* Notification Bell */}
                <div className="relative">

                    <button
                        onClick={handleFetchNotifications}
                        className="relative"
                    >
                        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />

                        {notifications.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-4 w-105 bg-white rounded-xl shadow-xl z-50">

                            {/* Header */}
                            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-300">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Notifications
                                </h3>

                                <X className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setOpen(false)} />
                            </div>

                            {/* Body */}
                            <div className="max-h-105 overflow-y-auto">

                                {loading && (
                                    <div className="flex justify-center py-8">
                                        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}

                                {!loading && notifications.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        No notifications
                                    </div>
                                )}

                                {!loading && notifications.map((n) => (
                                    <div
                                        key={n.id}
                                        className="flex items-start gap-4 px-5 py-4 border-b border-gray-200 hover:bg-gray-50"
                                    >

                                        <div className="bg-orange-100 p-2 rounded-full">
                                            <AlertTriangle className="text-orange-500 w-4 h-4" />
                                        </div>

                                        <div className="flex flex-col">

                                            <span className="text-gray-700 font-medium">
                                                {n.tank_no} - {n.type}
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                {n.message}
                                            </span>

                                            <span className="text-xs text-gray-400">
                                                {new Date(n.created_at).toLocaleString("en-IN", {
                                                    timeZone: "Asia/Kolkata"
                                                })}
                                            </span>

                                        </div>

                                    </div>
                                ))}

                            </div>

                            {/* Footer */}
                            <div className="p-4">
                                <button onClick={() => navigate("/notifications")} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg">
                                    Read all notifications
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <span className="text-gray-600 hidden sm:block">
                        Admin
                    </span>

                    <img
                        src="https://i.pravatar.cc/40"
                        className="w-9 h-9 rounded-full border"
                        alt="profile"
                    />
                </div>

            </div>

        </div>
    );
};

export default Header;