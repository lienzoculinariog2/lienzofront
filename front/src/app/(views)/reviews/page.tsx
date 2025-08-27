import { getAllReviews } from "@/services/reviewsService";
import { IReview } from "@/types/Review";
import AddReviewButton from "./components/AddReviewButton";

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  const reviewsArray: IReview[] = Array.isArray(reviews) ? reviews : [];

  const filteredReviews = reviewsArray.filter(
    (review) => !review.user?.roles?.includes("banned")
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-txt-100">
          Reseñas del Sitio
        </h1>
        <AddReviewButton />
      </div>

      {filteredReviews.length === 0 ? (
        <p className="text-center text-lg text-primary-txt-500">
          No hay reseñas de nuestro sitio aún, ¡sé el primero en compartir tu
          opinión!
        </p>
      ) : (
        <div className="reviews-list space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 my-2 border shadow-lg rounded-2xl bg-black/50 backdrop-blur-md border-primary-txt-800"
            >
              <p className="text-lg font-semibold text-primary-txt-100">
                {review.user?.name || "Usuario Desconocido"}
              </p>
              <p className="text-primary-txt-400 mt-2">{review.comment}</p>
              <div className="flex items-center mt-4">
                <span className="ml-2 text-sm text-primary-txt-300">
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
