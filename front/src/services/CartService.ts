// src/services/cartService.ts
import axios from "axios";
// Quitamos la importación directa de IProduct
import { Order } from "@/types/Order";
import { Cart } from "@/types/Cart";
import { FullCartSummaryDto } from "@/types/FullCartSummaryDto";
import { CartItem } from "@/types/Product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cartService = {
  async getCart(userId: string): Promise<Cart> {
    const { data } = await api.get<Cart>(`/cart/${userId}`);
    return data;
  },

  async addSingleProductToCart(
    userId: string,
    addDto: { productId: string; quantity: number }
  ): Promise<FullCartSummaryDto> {
    const { data } = await api.post<FullCartSummaryDto>(
      `/cart/addsingle/${userId}`,
      addDto
    );
    return data;
  },

  async addMultipleProductsToCart(
    userId: string,
    addMultipleDto: { products: { productId: string; quantity: number }[] }
  ): Promise<FullCartSummaryDto> {
    const { data } = await api.post<FullCartSummaryDto>(
      `/cart/addmultiple/${userId}`,
      addMultipleDto
    );
    return data;
  },

  async updateCartItem(
    userId: string,
    itemId: string,
    updateDto: { quantity: number }
  ): Promise<FullCartSummaryDto | null> {
    const { data } = await api.put<FullCartSummaryDto | null>(
      `/cart/${userId}`,
      updateDto,
      {
        params: { itemId },
      }
    );
    return data;
  },

  async removeCartItem(
    userId: string,
    itemId: string
  ): Promise<FullCartSummaryDto> {
    const { data } = await api.delete<FullCartSummaryDto>(
      `/cart/${userId}/${itemId}`
    );
    return data;
  },

  async clearCart(userId: string): Promise<{ message: string }> {
    const { data } = await api.delete<{ message: string }>(`/cart/${userId}`);
    return data;
  },

  // La función checkout está comentada por ahora
  // async checkout(userId: string, checkoutDto: CheckoutDto): Promise<Order> {
  //   const { data } = await api.post<Order>(`/cart/checkout/${userId}`, checkoutDto);
  //   return data;
  // },

  async findCartItem(userId: string, itemId: string): Promise<CartItem> {
    const { data } = await api.get<CartItem>(`/cart/${userId}/${itemId}`);
    return data;
  },
};