import { ICategories } from "./Categories";
import { IIngredients } from "./ingredients";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imgUrl?: string | null;
  isActive: boolean;
  category: ICategories;
  caloricLevel: number | null;
  ingredients: IIngredients[];
}

export type CartItem = IProduct & {
    quantity: number;
};