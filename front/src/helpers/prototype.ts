type Producto = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgURL: string;
  isActive: boolean;
  categories_id: string[];
  caloricLevel: number;
};

export const protoProduct: Producto = {
  id: "1",
  name: "Milanesa con arroz",
  description:
    "Es una milanesa que además tiene arroz. Es una milanesa con arroz.",
  price: 450.0,
  stock: 3,
  imgURL:
    "https://ik.imagekit.io/o9qjvzw7n/frank_frazetta_deathdealeriii.jpg_w=640?updatedAt=1746727297310",
  isActive: true,
  categories_id: ["carne", "grano"],
  caloricLevel: 3,
};
