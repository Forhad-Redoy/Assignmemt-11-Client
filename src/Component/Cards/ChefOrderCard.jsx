const ChefOrderCard = ({ order, isUpdating, onCancel, onAccept, onDeliver }) => {
  const {
    mealName,
    price,
    quantity,
    orderStatus,
    userEmail,
    userAddress,
    orderTime,
    paymentStatus,
  } = order;

  const total = price * quantity;

  const isCancelled = orderStatus === "cancelled";
  const isDelivered = orderStatus === "delivered";
  const isAccepted = orderStatus === "accepted";


  const cancelDisabled = isUpdating || isCancelled || isDelivered || isAccepted; // after accept, cancel disabled
  const acceptDisabled = isUpdating || isCancelled || isDelivered || isAccepted;
  const deliverDisabled = isUpdating || isCancelled || isDelivered || !isAccepted;

  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{mealName}</h3>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Total:</strong> ${total}</p>

        <p><strong>User Email:</strong> {userEmail}</p>
        <p><strong>Address:</strong> {userAddress}</p>

        <p><strong>Order Time:</strong> {new Date(orderTime).toLocaleString()}</p>

        <p>
          <strong>Order Status:</strong>{" "}
          <span className="capitalize">{orderStatus}</span>
        </p>

        <p>
          <strong>Payment Status:</strong>{" "}
          <span className={paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}>
            {paymentStatus}
          </span>
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          disabled={cancelDisabled}
          onClick={onCancel}
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          disabled={acceptDisabled}
          onClick={onAccept}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Accept
        </button>

        <button
          disabled={deliverDisabled}
          onClick={onDeliver}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Deliver
        </button>
      </div>
    </div>
  );
};

export default ChefOrderCard;