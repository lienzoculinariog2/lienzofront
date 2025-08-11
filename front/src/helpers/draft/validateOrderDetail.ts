import { IOrdersDetail } from "@/types/OrdersDetail";

export function validateOrderDetail(data: Partial<IOrdersDetail>) {
  const errors: Record<string, string> = {};

  // Producto
  if (!data.products_id || data.products_id.trim() === "") {
    errors.products_id = "El ID del producto es obligatorio";
  }

  // Cantidad
  if (
    data.quantity === undefined ||
    isNaN(Number(data.quantity)) ||
    Number(data.quantity) <= 0
  ) {
    errors.quantity = "La cantidad debe ser un número mayor a 0";
  }

  // Precio unitario
  if (
    data.unitPrice === undefined ||
    isNaN(Number(data.unitPrice)) ||
    Number(data.unitPrice) <= 0
  ) {
    errors.unitPrice = "El precio unitario debe ser un número mayor a 0";
  }

  // Orden
  if (!data.orderId || data.orderId.trim() === "") {
    errors.orderId = "El ID de la orden es obligatorio";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
