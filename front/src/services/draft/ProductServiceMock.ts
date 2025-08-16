// src/services/draft/ProductServiceMock.ts

import { IProduct } from "@/types/Product"; 
import { ICategories } from "@/types/Categories";
import { IIngredients } from "@/types/ingredients";

const MOCKED_CATEGORY: ICategories = {
  id: "cat1",
  name: "Pastelería",
  description: "Productos de panadería y pastelería",
  imgUrl: "https://ejemplo.com/cat_pasteleria.jpg",
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const MOCKED_INGREDIENTS: IIngredients[] = [
  { id: "ing1", name: "Harina" },
  { id: "ing2", name: "Azúcar" },
  { id: "ing3", name: "Huevos" },
  { id: "ing4", name: "Leche" },
  { id: "ing5", name: "Frutos rojos" },
];

const MOCKED_PRODUCTS: IProduct[] = [
  {
    id: "prod1",
    name: "Torta de Chocolate",
    description: "Deliciosa torta de chocolate con crema de avellanas.",
    price: 25.50,
    stock: 10,
    imgUrl: "https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Gemini_Generated_Image_i29145i29145i291.png?updatedAt=1755355802202",
    isActive: true,
    category: MOCKED_CATEGORY,
    caloricLevel: 350,
    ingredients: MOCKED_INGREDIENTS.filter(ing => ing.id === "ing1" || ing.id === "ing2" || ing.id === "ing3"),
  },
  {
    id: "prod2",
    name: "Tarta de Frutos Rojos",
    description: "Fresca tarta con una variedad de frutos rojos.",
    price: 18.00,
    stock: 5,
    imgUrl: "https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Gemini_Generated_Image_6btir66btir66bti.png?updatedAt=1755355816675",
    isActive: true,
    category: MOCKED_CATEGORY,
    caloricLevel: 250,
    ingredients: MOCKED_INGREDIENTS.filter(ing => ing.id === "ing2" || ing.id === "ing5"),
  },
  {
    id: "prod3",
    name: "Cheesecake Clásico",
    description: "Cheesecake cremoso con base de galleta.",
    price: 30.00,
    stock: 2,
    imgUrl: "https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Gemini_Generated_Image_hoz0swhoz0swhoz0.png?updatedAt=1755355815187",
    isActive: true,
    category: MOCKED_CATEGORY,
    caloricLevel: 400,
    ingredients: MOCKED_INGREDIENTS.filter(ing => ing.id === "ing2" || ing.id === "ing4"),
  },
];

export const getProducts = async (): Promise<IProduct[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCKED_PRODUCTS;
};