import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
// import MyMealCard from "./MyMealCard";
import useAuth from "../../../Hooks/useAuth";
import MyMealCard from "../../../Component/Cards/MyMealCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyMeals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch meals created by this chef
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["my-meals", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/chef/${user.email}`);
      return res.data;
    },
  });

  // Delete mutation
  const deleteMeal = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`${import.meta.env.VITE_API_URL}/meals/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Meal deleted successfully.", "success");
      queryClient.invalidateQueries(["my-meals"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMeal.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center">My Meals</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <MyMealCard key={meal._id} meal={meal} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default MyMeals;
