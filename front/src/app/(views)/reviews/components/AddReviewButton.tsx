"use client";

import Button from "@/components/ui/Button"; // Usamos tu componente Button
import { useRouter } from "next/navigation";
import { Routes } from "../../../../routes/index";

const AddReviewButton = () => {
  const router = useRouter();

  const handleNavigateToAddReview = () => {
    // Redirige a la ruta definida en tu objeto de rutas
    router.push(Routes.addReview);
  };

  return (
    <Button
      onClick={handleNavigateToAddReview}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
    >
      Agregar Reseña
    </Button>
  );
};

export default AddReviewButton;
