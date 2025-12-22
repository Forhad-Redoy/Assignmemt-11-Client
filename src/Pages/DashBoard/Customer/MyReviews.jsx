import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";
// import useAuth from "../hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [] } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-reviews", user?.email]);
      Swal.fire("Deleted!", "Review removed successfully.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) deleteMutation.mutate(id);
    });
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <h2 className="text-3xl md:text-4xl text-center font-semibold mb-8">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="p-5 shadow-lg rounded-xl text-center bg-white hover:shadow-xl transition"
            >
              <p className="font-semibold text-lg mb-1">{r.mealName}</p>

              <p className="flex items-center justify-center gap-2 text-orange-500 mb-2">
                <FaStar />
                <span className="font-medium">{r.rating}</span>
              </p>

              <p className="text-gray-600  mb-4">
                {r.comment}
              </p>

              <button
                onClick={() => handleDelete(r._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;