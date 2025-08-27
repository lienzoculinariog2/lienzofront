"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReview } from "@/services/reviewsService";
import { Routes } from "../../../../routes/index";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@/components/ui/Button";

export default function AddReviewPage() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth0();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated || !user || !user.sub) {
      alert("Debes iniciar sesión para dejar una reseña.");
      return;
    }

    const newReviewData = {
      comment,
      rating,
      userId: user.sub,
    };

    try {
      const createdReview = await createReview(newReviewData);

      if (createdReview) {
        router.push(Routes.reviews);
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

  if (isLoading) {
    return (
      <p className="text-center mt-20 text-primary-txt-500">Cargando...</p>
    );
  }

  if (!isAuthenticated) {
    return (
      <p className="text-center mt-20 text-primary-txt-500">
        Por favor, inicia sesión para dejar una reseña.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary-txt-100">
        Agregar una Reseña
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 border shadow-lg rounded-2xl bg-black/50 backdrop-blur-md border-primary-txt-800"
      >
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block mb-2 text-sm font-semibold text-primary-txt-300"
          >
            Comentario
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 text-primary-txt-100 bg-black/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-txt-500"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="rating"
            className="block mb-2 text-sm font-semibold text-primary-txt-300"
          >
            Calificación
          </label>
          <input
            id="rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-700 text-primary-txt-100 bg-black/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-txt-500"
            min="1"
            max="5"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            onClick={() => {}}
            variant="dark"
            className="w-full"
          >
            Enviar Reseña
          </Button>
        </div>
      </form>
    </div>
  );
}
