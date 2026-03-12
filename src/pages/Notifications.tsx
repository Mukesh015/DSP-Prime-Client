import { useEffect, useState } from "react";
import { exportLogs, getNotifications } from "../api/notification";
import { formatDateTime } from "../utils/dateTime";
import { downloadNotificationsPDF } from "../utils/exportPDF";
import ExportModal from "../components/modals/ExportModal";

interface Notification {
    id: number;
    tank_no: string;
    device_id: string;
    type: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

const Notifications = () => {
    const [data, setData] = useState<Notification[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [exportOpen, setExportOpen] = useState(false);

    const fetchData = async () => {
        try {
            const res = await getNotifications(page, limit, search);
            setData(res.data);
            setTotal(res.pagination.total);
        } catch (err) {
            console.error(err);
        }
    };

    const handleExport = async (start: string, end: string): Promise<any[]> => {
        try {
            const res = await exportLogs(start, end);
            return res.data || [];
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, limit, search]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="bg-white rounded-xl shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border border-gray-200 -b">

                <h2 className="text-xl font-semibold text-gray-700">
                    Offline Logs
                </h2>

                <div className="flex gap-3">
                    <button onClick={() => setExportOpen(true)} className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
                        Export
                    </button>

                    <button
                        onClick={() => downloadNotificationsPDF(data)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                    >
                        Print Table
                    </button>
                </div>

            </div>

            {/* Filters */}
            <div className="flex justify-between items-center px-6 py-4">

                <div className="flex items-center gap-2 text-gray-600">
                    Show

                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="border border-gray-200  rounded px-2 py-1"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>

                    entries
                </div>

                <div className="flex items-center gap-2">

                    <span className="text-gray-600">Search:</span>

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-200  rounded px-3 py-1.5"
                    />

                </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-gray-600">
                        <tr>

                            <th className="px-6 py-3 text-left">SL. NO.</th>
                            <th className="px-6 py-3 text-left">TANK NAME</th>
                            <th className="px-6 py-3 text-left">NOTIFICATION TYPE</th>
                            <th className="px-6 py-3 text-left">TIMESTAMP</th>

                        </tr>
                    </thead>

                    <tbody>

                        {data.map((item, i) => (
                            <tr key={item.id} className="border border-gray-200 -b hover:bg-gray-50">

                                <td className="px-6 py-4">
                                    {(page - 1) * limit + i + 1}
                                </td>

                                <td className="px-6 py-4">
                                    {item.tank_no}
                                </td>

                                <td className="px-6 py-4 capitalize">
                                    {item.type === "overflow" ? "High Level" : item.type === "underflow" ? "Low Level" : item.type === "offline" ? "Network Lag" : item.type}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {formatDateTime(item.created_at)}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 px-6 py-4">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 border border-gray-200  rounded disabled:opacity-40"
                >
                    Prev
                </button>

                <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 border border-gray-200  rounded disabled:opacity-40"
                >
                    Next
                </button>

            </div>

            <ExportModal
                open={exportOpen}
                onClose={() => setExportOpen(false)}
                onExport={handleExport}
                type="notification"
            />

        </div>
    );
};

export default Notifications;