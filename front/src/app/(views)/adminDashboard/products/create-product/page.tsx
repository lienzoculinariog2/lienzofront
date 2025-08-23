"use client";

import { useRouter } from "next/navigation";
import { productService } from "@/services/ProductService";
import ProductForm from "../../components/ProductForm";
import { toast } from 'react-toastify'; // <-- Importación de toastify

const CreateNewProduct = () => {
  const router = useRouter();

  const handleCreateProduct = async (formData: FormData) => {
    try {
      await productService.create(formData);
      toast.success("¡Producto creado con éxito!"); // <-- Reemplazado alert() con toast.success()
      router.push("/adminDashboard/edit-products");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      toast.error("Hubo un error al crear el producto."); // <-- Reemplazado alert() con toast.error()
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
