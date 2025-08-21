import { Order, IStatusOrder } from "@/types/Order";

const validStatuses: IStatusOrder[] = [
  "pending",
  "confirmed",
  "delivered",
  "cancelled",
];

export function validateOrder(data: Partial<Order>) {
  const errors: Record<string, string> = {};

  // Usuario
  if (!data.userId || data.userId.trim() === "") {
    errors.userId = "El ID de usuario es obligatorio";
  }

  // Fecha
  if (!data.date || isNaN(new Date(data.date).getTime())) {
    errors.date = "La fecha debe ser válida";
  }

  // Total
  if (
    data.total === undefined ||
    isNaN(Number(data.total)) ||
    Number(data.total) <= 0
  ) {
    errors.total = "El total debe ser un número mayor a 0";
  }

  // Descuento (opcional pero debe ser número si se incluye)
  if (
    data.discountId !== undefined &&
    (isNaN(Number(data.discountId)) || Number(data.discountId) < 0)
  ) {
    errors.discountId = "El ID de descuento debe ser un número válido";
  }

  // Estado
  if (!data.statusOrder || !validStatuses.includes(data.statusOrder)) {
    errors.statusOrder = "El estado debe ser válido";
  }

  // Pago
  if (typeof data.isPaid !== "boolean") {
    errors.isPaid = "Debe indicar si la orden está pagada";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
