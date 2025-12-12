import React from "react";
import { Link } from "react-router";

const MealCard = ({meal}) => {
  const {_id,chefId,chefName,price,foodImage,deliveryArea,rating}=meal || {}
  console.log(meal)
  return (
    <div className="  shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
      <figure className="h-66 overflow-hidden">
        <img
          src={foodImage}
          alt=""
          className="w-full h-full object-cover hover:scale-90 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="font-semibold">Chef Name : {chefName}</h2>
           <h3 className="font-semibold">Price : ${price}</h3>
          
        </div>

        <div className="flex justify-between">
         <h2 className="font-semibold">Chef ID : {chefId}</h2>
          <h3 className="font-semibold">4.9</h3>
        </div>
        <div className="text-xs font-semibold text-lime-500">{deliveryArea}</div>

        {/* <p className="text-sm text-base-content/70">by {author}</p> */}
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex gap-4 text-sm text-base-content/60"></div>
          <Link to={`/meals/${_id}`} className="my-btn">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
