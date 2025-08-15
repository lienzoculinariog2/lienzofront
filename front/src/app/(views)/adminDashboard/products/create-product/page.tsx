"use client";

import { useRouter } from "next/navigation";
import { IProduct } from "@/types/Product";
import { productService } from "@/services/ProductService";
import ProductForm from "../../components/ProductForm";

const CreateNewProduct = () => {
  const router = useRouter();

  const handleCreateProduct = async (formData: Partial<IProduct>) => {
    try {
      await productService.create(formData as IProduct);
      alert("Producto creado con éxito!");
      router.push("/adminDashboard/edit-products"); 
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto.");
    }
  };

  const handleCancel = () => {
    router.push("/adminDashboard"); 
  };

  return (
    <div className="container p-8 mx-auto">
      <h1 className="my-6 text-3xl font-bold">Crear Nuevo Producto</h1>
      <ProductForm product={null} onSave={handleCreateProduct} onCancel={handleCancel} />
    </div>
  );
}

export default CreateNewProduct;