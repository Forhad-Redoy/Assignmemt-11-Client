import { Link } from "react-router";

const MyMealCard = ({ meal, onDelete }) => {
  const {
    _id,
    foodName,
    foodImage,
    price,
    rating,
    ingredients,
    estimatedDeliveryTime,
    chefName,
    chefId,
  } = meal;

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
      <img
        src={foodImage}
        alt={foodName}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{foodName}</h2>
        <p><b>Chef:</b> {chefName}</p>
        <p><b>Chef ID:</b> {chefId}</p>
        <p><b>Price:</b> ${price}</p>
        <p><b>Rating:</b> {rating}</p>
        <p className="text-sm">
          <b>Ingredients:</b> {ingredients}
        </p>
        <p className="text-sm">
          <b>Delivery Time:</b> {estimatedDeliveryTime}
        </p>

        <div className="flex justify-between gap-3 pt-3">
          <button
            onClick={() => onDelete(_id)}
            className="btn btn-error btn-sm bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </button>

          <Link
            to={`/dashboard/update-meal/${_id}`}
            className="btn btn-warning btn-sm bg-green-500 hover:bg-green-600 text-white"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyMealCard;
