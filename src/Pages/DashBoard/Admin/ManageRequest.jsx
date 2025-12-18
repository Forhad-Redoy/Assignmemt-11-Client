import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const ManageRequests = () => {
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/role-requests`
      );
      return data;
    },
  });

  const approve = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/role-requests/approve/${id}`
    );
    toast.success("Request approved");
    refetch();
  };

  const reject = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/role-requests/reject/${id}`
    );
    toast.error("Request rejected");
    refetch();
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Type</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {requests.map((r) => (
          <tr key={r._id}>
            <td>{r.userName}</td>
            <td>{r.userEmail}</td>
            <td>{r.requestType}</td>
            <td>{r.requestStatus}</td>
            <td>
              {r.requestStatus === "pending" && (
                <>
                  <button
                    onClick={() => approve(r._id)}
                    className="btn btn-success btn-sm mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => reject(r._id)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageRequests;
