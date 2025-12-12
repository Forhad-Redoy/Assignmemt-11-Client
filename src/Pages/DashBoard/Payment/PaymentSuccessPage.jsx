import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    const verifyPayment = async () => {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/payment-success?session_id=${sessionId}`
      );

      console.log(res.data);
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>

      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order is being processed.
      </p>

      <Link
        to="/dashboard/my-orders"
        className="inline-block bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
      >
        Go to My Orders
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
