import type { User } from "../types/tank";
import { api } from "./axios";

export const getAllUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const updateUser = async (user: User) => {
    try {
        const response = await api.put(`/users/${user.id}`, user);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const addUser = async (user: User) => {
    try {
        const response = await api.post("/users", user);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

export const deleteUser = async (id: number) => {
    try {
        await api.delete(`/users/${id}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}