// src/services/AdminOrderService.ts
import axios from "axios";
import { Order } from "@/types/Order";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const adminOrderService = {
  async getAll(status?: string): Promise<Order[]> {
    const { data } = await axios.get(`${BASE_URL}/orders`, {
      params: status ? { status } : {},
    });
    return data;
  },

  async getById(orderId: string): Promise<Order> {
    const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`);
    return data;
  },

  async updateOrder(orderId: string, payload: Partial<Order>): Promise<Order> {
    const { data } = await axios.patch(`${BASE_URL}/orders/${orderId}`, payload);
    return data;
  },

  async updateStatus(orderId: string, newStatus: string): Promise<Order> {
    const { data } = await axios.patch(`${BASE_URL}/orders/${orderId}/status`, {
      newStatus,
    });
    return data;
  },

  async cancelOrder(orderId: string): Promise<Order> {
    const { data } = await axios.patch(`${BASE_URL}/orders/${orderId}/cancel`);
    return data;
  },
};
