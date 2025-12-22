import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  const makeFraud = async (id) => {
    await axiosSecure.patch(`/users/fraud/${id}`);
    toast.success("User marked as fraud");
    refetch();
  };

  return (
    <div className="w-full">
      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name || "N/A"}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>
                  {u.role !== "admin" && u.status !== "fraud" && (
                    <button
                      onClick={() => makeFraud(u._id)}
                      className="btn btn-error btn-sm"
                    >
                      Make Fraud
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Card Layout ================= */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="card bg-base-100 shadow border p-4"
          >
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {u.name || "N/A"}
            </p>

            <p className="break-all">
              <span className="font-semibold">Email:</span>{" "}
              {u.email}
            </p>

            <p>
              <span className="font-semibold">Role:</span>{" "}
              {u.role}
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              {u.status}
            </p>

            {u.role !== "admin" && u.status !== "fraud" && (
              <button
                onClick={() => makeFraud(u._id)}
                className="btn btn-error btn-sm mt-3 w-full"
              >
                Make Fraud
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
