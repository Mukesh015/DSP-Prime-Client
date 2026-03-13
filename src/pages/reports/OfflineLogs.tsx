import { useEffect, useState } from "react";
import { exportOfflineReport, getOfflineReport } from "../../api/report";
import { formatDateTime } from "../../utils/dateTime";
import downloadOfflineLogsExcel from "../../utils/downloadOfflineLogsExcel";
import ExportModal from "../../components/modals/ExportModal";

interface OfflineLog {
    id: number;
    tank_no: string;
    offline_time: string;
    online_time: string;
    offline_period: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const OfflineLogs = () => {
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [logs, setLogs] = useState<OfflineLog[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const [showExportModal, setShowExportModal] = useState(false);

    const fetchOfflineLogs = async () => {
        try {
            const res = await getOfflineReport(page, limit, search);

            setLogs(res.data);
            setPagination(res.pagination);
        } catch (error) {
            console.error("Error fetching offline logs:", error);
        }
    };

    const handleExport = async (start: string, end: string): Promise<any[]> => {
        try {
            const res = await exportOfflineReport(start, end);
            return res.data || []; // Return the data to be exported
        } catch (error) {
            console.error("Error exporting logs:", error);
            return [];
        }
    }

    useEffect(() => {
        fetchOfflineLogs();
    }, [page, limit, search]);

    const totalPages = pagination?.totalPages || 1;

    return (
        <div className="bg-white rounded-xl shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">

                <h2 className="text-xl font-semibold text-gray-700">
                    Offline Logs
                </h2>

                <div className="flex gap-3">

                    <button
                        onClick={() => setShowExportModal(true)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                    >
                        Export
                    </button>

                    <button
                        onClick={() => downloadOfflineLogsExcel(logs)}
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
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border border-gray-200 rounded px-2 py-1"
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
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="border border-gray-200 rounded px-3 py-1.5"
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
                            <th className="px-6 py-3 text-left">OFFLINE TIME</th>
                            <th className="px-6 py-3 text-left">ONLINE TIME</th>
                            <th className="px-6 py-3 text-left">OFFLINE PERIOD</th>

                        </tr>

                    </thead>

                    <tbody>

                        {logs.map((row, i) => (

                            <tr
                                key={row.id}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >

                                <td className="px-6 py-4">
                                    {(page - 1) * limit + i + 1}
                                </td>

                                <td className="px-6 py-4">
                                    {row.tank_no}
                                </td>

                                <td className="px-6 py-4">
                                    {formatDateTime(row.offline_time)}
                                </td>

                                <td className="px-6 py-4">
                                    {formatDateTime(row.online_time)}
                                </td>

                                <td className="px-6 py-4">
                                    {row.offline_period}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500">

                <span>
                    Showing {(page - 1) * limit + 1} to{" "}
                    {Math.min(page * limit, pagination?.total || 0)} of{" "}
                    {pagination?.total || 0} entries
                </span>

                {/* Pagination */}
                <div className="flex items-center gap-2">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 border border-gray-200 rounded disabled:opacity-40"
                    >
                        ‹ Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(Math.max(0, page - 2), page + 1)
                        .map((p) => (

                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-3 py-1 rounded ${p === page
                                    ? "bg-indigo-500 text-white"
                                    : "border border-gray-200"
                                    }`}
                            >
                                {p}
                            </button>

                        ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 border border-gray-200 rounded disabled:opacity-40"
                    >
                        Next ›
                    </button>

                </div>

            </div>

            <ExportModal type="report" onExport={handleExport} open={showExportModal} onClose={() => setShowExportModal(false)} />

        </div>
    );
};

export default OfflineLogs;