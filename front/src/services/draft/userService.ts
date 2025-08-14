// src/services/draft/userService.ts

import axios from "axios";
import { IUser } from "@/types/User";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const userService = {
  async getById(id: string): Promise<IUser> {
    const { data } = await axios.get(`${BASE_URL}/users/${id}`);
    return data;
  },

  async update(id: string, payload: Partial<Omit<IUser, "id">>) {
    const { data } = await axios.patch(`${BASE_URL}/users/${id}`, payload);
    return data;
  },

  async getAll(): Promise<IUser[]> {
    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
  },

  async remove(id: string) {
    return axios.delete(`${BASE_URL}/users/${id}`);
  },
  async getOrCreateUser(id: string, email: string) {
    try {
      return await this.getById(id);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        const { data } = await axios.post(`${BASE_URL}/users`, { id, email });
        return data;
      }
      throw err;
    }
  },
};
