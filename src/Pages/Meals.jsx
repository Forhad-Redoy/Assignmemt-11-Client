import React from "react";
import Container from "../Component/Shared/Container";
import MealCard from "../Component/MealCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Component/LoadingSpinner";

const Meals = () => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });
  // console.log(meals)
  if (isLoading) return <LoadingSpinner />;
  return (
    <Container>
      {meals && meals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard meal={meal} key={meal._id} />
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default Meals;
