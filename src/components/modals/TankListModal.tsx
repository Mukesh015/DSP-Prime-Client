import React from "react";

interface TankItem {
    tank_no: string;
    location: string;
}

interface Props {
    title: string;
    tanks: TankItem[];
    onClose: () => void;
}

const TankListModal: React.FC<Props> = ({ title, tanks, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-162.5 rounded-xl shadow-lg">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Table */}
                <div className="p-6 max-h-112.5 overflow-y-auto">

                    <table className="w-full text-left">

                        <thead className="bg-gray-100 text-gray-600 text-sm">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">TANK NAME</th>
                                <th className="p-3">LOCATION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tanks.map((tank, index) => (
                                <tr key={index} className="border-b border-gray-200 text-gray-00">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{tank.tank_no}</td>
                                    <td className="p-3">{tank.location}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 pb-6">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TankListModal;