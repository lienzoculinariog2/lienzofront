// src/types/FullCartSummaryDto.ts
import { CartItem } from "./CartItem";

export interface FullCartSummaryDto {
    id: string;
    user: {
        id: string;
    };
    cartItems: CartItem[];
    subtotal: number;
    total: number;
}