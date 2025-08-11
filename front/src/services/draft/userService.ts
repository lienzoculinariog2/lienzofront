import axios from "axios";
import { IUser } from "@/types/User";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const userService = {
  async getAll(): Promise<IUser[]> {
    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
  },

  async getById(id: string): Promise<IUser> {
    const { data } = await axios.get(`${BASE_URL}/users/${id}`);
    return data;
  },

  async update(id: string, payload: Partial<Omit<IUser, "id">>) {
    return axios.patch(`${BASE_URL}/users/${id}`, payload);
  },

  async remove(id: string) {
    return axios.delete(`${BASE_URL}/users/${id}`);
  },
};
