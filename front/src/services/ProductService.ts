// src/services/productService.ts
import axios from "axios";
import { IProduct } from "@/types/Product";
import { ICategories } from "@/types/Categories";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  // Obtener todos los productos con filtros opcionales
  async getAll(params?: { name?: string; categoryId?: string; ingredient?: string }): Promise<IProduct[]> {
    try {
      const { data } = await api.get<IProduct[]>("/products", { params });
      return data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  },

  // Obtener un producto por ID
  async getById(id: string): Promise<IProduct> {
    const { data } = await api.get<IProduct>(`/products/${id}`);
    return data;
  },

  // Obtener productos por categoría
  async getByCategoryId(categoryId: string): Promise<IProduct[]> {
    try {
      const { data } = await api.get<IProduct[]>(`/products?categoryId=${categoryId}`);
      return data;
    } catch (error) {
      console.error(`Error al obtener productos de la categoría ${categoryId}:`, error);
      return [];
    }
  },

  // Actualizar producto
  async update(id: string, productData: Partial<IProduct>): Promise<IProduct> {
    try {
      const { data } = await api.put<IProduct>(`/products/${id}`, productData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al actualizar el producto:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al actualizar el producto");
      }
    }
  },

  // Inactivar producto
  async inactivate(id: string): Promise<IProduct> {
    try {
      const { data } = await api.put<IProduct>(`/products/inactivate/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al inactivar el producto:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al inactivar el producto");
      }
    }
  },

  // Crear producto sin imagen
  async create(product: IProduct): Promise<IProduct> {
    try {
      const payload = {
        ...product,
        categoryId: product.category?.id,
      };
      const { data } = await api.post<IProduct>("/products", payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al crear el producto:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al crear el producto");
      }
    }
  },

  // Crear producto con imagen
  async createWithImage(formData: FormData): Promise<IProduct> {
    try {
      const { data } = await api.post<IProduct>("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al crear el producto con imagen:", error.response?.data || error.message);
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al crear el producto");
      }
    }
  },


    updateWithImage: async (id: string, formData: FormData): Promise<ICategories> => {
    const { data } = await api.put<ICategories>(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async getPaginatedAndFiltered(params: { page: number, limit: number, category: string, term: string }): Promise<{ products: IProduct[], totalPages: number }> {
    // Aquí tu llamada al backend. Ejemplo con fetch:
    const response = await fetch(`/api/products?page=${params.page}&limit=${params.limit}&category=${params.category}&term=${params.term}`);
    const data = await response.json(); // data ahora contiene { products: [], total: number }

    const totalPages = Math.ceil(data.total / params.limit);

    return { products: data.products, totalPages };
}

};


