// src/types/FullCartSummaryDto.ts
import { IProduct } from "./Product";

// Esta interfaz describe la respuesta que tu backend envía para el resumen del carrito
export interface FullCartSummaryDto {
    id: string;
    user: {
        id: string;
    };
    cartItems: {
        id: string;
        quantity: number;
        product: IProduct;
    }[];
    subtotal: number;
    total: number;
}