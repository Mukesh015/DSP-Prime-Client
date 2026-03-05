import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Notification {
    id: number;
    tank_no: string;
    type: string;
    created_at: string;
}

export const downloadNotificationsPDF = (data: Notification[]) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Offline Logs", 14, 20);

    const tableData = data.map((item, index) => [
        index + 1,
        item.tank_no,
        item.type,
        new Date(item.created_at).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
        }),
    ]);

    autoTable(doc, {
        startY: 30,
        head: [["SL NO", "Tank Name", "Notification Type", "Timestamp"]],
        body: tableData,
    });

    doc.save("offline_logs.pdf");
};