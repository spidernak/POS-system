import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8005/api/getorder");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const hideOrderDetails = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const calculateTotalPrice = (products) => {
    return products
      .reduce((total, product) => {
        return (
          total +
          parseFloat(product.pivot.price_at_order) * product.pivot.quantity
        );
      }, 0)
      .toFixed(2);
  };
  const lists = [
    "Product Id",
    "Product Name",
    "Size",
    "Price",
    "Quantity",
    "Price of Order",
  ];
  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <style>
        {`
                .modal {
                    display: ${isModalOpen ? "block" : "none"};
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0,0,0,0.4);
                    
                    padding-top: 40px;
                    
                }
                .modal-content {
                    background-color: #fefefe;
                    margin: 5% auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                }
                .close {
                    color: #aaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                }
                .close:hover,
                .close:focus {
                    color: black;
                    text-decoration: none;
                }
                `}
      </style>

      <div className="w-full flex flex-col ml-[140px] px-5 py-5 ">
        <div className="w-full flex mb-5">
          <div className="text-black text-3xl font-bold font-inria-sans">
            <h1>Order History</h1>
          </div>
        </div>
        <div className="w-full  flex-col flex">
          <div className="w-full flex bg-Blue py-5 rounded shadow-testShadow">
            <div className="flex-1 text-center">
              <span className="text-white font-medium text-2xl font-inria-sans">
                Date
              </span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-white font-medium text-2xl font-inria-sans">
                Invoice
              </span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-white font-medium text-2xl font-inria-sans">
                Cashier
              </span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-white font-medium text-2xl font-inria-sans">
                Customer Name
              </span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-white font-medium text-2xl font-inria-sans">
                Total Price
              </span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-white font-medium text-2xl font-inria-sans">
                Detail
              </span>
            </div>
          </div>
        </div>
        <div className="h-full shadow-testShadow scroll border border-t-none rounded-b-md">
          {orders.map((order) => (
            <div
              key={order.id}
              className="w-full max-h-[80px] py-5 flex border-b text-black font-medium text-2xl font-inria-sans"
            >
              <div className="flex-1 text-center">
                {new Date(order.updated_at).toLocaleDateString()}
              </div>
              <div className="flex-1 text-center">{order.id}</div>
              <div className="flex-1 text-center">{user?.name}</div>
              <div className="flex-1 text-center">{order.Customer_name}</div>
              <div className="flex-1 text-center">${order.Total_price}</div>
              <div
                className="flex-1 text-center cursor-pointer"
                onClick={() => showOrderDetails(order)}
              >
                See more
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <div id="orderModal" className="modal ">
          <div className="modal-content flex flex-col gap-10">
            <div className="text-slate-800 font-medium text-3xl font-inria-sans flex justify-between border-b pb-10">
              <span className="  cursor-pointer" onClick={hideOrderDetails}>
              <i className="ri-arrow-left-wide-line"></i>
              </span>
              <h2 className="text-center">Order Details</h2>
              <div></div>
            </div>
            <div className="flex justify-between text-slate-800 font-medium text-2xl font-inria-sans">
              <div>
                <p>
                  <strong>ID:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedOrder.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p>
                  <strong>Customer Name:</strong> {selectedOrder.Customer_name}
                </p>
                <p>
                  <strong>Customer Code:</strong> {selectedOrder.Customer_code}
                </p>
              </div>
            </div>
            <div className="w-full  flex-col flex">
              <div className="w-full flex bg-gray-100  py-5 rounded">
                {lists.map((list) => (
                  <div key={list} className="flex-1 text-center">
                    <span className="text-slate-800 font-medium text-2xl font-inria-sans">
                      {list}
                    </span>
                  </div>
                ))}
              </div>
              <div className="">
                {selectedOrder.products.map((product) => (
                  <div
                    key={product.id}
                    className="max-h-[90px] w-full  py-5 flex items-center border-b text-2xl font-inria-sans"
                  >
                    <div className="flex-1 text-center">{product.id}</div>
                    <div className="flex-1 text-center">
                      {product.Product_name}
                    </div>
                    <div className="flex-1 text-center">{product.size}</div>
                    <div className="flex-1 text-center">${product.Price}</div>
                    <div className="flex-1 text-center">
                      {product.pivot.quantity}
                    </div>
                    <div className="flex-1 text-center">
                      $
                      {(
                        parseFloat(product.pivot.price_at_order) *
                        product.pivot.quantity
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end justify-end text-2xl font-inria-sans ">
              <div className="pl-10 bg-gray-100 py-5 px-5 w-[400px]">
                Sum Total : ${calculateTotalPrice(selectedOrder.products)}
              </div>
              <div className=" pl-10 py-5 px-5 w-[400px]">
                Discount(0%) : 00 
              </div>
              <div className=" pl-10 bg-gray-100 py-5 px-5 w-[400px]">
                Total Price : ${calculateTotalPrice(selectedOrder.products)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
