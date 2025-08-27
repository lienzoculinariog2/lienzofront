"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReview } from "@/services/reviewsService";
import { Routes } from "../../../../routes/index";
import { useAuth0 } from "@auth0/auth0-react"; // Importa el hook de Auth0
import Button from "@/components/ui/Button"; // Usa tu componente Button

export default function AddReviewPage() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth0(); // Obtén el usuario y el estado de Auth0

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Si el usuario no está autenticado, no se puede enviar la reseña
    if (!isAuthenticated || !user || !user.sub) {
      alert("Debes iniciar sesión para dejar una reseña.");
      return;
    }

    const newReviewData = {
      comment,
      rating,
      userId: user.sub, // Usa el 'sub' de Auth0 como el ID de usuario
    };

    try {
      const createdReview = await createReview(newReviewData);

      if (createdReview) {
        router.push(Routes.reviews); // Redirige a la página de reseñas
      } else {
        alert(
          "Hubo un error al crear la reseña. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      alert("Hubo un error al conectar con el servidor.");
    }
  };

  // Muestra un mensaje de carga si Auth0 aún no ha cargado el estado del usuario
  if (isLoading) {
    return <p className="text-center mt-20">Cargando...</p>;
  }

  // Si no está autenticado, puedes redirigir o mostrar un mensaje
  if (!isAuthenticated) {
    return (
      <p className="text-center mt-20">
        Por favor, inicia sesión para dejar una reseña.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Agregar una Reseña
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-bold mb-2"
          >
            Comentario
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="rating"
            className="block text-gray-700 font-bold mb-2"
          >
            Calificación
          </label>
          <input
            id="rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="5"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            onClick={() => {}} // onClick is required by the Button component but handled by form submit
            className="bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Enviar Reseña
          </Button>
        </div>
      </form>
    </div>
  );
}
