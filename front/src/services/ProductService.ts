import axios from "axios";
import { IProduct } from "@/types/Product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  async getAll(): Promise<IProduct[]> {
    const { data } = await api.get<IProduct[]>("/products");
    return data;
  },

  async getById(id: string): Promise<IProduct> {
    const { data } = await api.get<IProduct>(`/products/${id}`);
    return data;
  },
};
