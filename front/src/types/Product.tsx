export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgURL: string;
  isActive: boolean;
  categories_id: string;
  caloricLevel: number;
  ingredients: string[];
}
