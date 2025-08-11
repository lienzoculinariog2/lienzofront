import axios from "axios";
import { IReview } from "@/types/Review";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const reviewService = {
  async create(payload: Omit<IReview, "id">) {
    return axios.post(`${BASE_URL}/reviews`, payload);
  },
  async getAll(): Promise<IReview[]> {
    const { data } = await axios.get(`${BASE_URL}/reviews`);
    return data;
  },
  async getById(id: string): Promise<IReview> {
    const { data } = await axios.get(`${BASE_URL}/reviews/${id}`);
    return data;
  },
  async update(id: string, payload: Partial<Omit<IReview, "id">>) {
    return axios.patch(`${BASE_URL}/reviews/${id}`, payload);
  },
  async remove(id: string) {
    return axios.delete(`${BASE_URL}/reviews/${id}`);
  },
};
