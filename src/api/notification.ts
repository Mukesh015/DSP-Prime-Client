import { api } from './axios';

export const getNotifications = async (page: number, limit: number, search: string) => {
    try {
        const response = await api.get('/notifications', {
            params: {
                page,
                limit,
                search
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const exportLogs = async (start: string, end: string) => {
    try {
        const response = await api.get('/notifications/export', {
            params: {
                start,
                end
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error exporting logs:', error);
        throw error;
    }
};