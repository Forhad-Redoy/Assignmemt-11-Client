
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ReviewSection = ({ meal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const foodId = meal?._id;

  // ✅ Load reviews for this meal
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", foodId],
    enabled: !!foodId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/meal/${foodId}`);
      return res.data;
    },
  });

  // ✅ Add review
  const { mutate: addReview, isPending } = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/reviews", {
        foodId,
        mealName: meal?.foodName,
        userEmail: user?.email,
        reviewerName: user?.displayName,
        reviewerImage: user?.photoURL,
        rating,
        comment,
      });
    },
    onSuccess: () => {
      setComment("");
      setRating(5);
      queryClient.invalidateQueries(["reviews", foodId]);
      Swal.fire("Success!", "Review submitted successfully!", "success");
    },
  });

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((r) => (
          <div key={r._id} className="border p-4 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <img
                src={r.reviewerImage}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{r.reviewerName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(r.date).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="mt-2">⭐ {r.rating} / 5</p>
            <p className="mt-2">{r.comment}</p>
          </div>
        ))}
      </div>

      {/* Add Review */}
      <div className="mt-6 border p-4 rounded-xl bg-white">
        <h3 className="font-semibold mb-3">Give Review</h3>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded mb-2"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <textarea
          className="border w-full p-3 rounded"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={() => addReview()}
          disabled={!comment || isPending}
          className="mt-3 bg-orange-500 text-white px-4 py-2 rounded"
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;