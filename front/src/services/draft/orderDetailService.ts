import axios from "axios";
import { IOrdersDetail } from "@/types/OrdersDetail";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const orderDetailService = {
  async create(payload: Omit<IOrdersDetail, "id">) {
    return axios.post(`${BASE_URL}/order-details`, payload);
  },
  async getAll(): Promise<IOrdersDetail[]> {
    const { data } = await axios.get(`${BASE_URL}/order-details`);
    return data;
  },
  async getById(id: string): Promise<IOrdersDetail> {
    const { data } = await axios.get(`${BASE_URL}/order-details/${id}`);
    return data;
  },
  async update(id: string, payload: Partial<Omit<IOrdersDetail, "id">>) {
    return axios.patch(`${BASE_URL}/order-details/${id}`, payload);
  },
  async remove(id: string) {
    return axios.delete(`${BASE_URL}/order-details/${id}`);
  },
};
