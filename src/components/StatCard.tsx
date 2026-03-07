import React from "react";

interface Props {
    title: string;
    value: number;
    clickable?: boolean;
    icon?: React.ReactNode;
}

const StatCard: React.FC<Props> = ({ title, value, icon }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center w-full">
            <div>
                <p className="text-3xl font-semibold">{value}</p>
                <p className="text-gray-500">{title}</p>
            </div>

            <div className="bg-indigo-100 text-indigo-500 w-12 h-12 flex items-center justify-center rounded-full">
                {icon || "⚙️"}
            </div>
        </div>
    );
};

export default StatCard;