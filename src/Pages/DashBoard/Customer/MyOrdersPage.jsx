import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Component/LoadingSpinner";
import Container from "../../../Component/Shared/Container";
import CustomerOrderDataCard from "../../../Component/Cards/CustomerOrderDataCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const fetchUserOrders = async (axiosSecure, email) => {
  const res = await axiosSecure.get(`/my-orders/user/${email}`);
  return res.data;
};

const createCheckoutSession = async (axiosSecure, orderId) => {
  const res = await axiosSecure.post(`/create-checkout-session`, { orderId });
  return res.data;
};

function MyOrders() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load user orders
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: () => fetchUserOrders(axiosSecure, user.email),
    enabled: !!user?.email,
  });

  // Payment mutation
  const { mutateAsync: startPayment, isPending: isPaying } = useMutation({
    mutationFn: (orderId) =>
      createCheckoutSession(axiosSecure, orderId),
  });

  const handlePay = async (order) => {
    try {
      const total = order.price * order.quantity;

      const confirm = await Swal.fire({
        title: "Confirm Payment?",
        text: `You will pay $${total}.`,
        showCancelButton: true,
        confirmButtonText: "Pay Now",
        cancelButtonText: "Cancel",
      });

      if (!confirm.isConfirmed) return;

      const { url } = await startPayment(order._id);
      window.location.href = url;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <p className="text-center mt-6 text-red-500">
        {error?.message || "Failed to load orders"}
      </p>
    );

  if (!orders.length)
    return <p className="text-center mt-6">No orders found.</p>;

  return (
    <Container>
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {orders.map((order) => (
          <CustomerOrderDataCard
            key={order._id}
            order={order}
            onPay={handlePay}
            isPaying={isPaying}
          />
        ))}
      </div>
    </Container>
  );
}

export default MyOrders;
