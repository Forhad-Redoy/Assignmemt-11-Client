import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Component/LoadingSpinner";
import cover from "../../../assets/chef.png";

const Profile = () => {
  const { user } = useAuth();

  const { data: dbUser, isLoading, } = useQuery({
    queryKey: ["profileUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`
      );
      return data;
    },
  });

  const sendRequest = async (type) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/role-requests`, {
      userName: user?.displayName || dbUser?.name,
      userEmail: user?.email,
      requestType: type,
    });
    toast.success("Request sent (pending)");
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};


  if (isLoading) return <LoadingSpinner/>;

  const role = dbUser?.role || "user";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl overflow-hidden">
        <img
          alt="cover"
          src={cover}
          className="pl-20 w-fit h-50 object-cover"
        />

        <div className="flex flex-col items-center p-6 -mt-16">
          <img
            alt="profile"
            src={dbUser?.image || user?.photoURL}
            className="h-28 w-28 rounded-full border-4 border-white object-cover"
          />

          <p className="mt-3 px-4 py-1 text-xs text-white bg-orange-500 rounded-full">
            {role}
          </p>

          <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="User Name" value={dbUser?.name || user?.displayName} />
            <Info label="User Email" value={dbUser?.email || user?.email} />
            <Info label="User Address" value={dbUser?.address || "N/A"} />
            <Info label="User Status" value={dbUser?.status || "active"} />

            {role === "chef" && (
              <Info label="Chef Id" value={dbUser?.chefId || "Pending / N/A"} />
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {/* Hide Be a Chef if role is chef */}
            {role !== "chef" && role !== "admin" && (
              <button
                onClick={() => sendRequest("chef")}
                className="px-5 py-2 rounded-lg bg-lime-600 text-white hover:bg-lime-700"
              >
                Be a Chef
              </button>
            )}

            {/* Hide both if admin */}
            {role !== "admin" && (
              <button
                onClick={() => sendRequest("admin")}
                className="px-5 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
              >
                Be an Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-gray-100 rounded-xl p-4">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-800 break-words">{value}</p>
  </div>
);

export default Profile;