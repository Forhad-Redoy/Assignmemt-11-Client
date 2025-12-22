import React, { useState, useMemo } from "react";
import Container from "../Component/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Component/LoadingSpinner";
import MealCard from "../Component/Cards/MealCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Reveal from "./Reveal";

const ITEMS_PER_PAGE = 10;

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals");
      return res.data;
    },
  });

  // Sort meals by price
  const sortedMeals = useMemo(() => {
    return [...meals].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [meals, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedMeals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMeals = sortedMeals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Header + Sort */}

      <h1 className="text-4xl text-center font-semibold"><span className="text-orange-500">All</span> Meals</h1>

      <div className="flex justify-end my-3">
        <button
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            setCurrentPage(1); // reset page on sort
          }}
          className="px-4 py-2 hover:bg-orange-500 hover:text-white rounded-lg bg-white text-orange-500 border border-amber-500 transition"
        >
          Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
        </button>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMeals.map((meal, index) => (
          <Reveal key={meal._id} delay={index * 0.1}>
            <MealCard meal={meal} />
          </Reveal>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === num + 1 ? "bg-orange-500 text-white" : ""
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </Container>
  );
};

export default Meals;
