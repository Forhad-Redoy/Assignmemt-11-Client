import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { MdFavorite } from "react-icons/md";

const FavoriteButton = ({ meal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      axiosSecure.post("/favorites", {
        userEmail: user?.email,
        mealId: meal?._id,
        mealName: meal?.foodName,
        chefId: meal?.chefId,
        chefName: meal?.chefName,
        price: meal?.price,
      }),
    onSuccess: () => {
      Swal.fire("Added!", "Meal added to favorites successfully.", "success");
    },
    onError: (err) => {
      if (err?.response?.status === 409) {
        Swal.fire("Info", "This meal is already in your favorites.", "info");
      }
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      
      className="bg-pink-500 hover:bg-pink-600 flex items-center gap-2 text-white px-4 py-2 rounded"
    >
      <MdFavorite/>
      {isPending ? "Adding..." : "Favorite"}
    </button>
  );
};

export default FavoriteButton;