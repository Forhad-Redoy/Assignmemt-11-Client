import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`
      );
      return data;
    },
  });

  const makeFraud = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/fraud/${id}`
    );
    toast.success("User marked as fraud");
    refetch();
  };

  return (
    <table className="table">
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
  );
};

export default ManageUsers;
