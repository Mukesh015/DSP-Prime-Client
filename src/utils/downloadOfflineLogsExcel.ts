import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { formatDateTime } from "./dateTime";

interface OfflineLog {
    id: number;
    tank_no: string;
    offline_time: string;
    online_time: string;
    offline_period: string;
}

const downloadOfflineLogsExcel = (logs: OfflineLog[]) => {

    const data = logs.map((log, index) => ({
        "SL NO": index + 1,
        "TANK NAME": log.tank_no,
        "OFFLINE TIME": formatDateTime(log.offline_time),
        "ONLINE TIME": formatDateTime(log.online_time),
        "OFFLINE PERIOD": log.offline_period
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Offline Logs");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const fileData = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(fileData, "offline_logs.xlsx");
};

export default downloadOfflineLogsExcel;