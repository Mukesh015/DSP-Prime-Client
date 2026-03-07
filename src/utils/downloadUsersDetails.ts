import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
}

export const downloadUsersPDF = (users: User[]) => {
    const doc = new jsPDF("landscape");

    doc.setFontSize(16);
    doc.text("Users Report", 14, 15);

    const rows = users.map((user, index) => [
        index + 1,
        user.name,
        user.email,
        user.phone,
        user.role
    ]);

    autoTable(doc, {
        startY: 25,

        head: [[
            "SL NO",
            "NAME",
            "E-MAIL",
            "PHONE NUMBER",
            "ROLE"
        ]],

        body: rows,

        styles: {
            fontSize: 10
        },

        headStyles: {
            fillColor: [79, 70, 229] // same indigo color
        }
    });

    doc.save("users_report.pdf");
};