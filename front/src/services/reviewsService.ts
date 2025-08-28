import axios from "axios";
import { IReview } from "@/types/Review";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

// DTO para crear reseñas (lo que espera tu back)
export interface CreateReviewDto {
  userId: string;
  comment: string;
  rating: number;
  productId?: string;
}

// Obtener todas las reseñas
export const getAllReviews = async (): Promise<IReview[]> => {
  try {
    const response = await axios.get<IReview[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reseñas:", error);
    return [];
  }
};

// Obtener reseñas de un usuario específico
export const getReviewsByUser = async (userId: string): Promise<IReview[]> => {
  try {
    const response = await axios.get<IReview[]>(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener reseñas del usuario ${userId}:`, error);
    return [];
  }
};

// Crear una nueva reseña
export const createReview = async (
  newReviewData: CreateReviewDto
): Promise<IReview | null> => {
  try {
    const response = await axios.post<IReview>(API_BASE_URL, newReviewData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    return null;
  }
};

// Eliminar una reseña
export const deleteReview = async (id: string): Promise<string | null> => {
  try {
    const response = await axios.delete<{ message: string }>(`${API_BASE_URL}/${id}`);
    return response.data.message;
  } catch (error) {
    console.error(`Error al eliminar la reseña ${id}:`, error);
    return null;
  }
};

