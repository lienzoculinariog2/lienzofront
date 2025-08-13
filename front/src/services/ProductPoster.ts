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
      const payload = {
        ...product,
        categoryId: product.category?.id,
      };

      const { data } = await api.post<IProduct>("/products", payload);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error al crear el producto:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al crear el producto");
      }
    }
  },

  async createWithImage(formData: FormData): Promise<IProduct> {
    try {
      const { data } = await axios.post<IProduct>(`${BASE_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error al crear el producto con imagen:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al crear el producto");
      }
    }
  },
};
