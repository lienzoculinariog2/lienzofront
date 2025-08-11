import axios from "axios";
import { IUser } from "@/types/User";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const authService = {
  async create(payload: Omit<IUser, "id">) {
    return axios.post(`${BASE_URL}/auth`, payload);
  },
  async getAll(): Promise<IUser[]> {
    const { data } = await axios.get(`${BASE_URL}/auth`);
    return data;
  },
  async getById(id: string): Promise<IUser> {
    const { data } = await axios.get(`${BASE_URL}/auth/${id}`);
    return data;
  },
  async update(id: string, payload: Partial<IUser>) {
    return axios.patch(`${BASE_URL}/auth/${id}`, payload);
  },
  async remove(id: string) {
    return axios.delete(`${BASE_URL}/auth/${id}`);
  },
};
