import { ICategories } from "./Categories";
import { IIngredients } from "./ingredients";

export interface ICartItem {
id: string;
name: string;
description: string;
price: number;
stock: number;
imgUrl?: string | null;
isActive: boolean;
category: ICategories;
caloricLevel: number | null;
ingredients: IIngredients[];
quantity:number
}