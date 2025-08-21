"use client";

import { useRouter } from "next/navigation";
import { productService } from "@/services/ProductService";
import ProductForm from "../../components/ProductForm";

const CreateNewProduct = () => {
  const router = useRouter();

  const handleCreateProduct = async (formData: FormData) => {
    try {
      await productService.create(formData);
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
    <div className="flex items-center justify-center min-h-screen p-6 bg-primary-background-500">
      <div className="w-full max-w-2xl">
        <br />
        <ProductForm
          product={null}
          onSave={handleCreateProduct}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default CreateNewProduct;
