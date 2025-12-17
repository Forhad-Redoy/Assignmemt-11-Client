import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const FavoriteMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/user/${user.email}`);
      return res.data;
    },
  });

  const deleteFav = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/favorites/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user?.email]);
      Swal.fire("Removed!", "Meal removed from favorites successfully.", "success");
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Favorite Meals</h2>

      <table className="table w-full bg-white">
        <thead>
          <tr>
            <th>Meal</th>
            <th>Chef</th>
            <th>Price</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {favorites.map((f) => (
            <tr key={f._id}>
              <td>{f.mealName}</td>
              <td>{f.chefName}</td>
              <td>{f.price}</td>
              <td>{new Date(f.addedTime).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => deleteFav.mutate(f._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {favorites.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-6">
                No favorites yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteMeals;