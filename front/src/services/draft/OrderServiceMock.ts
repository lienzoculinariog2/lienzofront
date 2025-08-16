// src/services/draft/OrderServiceMock.ts

// Tipo de dato simulado para el payload
export interface MockedOrderPayload {
    userId: string; 
    productIds: string[];
}

// Tipo de dato simulado para la respuesta de la orden creada
export interface MockedOrderResponse {
    id: string;
    userId: string;
    products: string[];
    createdAt: string;
}

// Simula la creación de una orden en la API.
export const postOrder = async (payload: MockedOrderPayload): Promise<MockedOrderResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("[MOCK SERVICE] Creando orden con payload:", payload);
  
  // Simula la respuesta del servidor
  return {
    id: `order_${Date.now()}`,
    userId: payload.userId,
    products: payload.productIds,
    createdAt: new Date().toISOString(),
  };
};