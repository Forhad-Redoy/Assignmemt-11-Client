import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../Component/LoadingSpinner";
import Container from "../Component/Shared/Container";
import Button from "../Component/Shared/Button";
import ReviewSection from "../Component/ReviewSection";
import FavoriteButton from "../Component/FavoriteButton";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
  }

  // Fetch single meal data
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const {
    chefId,
    chefName,
    price,
    foodImage,
    deliveryArea,
    rating,
    ingredients,
    estimatedDeliveryTime,
    chefExperience,
    foodName,
  } = meal;

  const handleOrder = () => {
    navigate(`/order/${id}`);
  };

  return (
    <Container>
      <div className="py-10 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <img
              src={foodImage}
              alt={foodName}
              className="w-fit rounded-xl shadow-lg"
            />
          </div>

          {/* Meal Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{foodName}</h2>

            <p className="text-lg">
              <span className="font-semibold">Chef:</span> {chefName}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Price:</span> ${price}
            </p>

            <p className="text-lg flex items-center gap-1">
              <span className="font-semibold">Rating:</span> <FaStar className="text-orange-400"/> {rating}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Ingredients:</span> {ingredients}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Delivery Area:</span>{" "}
              {deliveryArea}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Estimated Delivery:</span>{" "}
              {estimatedDeliveryTime} mins
            </p>

            <p className="text-lg">
              <span className="font-semibold">Chef Experience:</span>{" "}
              {chefExperience} years
            </p>

            <p className="text-lg">
              <span className="font-semibold">Chef ID:</span> {chefId}
            </p>
            <div className="pt-5">
              <Button onClick={handleOrder} label="Order Now" />
            </div>
            <FavoriteButton meal={meal}/>
          </div>
        </div>
      <ReviewSection meal={meal}/>
      </div>
      
    </Container>
  );
};

export default MealDetails;
