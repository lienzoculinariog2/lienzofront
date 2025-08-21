import { IDiscountCode } from "@/types/DiscountCode";

export function validateDiscountCode(data: Partial<IDiscountCode>) {
  const errors: Record<string, string> = {};

  if (!data.code || data.code.trim() === "") {
    errors.code = "El código es obligatorio";
  }

  if (
    data.percentage === undefined ||
    isNaN(Number(data.percentage)) ||
    Number(data.percentage) <= 0 ||
    Number(data.percentage) > 100
  ) {
    errors.percentage = "El porcentaje debe ser un número entre 1 y 100";
  }

  if (typeof data.isSingleUsePerUser !== "boolean") {
    errors.isSingleUsePerUser = "Debe indicar si es de un solo uso por usuario";
  }

  if (typeof data.isActive !== "boolean") {
    errors.isActive = "Debe indicar si el código está activo";
  }

  if (!data.validUntil || isNaN(new Date(data.validUntil).getTime())) {
    errors.validUntil =
      "La fecha de expiración es obligatoria y debe ser válida";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
