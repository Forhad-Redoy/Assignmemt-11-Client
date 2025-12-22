import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/role-requests");
      return data;
    },
  });

  const approve = async (id) => {
    await axiosSecure.patch(`/role-requests/approve/${id}`);
    toast.success("Request approved");
    refetch();
  };

  const reject = async (id) => {
    await axiosSecure.patch(`/role-requests/reject/${id}`);
    toast.error("Request rejected");
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
                <td>
                  <span
                    className={`badge ${
                      r.requestStatus === "pending"
                        ? "badge-warning"
                        : r.requestStatus === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {r.requestStatus}
                  </span>
                </td>
                <td>
                  {r.requestStatus === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => approve(r._id)}
                        className="btn btn-success btn-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => reject(r._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Card Layout ================= */}
      <div className="md:hidden space-y-4">
        {requests.map((r) => (
          <div
            key={r._id}
            className="card bg-base-100 shadow border p-4"
          >
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {r.userName}
            </p>

            <p className="break-all">
              <span className="font-semibold">Email:</span>{" "}
              {r.userEmail}
            </p>

            <p>
              <span className="font-semibold">Type:</span>{" "}
              {r.requestType}
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`badge ml-2 ${
                  r.requestStatus === "pending"
                    ? "badge-warning"
                    : r.requestStatus === "approved"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {r.requestStatus}
              </span>
            </p>

            {r.requestStatus === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => approve(r._id)}
                  className="btn btn-success btn-sm w-1/2"
                >
                  Accept
                </button>
                <button
                  onClick={() => reject(r._id)}
                  className="btn btn-error btn-sm w-1/2"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRequests;
