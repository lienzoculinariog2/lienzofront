// src/services/OrderService.ts
import axios from "axios";
import { Order } from "@/types/Order";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const orderService = {
  // 🔹 Admin: obtener todas las órdenes (con filtro opcional por estado)
  async getAll(token: string, status?: string): Promise<Order[]> {
    const { data } = await axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
      params: status ? { status } : {},
    });
    return data;
  },

  // 🔹 User: obtener órdenes de un usuario
  async getUserOrders(userId: string, token: string): Promise<Order[]> {
    const { data } = await axios.get(`${BASE_URL}/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  // 🔹 Obtener orden por ID
  async getById(orderId: string, token: string): Promise<Order> {
    const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  // 🔹 Admin: actualizar orden (PUT completo o parcial)
  async updateOrder(
    orderId: string,
    payload: Partial<Order>,
    token: string,
  ): Promise<Order> {
    const { data } = await axios.put(`${BASE_URL}/orders/${orderId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  // 🔹 Admin: actualizar estado de la orden
  async updateStatus(
    orderId: string,
    newStatus: string,
    token: string,
  ): Promise<Order> {
    const { data } = await axios.put(
      `${BASE_URL}/orders/${orderId}/status`,
      { newStatus },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },

  // 🔹 Cancelar orden
  async cancelOrder(orderId: string, token: string): Promise<Order> {
    const { data } = await axios.put(
      `${BASE_URL}/orders/${orderId}/cancel`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },
};
