import { ICategories } from "./Categories";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl?: string | null;
  isActive: boolean;
  category: ICategories;
  caloricLevel: number | null;
  ingredients: string[];
}
