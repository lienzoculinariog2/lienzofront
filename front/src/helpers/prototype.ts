import { IProduct } from "@/types/Product";

export const protoProduct: IProduct[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Milanesa con arroz",
    description:
      "Es una milanesa que además tiene arroz. Es una milanesa con arroz.",
    price: 450.0,
    stock: 3,
    imgUrl:
      "https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Gemini_Generated_Image_q8noseq8noseq8no.png?updatedAt=1754607553700",
    isActive: true,
    categories_id: "550e8400-e29b-41d4-a716-446655440000",
    caloricLevel: 5,
    ingredients: ["carne", "grano", "verdura"],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441000",
    name: "Milanesa sin arroz",
    description:
      "Es una milanesa que no tiene arroz. Es una milanesa sin arroz.",
    price: 400.0,
    stock: 5,
    imgUrl:
      "https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Gemini_Generated_Image_6k2jo76k2jo76k2j.png?updatedAt=1754607408351",
    isActive: true,
    categories_id: "550e8400-e29b-41d4-a716-446655441000",
    caloricLevel: 3,
    ingredients: ["carne"],
  },
];
