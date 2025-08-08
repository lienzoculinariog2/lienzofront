import { IProduct } from "@/types/Product";
import { protoProduct } from "@/helpers/prototype";

export const productService = {
  async getAll(): Promise<IProduct[]> {
    return protoProduct;
  },

  async getById(id: string): Promise<IProduct> {
    const product = protoProduct.find((p) => p.id === id);
    if (!product) throw new Error("Producto no encontrado en mock");
    return product;
  },
};
