import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";

const AddMealForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  //  const res = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/meals`,
  //       mealData
  //     );

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const imgURL = await imageUpload(formData.foodImage[0]);

      const mealData = {
        foodName: formData.foodName,
        chefName: formData.chefName,
        foodImage: imgURL,
        price: parseFloat(formData.price),
        rating: 0,
        ingredients: formData.ingredients,
        estimatedDeliveryTime: formData.estimatedDeliveryTime,
        deliveryArea: formData.deliveryArea.split(",").map(a => a.trim()),
        chefExperience: formData.chefExperience,
        chefId: formData.chefId,
        userEmail: user?.email,
        createdAt: new Date(),
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/meals`,
        mealData
      );

      return data;
    },

    onSuccess: () => {
      toast.success("Meal added successfully!");
      reset();
    },

    onError: () => {
      toast.error("Failed to add meal!");
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-xl mt-10">
      <h2 className="text-4xl text-center font-bold mb-5">Add New Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("foodName")}
          placeholder="Food Name"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          {...register("chefName")}
          placeholder="Chef Name"
          className="input input-bordered w-full"
        />

        <input
          type="file"
          {...register("foodImage")}
          className="file-input file-input-bordered w-full"
        />

        <input
          type="number"
          step="0.01"
          {...register("price")}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("ingredients")}
          placeholder="Ingredients (comma separated)"
          className="textarea textarea-bordered w-full"
        ></textarea>

        <input
          type="text"
          {...register("estimatedDeliveryTime")}
          placeholder="Estimated Delivery Time"
          className="input input-bordered w-full"
        />
        <input
          {...register("deliveryArea", { required: true })}
          className="input input-bordered w-full"
          placeholder="Delivery Area (comma separated)"
        />

        <textarea
          {...register("chefExperience")}
          placeholder="Chef’s Experience"
          className="textarea textarea-bordered w-full"
        ></textarea>

        <input
          type="text"
          {...register("chefId")}
          placeholder="Chef ID"
          className="input input-bordered w-full"
        />

        <input
          type="email"
          value={user?.email}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <button className="my-btn">
          {isPending ? (
            <TbFidgetSpinner className="animate-spin m-auto" />
          ) : (
            "Add Meal"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMealForm;
