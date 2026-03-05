import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDateTime } from "./dateTime";

interface OfflineLog {
    id: number;
    tank_no: string;
    offline_time: string;
    online_time: string;
    offline_period: string;
}

export const downloadOfflineLogsPDF = (logs: OfflineLog[]) => {

    const doc = new jsPDF("landscape");

    doc.setFontSize(16);
    doc.text("Offline Logs Report", 14, 15);

    const rows = logs.map((log, index) => [
        index + 1,
        log.tank_no,
        formatDateTime(log.offline_time),
        formatDateTime(log.online_time),
        log.offline_period
    ]);

    autoTable(doc, {
        startY: 25,

        head: [[
            "SL NO",
            "TANK NAME",
            "OFFLINE TIME",
            "ONLINE TIME",
            "OFFLINE PERIOD"
        ]],

        body: rows,

        styles: {
            fontSize: 9
        },

        headStyles: {
            fillColor: [79, 70, 229] // indigo
        }
    });

    doc.save("offline_logs.pdf");
};