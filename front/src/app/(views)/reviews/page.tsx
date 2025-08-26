// app/reviews/page.tsx
import { getAllReviews } from "@/services/reviewsService";
import { IReview } from "@/types/Review";
import AddReviewButton from "./components/AddReviewButton";

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  // 1. Validar que 'reviews' sea un array.
  // Si no es un array, se inicializa como un array vacío para evitar el TypeError.
  const reviewsArray: IReview[] = Array.isArray(reviews) ? reviews : [];

  // 2. Filtrar las reseñas de los usuarios "banned"
  const filteredReviews = reviewsArray.filter(
    (review) => !review.user?.roles?.includes("banned")
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reseñas del Sitio</h1>
        <AddReviewButton />
      </div>

      {filteredReviews.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No hay reseñas de nuestro sitio aún, ¡sé el primero!
        </p>
      ) : (
        <div className="reviews-list">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="review-item border p-4 my-2 rounded-lg shadow-sm"
            >
              <p className="text-lg font-bold">
                {review.user?.name || "Usuario Desconocido"}
              </p>
              <p className="text-gray-700">{review.comment}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">
                  {Array(review.rating).fill("⭐")}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {review.rating} de 5
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
