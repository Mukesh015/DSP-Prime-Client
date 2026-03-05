import { useEffect, useState } from "react";
import { getSMSReportLogs } from "../../api/report";
import { formatDateTime } from "../../utils/dateTime";

interface SMSLog {
    id: number;
    tank_no: string;
    user: string;
    phone: string;
    report: string;
    time: string;
    status: "Sent" | "Failed";
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
}

const SMSLogs = () => {

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [logs, setLogs] = useState<SMSLog[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const handleFetchLogs = async () => {
        try {

            const res = await getSMSReportLogs(page, limit);

            setLogs(res.data);
            setPagination(res.pagination);

        } catch (error) {
            console.error("Error fetching SMS logs:", error);
        }
    };

    useEffect(() => {
        handleFetchLogs();
    }, [page]);

    const totalPages = pagination
        ? Math.ceil(pagination.total / pagination.limit)
        : 1;

    return (
        <div className="bg-white rounded-xl shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">

                <h2 className="text-xl font-semibold text-gray-700">
                    SMS Logs
                </h2>

                <button
                    onClick={() => { }}
                    className="border border-pink-500 text-pink-500 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    EXPORT TO CSV
                </button>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-gray-600">

                        <tr>
                            <th className="px-6 py-3 text-left">SL</th>
                            <th className="px-6 py-3 text-left">TANK</th>
                            <th className="px-6 py-3 text-left">USER</th>
                            <th className="px-6 py-3 text-left">PHONE</th>
                            <th className="px-6 py-3 text-left">REPORT</th>
                            <th className="px-6 py-3 text-left">TIME</th>
                            <th className="px-6 py-3 text-left">STATUS</th>
                        </tr>

                    </thead>

                    <tbody>

                        {logs.map((log, i) => (

                            <tr
                                key={log.id}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >

                                <td className="px-6 py-4">
                                    {(page - 1) * limit + i + 1}
                                </td>

                                <td className="px-6 py-4">{log.tank_no}</td>

                                <td className="px-6 py-4">{log.user}</td>

                                <td className="px-6 py-4">{log.phone}</td>

                                <td className="px-6 py-4">{log.report}</td>

                                <td className="px-6 py-4">
                                    {formatDateTime(log.time)}
                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${log.status === "Sent"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {log.status}
                                    </span>

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
        </div>
    );
};

export default SMSLogs;