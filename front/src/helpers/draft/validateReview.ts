import { IReview } from "@/types/Review";

export function validateReview(data: Partial<IReview>) {
  const errors: Record<string, string> = {};

  // Comentario
  if (!data.comment || data.comment.trim() === "") {
    errors.comment = "El comentario es obligatorio";
  } else if (data.comment.length > 255) {
    errors.comment = "El comentario no puede superar los 255 caracteres";
  }

  // Rating
  if (
    data.rating === undefined ||
    isNaN(Number(data.rating)) ||
    Number(data.rating) < 1 ||
    Number(data.rating) > 5
  ) {
    errors.rating = "La calificación debe ser un número entre 1 y 5";
  }

  // Producto
  if (!data.productId || data.productId.trim() === "") {
    errors.productId = "El ID del producto es obligatorio";
  }

  // Usuario
  if (!data.userId || data.userId.trim() === "") {
    errors.userId = "El ID del usuario es obligatorio";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
