import { Bell } from "lucide-react";
import React from "react";

const Header: React.FC = () => {
    return (
        <div className="bg-white shadow-sm p-5 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-700">
                Smart Aqua Sense System
            </h1>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                        6
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-gray-600">Admin</span>
                    <img
                        src="https://i.pravatar.cc/40"
                        className="w-9 h-9 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;