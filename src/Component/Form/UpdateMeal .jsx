import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { imageUpload } from "../../utils";
// import { imageUpload } from "../../utils";

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const loadMeal = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/meals/${id}`
        );

        setValue("foodName", data.foodName);
        setValue("chefName", data.chefName);
        setValue("price", data.price);
        setValue("ingredients", data.ingredients);
        setValue("estimatedDeliveryTime", data.estimatedDeliveryTime);
        setValue("deliveryArea", (data.deliveryArea || []).join(", "));
        setValue("chefExperience", data.chefExperience);
        setValue("chefId", data.chefId);

        // keep existing image url separately
        setValue("existingImage", data.foodImage);

        setLoading(false);
      } catch (err) {
        toast.error("Failed to load meal!");
        setLoading(false);
      }
    };

    loadMeal();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    try {
      let imgURL = formData.existingImage;

      // If user selected a new file, upload it
      if (formData.foodImage?.length > 0) {
        imgURL = await imageUpload(formData.foodImage[0]);
      }

      const updatedMeal = {
        foodName: formData.foodName,
        chefName: formData.chefName,
        foodImage: imgURL,
        price: parseFloat(formData.price),
        ingredients: formData.ingredients,
        estimatedDeliveryTime: formData.estimatedDeliveryTime,
        deliveryArea: formData.deliveryArea.split(",").map((a) => a.trim()),
        chefExperience: formData.chefExperience,
        chefId: formData.chefId,
      };

      await axiosSecure.patch(`/meals/${id}`, updatedMeal);

      toast.success("Meal updated successfully!");
      navigate("/dashboard/my-meals");
    } catch (err) {
      toast.error("Failed to update meal!");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl text-center font-bold mb-5">Update Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("foodName")}
          className="input input-bordered w-full"
        />
        <input
          {...register("chefName")}
          className="input input-bordered w-full"
        />

        <input
          type="file"
          {...register("foodImage")}
          className="file-input file-input-bordered w-full"
        />
        <input type="hidden" {...register("existingImage")} />

        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="input input-bordered w-full"
        />

        <textarea
          {...register("ingredients")}
          className="textarea textarea-bordered w-full"
        />
        <input
          {...register("estimatedDeliveryTime")}
          className="input input-bordered w-full"
        />

        <input
          {...register("deliveryArea")}
          className="input input-bordered w-full"
          placeholder="Delivery Area (comma separated)"
        />

        <textarea
          {...register("chefExperience")}
          className="textarea textarea-bordered w-full"
        />
        <input
          {...register("chefId")}
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">Update Meal</button>
      </form>
    </div>
  );
};

export default UpdateMeal;
