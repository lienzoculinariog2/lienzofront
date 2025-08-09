export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  isActive: boolean;
  categories_id: string; // Este ellos no lo tienen en Entities
  caloricLevel: number;
  ingredients: string[];
}
