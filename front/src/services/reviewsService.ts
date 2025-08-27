// services/reviewsService.ts
import axios from "axios";
import { IReview } from "@/types/Review";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

// Define un tipo para los datos que se enviarán al crear una reseña
// Usamos Omit para excluir el 'id' y otras propiedades que el backend genera
type CreateReviewDto = Omit<IReview, "id" | "productId">;

// Función para obtener todas las reseñas
export const getAllReviews = async (): Promise<IReview[]> => {
  try {
    const response = await axios.get<IReview[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reseñas:", error);
    return [];
  }
};

// Función para crear una nueva reseña
export const createReview = async (
  newReviewData: CreateReviewDto
): Promise<IReview | null> => {
  try {
    // Axios maneja automáticamente la serialización del cuerpo a JSON
    const response = await axios.post<IReview>(API_BASE_URL, newReviewData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    return null;
  }
};
