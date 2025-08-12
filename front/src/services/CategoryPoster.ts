import axios from "axios";
import { ICategories } from "@/types/Categories";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const categoryPoster = {
  async createWithImage(formData: FormData): Promise<ICategories> {
    try {
      const { data } = await api.post<ICategories>(`${BASE_URL}/categories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error al crear la categoría con imagen:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al crear la categoría");
      }
    }
  },
};
