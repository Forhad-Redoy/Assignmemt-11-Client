import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Component/LoadingSpinner";
import Container from "../../../Component/Shared/Container";
import Swal from "sweetalert2";
import ChefOrderCard from "../../../Component/Cards/ChefOrderCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // ✅ IMPORTANT: you must have chefId for logged-in chef
  // If user.chefId is not available, fetch it from your DB by email and set it.
  const chefId = user?.chefId; 

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["chef-orders", chefId],
    enabled: !!chefId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/chef-orders/${chefId}`);
      return res.data;
    },
    // Optional: makes both chef & customer see updates without refresh
    refetchInterval: 3000,
  });

  const statusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const res = await axiosSecure.patch(
        `/orders/${orderId}/status`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => {
      // Refresh chef list
      queryClient.invalidateQueries({ queryKey: ["chef-orders", chefId] });
      // Refresh customer list too (if they are on that page in same browser)
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleAction = async (order, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change order status to "${status}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (!confirm.isConfirmed) return;

    statusMutation.mutate({ orderId: order._id, status });
  };

  return (
    <Container>
      <div className="min-h-screen py-10">
        <h2 className="text-3xl font-bold mb-6">Order Requests</h2>

        {!orders.length ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <ChefOrderCard
                key={order._id}
                order={order}
                isUpdating={statusMutation.isPending}
                onCancel={() => handleAction(order, "cancelled")}
                onAccept={() => handleAction(order, "accepted")}
                onDeliver={() => handleAction(order, "delivered")}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default ManageOrders;