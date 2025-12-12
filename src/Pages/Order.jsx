import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
// import LoadingSpinner from "../components/LoadingSpinner";
// import Container from "../Component/Shared/Container";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Component/LoadingSpinner";
import Container from "../Component/Shared/Container";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if user not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  // Fetch meal details
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/meals/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  if (isLoading) return <LoadingSpinner />;

  const { foodName, price, chefId } = meal;

  // Submit order
  const onSubmit = async (data) => {
    const quantity = Number(data.quantity);
    const totalPrice = price * quantity;

    // Confirmation popup
    const confirm = await Swal.fire({
      title: "Confirm Your Order",
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    const orderInfo = {
      foodId: id,
      mealName: foodName,
      price,
      quantity,
      chefId,
      paymentStatus: "Pending",
      userEmail: user?.email,
      userAddress: data.userAddress,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderInfo
      );

      if (res.data.insertedId) {
        Swal.fire("Success!", "Order placed successfully!", "success");
        reset();
        navigate("/"); // redirect or order page
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <Container>
      <div className="min-h-screen py-10">
        <h2 className="text-3xl font-bold mb-6">Confirm Your Order</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg"
        >
          {/* Meal Name */}
          <div>
            <label className="font-semibold">Meal Name</label>
            <input
              type="text"
              defaultValue={foodName}
              disabled
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-semibold">Price</label>
            <input
              type="text"
              defaultValue={price}
              disabled
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              {...register("quantity", { required: true })}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Chef ID */}
          <div>
            <label className="font-semibold">Chef ID</label>
            <input
              type="text"
              defaultValue={chefId}
              disabled
              className="w-full border p-2 rounded"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="font-semibold">Your Email</label>
            <input
              type="text"
              defaultValue={user?.email}
              disabled
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="font-semibold">Delivery Address</label>
            <textarea
              {...register("userAddress", { required: true })}
              placeholder="Enter your delivery address"
              className="w-full border p-2 rounded h-24"
            ></textarea>
          </div>

          {/* Button */}
          <div className="md:col-span-2 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Order;
