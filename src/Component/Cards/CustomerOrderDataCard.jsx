import React from 'react';

const CustomerOrderDataCard = ({order,isPaying,onPay}) => {
  const { mealName, price, quantity, chefName, chefId, orderTime, paymentStatus } = order;
  const total = price * quantity;

  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between">
      <div className="space-y-2 mb-3">
        <h3 className="text-lg font-semibold">{mealName}</h3>

        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Total:</strong> ${total}</p>

        <p>
          <strong>Order Time:</strong>{" "}
          {new Date(orderTime).toLocaleString()}
        </p>

        <p><strong>Chef Name:</strong> {chefName}</p>
        <p><strong>Chef ID:</strong> {chefId}</p>

        <p>
          <strong>Payment:</strong>{" "}
          <span className={paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}>
            {paymentStatus}
          </span>
        </p>
      </div>

      {paymentStatus === "Pending" && (
        <button
          onClick={() => onPay(order)}
          disabled={isPaying}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {isPaying ? "Processing..." : "Pay"}
        </button>
      )}
    </div>
  );
};

export default CustomerOrderDataCard;
