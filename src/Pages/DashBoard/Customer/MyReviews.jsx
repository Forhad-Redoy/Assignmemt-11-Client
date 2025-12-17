import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
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
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>

      {reviews.map((r) => (
        <div key={r._id} className="border p-4 rounded-xl bg-white mb-3">
          <p className="font-semibold">{r.mealName}</p>
          <p>⭐ {r.rating}</p>
          <p>{r.comment}</p>
          <button
            onClick={() => handleDelete(r._id)}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;