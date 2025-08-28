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
      variant="dailyMenu"
    >
      Agregar Reseña
    </Button>
  );
};

export default AddReviewButton;
