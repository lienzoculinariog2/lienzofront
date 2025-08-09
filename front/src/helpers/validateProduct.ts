import { IProduct } from "@/types/Product";

const validCaloricLevels = [1, 2, 3, 4, 5];

export function validateProduct(data: Partial<IProduct>) {
  const errors: Record<string, string> = {};

  // Nombre
  if (!data.name || data.name.trim() === "") {
    errors.name = "El nombre es obligatorio";
  }

  // Descripción
  if (!data.description || data.description.trim() === "") {
    errors.description = "La descripción es obligatoria";
  }

  // Precio
  if (
    data.price === undefined ||
    isNaN(Number(data.price)) ||
    Number(data.price) <= 0
  ) {
    errors.price = "El precio debe ser un número mayor a 0";
  }

  // Stock
  if (
    data.stock === undefined ||
    isNaN(Number(data.stock)) ||
    Number(data.stock) < 0
  ) {
    errors.stock = "El stock debe ser un número igual o mayor a 0";
  }

  // Imagen
  /* if (!data.imgUrl || data.imgUrl.trim() === "") {
    errors.imgUrl = "La URL de la imagen es obligatoria";
  } */

  // Estado activo
  if (typeof data.isActive !== "boolean") {
    errors.isActive = "El estado activo debe ser verdadero o falso";
  }

  // Categoría
  if (!data.category || !data.category.id?.trim()) {
    errors.category = "La categoría debe tener ID válido";
  }

  // Nivel calórico
  if (
    data.caloricLevel === undefined ||
    !validCaloricLevels.includes(Number(data.caloricLevel))
  ) {
    errors.caloricLevel = "El nivel calórico debe ser un número entre 1 y 5";
  }

  // Ingredientes
  if (!Array.isArray(data.ingredients) || data.ingredients.length === 0) {
    errors.ingredients = "Debe incluir al menos un ingrediente";
  } else if (
    data.ingredients.some((i) => typeof i !== "string" || i.trim() === "")
  ) {
    errors.ingredients = "Todos los ingredientes deben ser textos válidos";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
