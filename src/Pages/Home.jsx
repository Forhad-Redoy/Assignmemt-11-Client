import { useQuery } from "@tanstack/react-query";
import Container from "../Component/Shared/Container";
import LoadingSpinner from "../Component/LoadingSpinner";
import MealCard from "../Component/Cards/MealCard";
import HeroBanner from "../Component/Home/Banner";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Reveal from "./Reveal";
import HomeReviewSection from "../Component/Home/HomeReviewSection ";
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
      <h2 className="text-4xl font-semibold mb-6 text-center">Daily <span className="text-orange-500">Meals</span></h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal, index) => (
          <Reveal key={meal._id} delay={index * 0.1}>
            <MealCard meal={meal} />
          </Reveal>
        ))}
      </div>
      <HomeReviewSection/>
    </Container>
  );
};

export default Home;
