import { api } from "./axios";

export const getOfflineReport = async (page: number, limit: number, search?: string) => {
    try {
        const response = await api.get("/reports/offline", { params: { page, limit, search } });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching offline report:", error);
        throw error;
    }

};

export const getSMSReportLogs = async (page: number, limit: number, search?: string) => {
    try {
        const response = await api.get("/reports/sms", { params: { page, limit, search } });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching SMS report:", error);
        throw error;
    }

};

export const exportOfflineReport = async (start: string, end: string) => {
    try {
        const response = await api.get("/reports/offline/export", { params: { start, end } });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching offline report:", error);
        throw error;
    }
};

export const exportSMSReportLogs = async (start: string, end: string) => {
    try {
        const response = await api.get("/reports/sms/export", { params: { start, end } });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching SMS report:", error);
        throw error;
    }
};