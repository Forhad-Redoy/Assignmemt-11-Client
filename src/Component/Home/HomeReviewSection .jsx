import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner";
import Reveal from "../../Pages/Reveal";
import { FaStar } from "react-icons/fa";

const HomeReviewSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["homeReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews/home");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="mt-20">
      <h2 className="text-4xl font-semibold text-center mb-10">
        Customer <span className="text-orange-500">Reviews</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, index) => (
          <Reveal key={r._id} delay={index * 0.1}>
            <div className="shadow-lg p-5 rounded-2xl bg-white hover:shadow-xl transition">
              {/* User */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={r.reviewerImage || "/avatar.png"}
                  className="w-11 h-11 rounded-full"
                  alt=""
                />
                <div>
                  <p className="font-semibold">{r.reviewerName}</p>
                  <p className="text-sm text-gray-500">
                    {r.mealName}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <p className="text-amber-500 flex items-center gap-1 font-medium mb-1">
                <FaStar className="text-orange-400" /> {r.rating} / 5
              </p>

              {/* Comment */}
              <p className="text-gray-600 line-clamp-3">
                {r.comment}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default HomeReviewSection;
