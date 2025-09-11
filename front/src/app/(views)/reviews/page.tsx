import { getAllReviews } from "@/services/reviewsService";
import { IReview } from "@/types/Review";
import AddReviewButton from "./components/AddReviewButton";
import { Star } from "lucide-react";
import UserAvatar from "./components/UserAvatar";

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  // Validar array
  const reviewsArray: IReview[] = Array.isArray(reviews) ? reviews : [];

  // Filtrar usuarios baneados
  const filteredReviews = reviewsArray.filter((review) => {
    const user = review.user;
    if (!user) return false; // descartar reviews sin usuario
    if (user.roles === "banned") return false; // caso con status
    if (Array.isArray(user.roles) && user.roles.includes("banned"))
      return false; // caso con roles
    return true;
  });

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center mb-14">
        <h1 className="my-6 text-4xl font-bold border-b border-secondary-background-400 text-primary-txt-400">
          Opiniones de Nuestros Usuarios
        </h1>
        <p className="max-w-2xl text-lg text-primary-txt-400">
          Descubre lo que otros piensan de nuestra plataforma. Comparte tu
          experiencia y ayuda a más personas.
        </p>
        <div className="mt-6">
          <AddReviewButton />
        </div>
      </div>

      {/* Sin reseñas */}
      {filteredReviews.length === 0 ? (
        <p className="text-lg text-center text-primary-txt-400">
          No hay reseñas aún, ¡sé el primero en compartir tu opinión!
        </p>
      ) : (
        <div className="grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between w-full max-w-sm p-6 transition-transform border shadow-lg rounded-2xl bg-black/50 backdrop-blur-md border-primary-txt-800 hover:scale-[1.03] h-full"
            >
              {/* Usuario */}
              <div className="flex flex-col items-center gap-2 mb-4">
                <UserAvatar
                  src={review.user?.picture || null}
                  alt={review.user?.name || "Usuario"}
                  size={48}
                  name={review.user?.name}
                />
                <p className="font-semibold text-primary-txt-200">
                  {review.user?.name || "Usuario Desconocido"}
                </p>
              </div>

              {/* Comentario */}
              <p className="flex-1 mb-6 leading-relaxed text-center text-primary-txt-100">
                {review.comment}
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 pt-4 mt-auto border-t border-primary-txt-800">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      review.rating >= star
                        ? "fill-vegan-400 text-vegan-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
