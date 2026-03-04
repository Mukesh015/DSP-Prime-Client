import { api } from "./axios";

export const fetchDashboardStats = async () => {
    try {
        const response = await api.get("/dashboard/stats");
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
    }
};

export const fetchTanksData = async () => {
    try {
        const response = await api.get("/tanks");
        return response.data;
    } catch (error) {
        console.error("Error fetching tanks data:", error);
        throw error;
    }
};