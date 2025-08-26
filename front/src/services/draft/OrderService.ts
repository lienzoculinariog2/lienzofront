import axios from "axios";
import { Order } from "@/types/Order";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const orderService = {
  async getUserOrders(userId: string): Promise<Order[]> {
    const { data } = await axios.get(`${BASE_URL}/orders/user/${userId}`);
    return data;
  },
  async getById(orderId: string): Promise<Order> {
    const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`);
    return data;
  },
   async cancelOrder(orderId: string): Promise<Order> {
    const { data } = await axios.patch(`${BASE_URL}/orders/${orderId}/cancel`);
    return data;
  },
};

