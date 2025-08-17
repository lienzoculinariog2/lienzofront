// src/types/CartItem.ts
import { IProduct } from "./Product";
import { Cart } from "./Cart";

export interface CartItem {
    id: string;
    quantity: number;
    cart: Cart;
    product: IProduct;
}