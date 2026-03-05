import { Bell, Menu } from "lucide-react";
import React from "react";

interface Props {
    onMenuClick?: () => void;
}

const Header: React.FC<Props> = ({ onMenuClick }) => {
    return (
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

            {/* Left Section */}
            <div className="flex items-center gap-4">

                {/* Hamburger (mobile only) */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>

                <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Aqua Sense System
                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Notifications */}
                <div className="relative cursor-pointer">
                    <Bell className="w-6 h-6 text-gray-600" />

                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        6
                    </span>
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