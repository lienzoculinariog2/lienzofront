// src/types/Cart.ts
import { CartItem } from "./Product";
import { IUser } from "./User"; // Asumo que tienes una interfaz de usuario

export interface Cart {
    id: string;
    isActive: boolean;
    user: IUser;
    items: CartItem[];
}