import {
  ICategories,
  ICategoryCreate,
  ICategoryUpdate,
} from "@/types/Categories";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const categoriesServices = {
  // Obtener todas las categorías con paginación opcional
  async getAll(page?: number, limit?: number): Promise<ICategories[]> {
    try {
      const params: { page?: number; limit?: number } = {};
      if (page !== undefined) params.page = page;
      if (limit !== undefined) params.limit = limit;

      const { data } = await api.get<ICategories[]>("/categories", { params });
      return data;
    } catch (error) {
      console.error("Error en la llamada a la API de categorías:", error);
      return [];
    }
  },

  // Obtener categoría por ID
  async getById(id: string): Promise<ICategories | null> {
    try {
      const { data } = await api.get<ICategories>(`/categories/${id}`);
      return data;
    } catch (error) {
      console.error(`Error al obtener la categoría con ID ${id}:`, error);
      return null;
    }
  },

  // Crear categoría (con o sin imagen)
  async create(
    category: ICategoryCreate,
    file?: File
  ): Promise<{ message: string; category: ICategories }> {
    try {
      const formData = new FormData();
      Object.entries(category).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });
      if (file) {
        formData.append("file", file);
      }

      const { data } = await api.post<{
        message: string;
        category: ICategories;
      }>("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      throw error;
    }
  },

  // Actualizar categoría (con o sin imagen)
  async update(
    id: string,
    category: ICategoryUpdate,
    file?: File
  ): Promise<{ message: string; updatedCategory: ICategories }> {
    try {
      const formData = new FormData();
      Object.entries(category).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });
      if (file) {
        formData.append("file", file);
      }

      const { data } = await api.put<{
        message: string;
        updatedCategory: ICategories;
      }>(`/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    } catch (error) {
      console.error(`Error al actualizar la categoría con ID ${id}:`, error);
      throw error;
    }
  },

  // Inactivar categoría
  async inactivate(
    id: string
  ): Promise<{ message: string; category: ICategories }> {
    try {
      const { data } = await api.put<{
        message: string;
        category: ICategories;
      }>(`/categories/inactivate/${id}`);
      return data;
    } catch (error) {
      console.error(`Error al inactivar la categoría con ID ${id}:`, error);
      throw error;
    }
  },

  
  // Activar categoría
async activate(
  id: string
): Promise<{ message: string; category: ICategories }> {
  try {
    const { data } = await api.put<{
      message: string;
      category: ICategories;
    }>(`/categories/activate/${id}`);
    return data;
  } catch (error) {
    console.error(`Error al activar la categoría con ID ${id}:`, error);
    throw error;
  }
},

  async createWithImage(formData: FormData): Promise<ICategories> {
    try {
      const { data } = await api.post<ICategories>("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error al crear la categoría con imagen:",
          error.response?.data || error.message
        );
        throw new Error(error.message);
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Error desconocido al crear la categoría");
      }
    }
  },

  async updateWithImage(id: string, formData: FormData): Promise<ICategories> {
  try {
    const { data } = await api.put<ICategories>(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error al actualizar la categoría con imagen:",
        error.response?.data || error.message
      );
      throw new Error(error.message);
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Error desconocido al actualizar la categoría");
    }
  }
}
};
