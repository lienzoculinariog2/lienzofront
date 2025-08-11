import axios from "axios";
import { Order } from "@/types/Order";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const orderService = {
  async create(payload: Omit<Order, "id">) {
    return axios.post(`${BASE_URL}/orders`, payload);
  },
  async getAll(): Promise<Order[]> {
    const { data } = await axios.get(`${BASE_URL}/orders`);
    return data;
  },
  async getById(id: string): Promise<Order> {
    const { data } = await axios.get(`${BASE_URL}/orders/${id}`);
    return data;
  },
  async update(id: string, payload: Partial<Omit<Order, "id">>) {
    return axios.patch(`${BASE_URL}/orders/${id}`, payload);
  },
  async remove(id: string) {
    return axios.delete(`${BASE_URL}/orders/${id}`);
  },
};
