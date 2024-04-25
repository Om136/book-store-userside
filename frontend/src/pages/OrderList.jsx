import axios from "axios";
import React, { useState, useEffect } from "react";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Assume fetchOrders function fetches orders data from an API endpoint
    fetchOrders()
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      console.log(res.data);
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Orders List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#00c46a]">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Book Title</th>
            <th className="border border-gray-300 px-4 py-2">Author Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 px-4 py-2">{order.order_id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.customer_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.book_title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.author_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.amount}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
