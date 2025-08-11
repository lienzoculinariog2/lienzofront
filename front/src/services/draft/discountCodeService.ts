import axios from "axios";
import { IDiscountCode } from "@/types/DiscountCode";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const discountCodeService = {
  async create(payload: Omit<IDiscountCode, "id">) {
    return axios.post(`${BASE_URL}/discount-codes`, payload);
  },
  async getAll(): Promise<IDiscountCode[]> {
    const { data } = await axios.get(`${BASE_URL}/discount-codes`);
    return data;
  },
  async getById(id: string): Promise<IDiscountCode> {
    const { data } = await axios.get(`${BASE_URL}/discount-codes/${id}`);
    return data;
  },
  async update(id: string, payload: Partial<Omit<IDiscountCode, "id">>) {
    return axios.patch(`${BASE_URL}/discount-codes/${id}`, payload);
  },
  async remove(id: string) {
    return axios.delete(`${BASE_URL}/discount-codes/${id}`);
  },
};
