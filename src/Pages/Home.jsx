import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../Component/Shared/Container";
import LoadingSpinner from "../Component/LoadingSpinner";
import MealCard from "../Component/Cards/MealCard";
import HeroBanner from "../Component/Home/Banner";
import useAxiosSecure from "../Hooks/useAxiosSecure";
// import MealCard from "../Component/Cards/MealCard";
// import LoadingSpinner from "../Component/LoadingSpinner";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["dailyMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/daily`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <HeroBanner />
      <h2 className="text-2xl font-bold mb-6 text-center">
        Daily Meals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
