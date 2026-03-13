import { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { downloadNotificationsPDF } from "../../utils/exportPDF";
import downloadOfflineLogsExcel from "../../utils/downloadOfflineLogsExcel";

interface Props {
    open: boolean;
    onClose: () => void;
    onExport: (start: string, end: string) => Promise<any[]>;
    type: "report" | "notification";
}

const ExportModal = ({ open, onClose, onExport, type }: Props) => {

    const [showPicker, setShowPicker] = useState(false);

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);

    if (!open) return null;

    const start = format(range[0].startDate!, "yyyy-MM-dd");
    const end = format(range[0].endDate!, "yyyy-MM-dd");

    const formatDate = (date: Date | undefined) => {
        if (!date) return "";
        return format(date, "yyyy-MM-dd");
    };

    const handleExportData = async () => {
        try {
            const data = await onExport(start, end);
            if (type === "notification") {
                downloadNotificationsPDF(data);
            } else {
                downloadOfflineLogsExcel(data);
            }
        } catch (err) {
            console.error(err);
        }
        onClose();
    };

    console.log('start', start)
    console.log('end', end)

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-105 relative">

                <h2 className="text-lg font-semibold mb-4">
                    Export Data
                </h2>

                <div className="flex flex-col gap-4">

                    {/* Date Range */}
                    <div className="relative">

                        <label className="text-sm font-medium text-gray-600">
                            Select Date Range
                        </label>

                        <input
                            readOnly
                            onClick={() => setShowPicker(!showPicker)}
                            value={`${formatDate(range[0].startDate)} to ${formatDate(
                                range[0].endDate
                            )}`}
                            className="mt-2 border border-gray-200 rounded-lg px-4 py-2 w-full cursor-pointer"
                        />

                        {showPicker && (
                            <div className="absolute top-16 z-50 shadow-lg">

                                <DateRange
                                    editableDateInputs
                                    onChange={(item: any) => setRange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={range}
                                />

                            </div>
                        )}

                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => handleExportData()}
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                        Download
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ExportModal;