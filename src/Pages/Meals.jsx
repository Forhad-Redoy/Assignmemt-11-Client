import React from "react";
import Container from "../Component/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Component/LoadingSpinner";
import MealCard from "../Component/Cards/MealCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Meals = () => {
   const axiosSecure = useAxiosSecure();
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/meals`);;
      return result.data;
    },
  });
  // console.log(meals)
  if (isLoading) return <LoadingSpinner />;
  return (
    <Container>
      <h1 className="text-center font-semibold text-4xl my-6">All Meals</h1>
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
