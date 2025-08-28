"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReview } from "@/services/reviewsService";
import { Routes } from "../../../../routes/index";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { X, Star } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddReviewPage() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth0();

  // 👇 aquí asumimos que tu backend devuelve user.status
  const isBanned = user?.status === "banned";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !user || !user.sub) {
      toast.error("Debes iniciar sesión para dejar una reseña.");
      return;
    }

    if (isBanned) {
      toast.error("Tu cuenta está bloqueada. No puedes dejar reseñas.");
      return;
    }

    const newReviewData = {
      comment,
      rating,
      userId: user.sub,
      userId: user.sub,
    };

    try {
      const createdReview = await createReview(newReviewData);

      if (createdReview) {
        toast.success(" Reseña creada con éxito!");
        router.push(Routes.reviews);
      } else {
        toast.error("Hubo un error al crear la reseña.");
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      toast.error("❌ Error al conectar con el servidor.");
    }
  };

  if (isLoading) {
    return (
      <p className="mt-20 text-center text-primary-txt-300">Cargando...</p>
    );
  }

  if (!isAuthenticated) {
    return (
      <p className="mt-20 text-center text-primary-txt-300">
        Por favor, inicia sesión para dejar una reseña.
      </p>
    );
  }

  if (isBanned) {
    return (
      <p className="mt-20 text-center text-red-500">
        Tu cuenta está bloqueada. No puedes dejar reseñas.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg p-8 border shadow-xl rounded-2xl bg-black/50 backdrop-blur-md border-primary-txt-800"
      >
        {/* Botón cruz */}
        <button
          type="button"
          onClick={() => router.push(Routes.reviews)}
          className="absolute transition-colors top-4 right-4 text-primary-txt-400 hover:text-primary-txt-100"
          aria-label="Cerrar"
        >
          <X size={22} />
        </button>

        <h1 className="mb-6 text-2xl font-bold text-center text-primary-txt-100">
          💬 Agregar una Reseña
        </h1>

        {/* Usuario */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={user?.picture || "/default-avatar.png"}
            alt={user?.name || "Usuario"}
            width={48}
            height={48}
            className="object-cover border rounded-full border-primary-txt-800"
          />
          <span className="font-semibold text-primary-txt-200">
            {user?.name}
          </span>
        </div>

        {/* Comentario */}
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block mb-2 font-medium text-primary-txt-300"
          >
            Tu comentario
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-3 border border-gray-700 resize-none text-primary-txt-100 bg-black/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-txt-500"
            rows={4}
            placeholder="Escribe tu opinión aquí..."
            required
          />
        </div>

        {/* Rating con estrellas */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-primary-txt-300">
            Calificación
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  size={28}
                  className={`${
                    rating >= star
                      ? "fill-vegan-400 text-vegan-400"
                      : "text-gray-600"
                  } hover:scale-110 transition-transform`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Botón enviar */}
        <div className="flex justify-end">
          <Button type="submit" variant="vegetarian">
            Enviar Reseña
          </Button>
        </div>
      </form>
    </div>
  );
}
