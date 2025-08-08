import axios from "axios";
import { IProduct } from "@/types/Product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productPoster = {
  async create(product: IProduct): Promise<IProduct> {
    try {
      const { data } = await api.post<IProduct>("/products", product);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error al crear el producto:",
          error.response?.data || error.message
        );
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al crear el producto");
      }
    }
  },
};
