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
  // ✅ ACTUALIZADO: `getAll` ahora puede recibir parámetros de búsqueda y filtro
  async getAll(params?: { name?: string; categoryId?: string; ingredient?: string }): Promise<IProduct[]> {
    try {
      const { data } = await api.get<IProduct[]>("/products", { params });
      return data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  },

  async getById(id: string): Promise<IProduct> {
    const { data } = await api.get<IProduct>(`/products/${id}`);
    return data;
  },

  async getByCategoryId(categoryId: string): Promise<IProduct[]> {
    try {
      const { data } = await api.get<IProduct[]>(`/products?categoryId=${categoryId}`);
      return data;
    } catch (error) {
      console.error(`Error al obtener productos de la categoría ${categoryId}:`, error);
      return [];
    }
  },

  // ✅ NUEVO: Servicio para actualizar un producto
  async update(id: string, productData: Partial<IProduct>): Promise<IProduct> {
    try {
      const { data } = await api.put<IProduct>(`/products/${id}`, productData);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error al actualizar el producto:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al actualizar el producto");
      }
    }
  },

  // ✅ NUEVO: Servicio para inactivar un producto
  async inactivate(id: string): Promise<IProduct> {
    try {
      const { data } = await api.put<IProduct>(`/products/inactivate/${id}`);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error al inactivar el producto:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al inactivar el producto");
      }
    }
  },
};

