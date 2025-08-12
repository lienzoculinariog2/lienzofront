import { ICategories } from "@/types/Categories";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllCategories = {
  async getAll(): Promise<ICategories[]> {
    try {
      const { data } = await api.get<ICategories[]>("/categories");
      console.log('Datos de categorías recibidos:', data); 
      return data;
    } catch (error) {
      console.error("Error en la llamada a la API de categorías:", error); 
      return []; 
    }
  },
};
