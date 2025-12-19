import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageRequests = () => {
    const axiosSecure = useAxiosSecure();
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/role-requests`
      );
      return data;
    },
  });

  const approve = async (id) => {
    await axiosSecure.patch(
      `/role-requests/approve/${id}`
    );
    toast.success("Request approved");
    refetch();
  };

  const reject = async (id) => {
    await axiosSecure.patch(
      `/role-requests/reject/${id}`
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
