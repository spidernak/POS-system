import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Customerlist = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [editCustomerName, setEditCustomerName] = useState("");
  const [tempCustomerName, setTempCustomerName] = useState("");
  const [selectedInvoiceOrderId, setSelectedInvoiceOrderId] = useState(null); // New state for selected invoice order ID

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8005/api/viewcustomers");
      console.log("Fetched customers:", result.data.customers);
      setCustomers(result.data.customers);
    } catch (err) {
      console.log("Error fetching customers:", err);
    }
  };

  const fetchOrders = async (customerCode, customerName, customerLoyalty) => {
    try {
      console.log(`Fetching orders for customer code: ${customerCode}`);
      const result = await axios.get(
        `http://localhost:8005/api/findOrderByCustomerName?Customer_code=${customerCode}`
      );
      console.log("Fetched orders:", result.data.orders);
      setSelectedCustomerOrders(result.data.orders);
      setSelectedCustomer(customerName);
      setIsModalOpen(true);
      setTotalSum(
        result.data.orders.reduce((sum, order) => sum + order.Total_price, 0)
      );
      setLoyaltyPoints(customerLoyalty);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  const handleInvoiceClick = (orderId) => {
    setSelectedInvoiceOrderId(
      orderId === selectedInvoiceOrderId ? null : orderId
    ); // Toggle selected invoice order ID
  };

  const hideOrderDetails = () => {
    setSelectedCustomerOrders(null);
    setSelectedCustomer(null);
    setIsModalOpen(false);
  };

  const handleUpdate = (customerId, customerName) => {
    setEditCustomerId(customerId);
    setEditCustomerName(customerName);
    setTempCustomerName(customerName);
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

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8005/api/updatecustomer/${editCustomerId}`,
        {
          Customer_name: editCustomerName,
        }
      );
      console.log("Customer updated successfully.");
      setEditCustomerId(null);
      setEditCustomerName("");
      setTempCustomerName("");
      fetchData();
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };
  const close =()=>{
    setExpandedOrderId(false);
  }

  const handleCancel = () => {
    setEditCustomerId(null);
    setEditCustomerName("");
    setTempCustomerName("");
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(
        `http://localhost:8005/api/removecutomer/${customerId}`
      );
      console.log("Customer deleted successfully.");
      fetchData();
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  const listHeaders = [
    "ID",
    "Name",
    "Loyalty",
    "Code",
    "Detail",
    "Edit",
    "Delete",
  ];
  const lists = [
    "Product Id",
    "Product Name",
    "Size",
    "Price",
    "Quantity",
    "Price of Order",
  ];
  return (
    <div className="w-screen h-screen  flex absolute  overflow-hidden">
      <div className="w-full flex flex-col ml-[140px] px-5 py-5">
        <div className="w-full flex gap-5 pb-5">
          <div className="flex items-center border w-[290px] text-black text-xl justify-center font-inria-sans py-2 px-2 rounded shadow-testShadow">
            <h1>Total Customers:</h1>
            <div className="font-bold">{customers.length}</div>
          </div>
          <Link
            to="/admin/addcustomer"
            className="flex items-center justify-center cursor-pointer bg-Blue w-[80px] h-[60px] rounded shadow-testShadow border border-gray-300"
          >
            <i className="ri-user-add-fill text-3xl text-white"></i>
          </Link>
        </div>
        <div className="w-full flex-col flex">
          <div className="w-full flex bg-Blue py-5 rounded shadow-testShadow">
            {listHeaders.map((header, index) => (
              <div key={index} className="flex-1 text-center">
                <span className="text-white font-medium text-2xl font-inria-sans">
                  {header}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full shadow-testShadow scroll border border-t-none rounded-b-md">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="w-full max-h-[80px] py-5 flex border-b text-black font-medium text-2xl font-inria-sans"
            >
              <div className="flex-1 text-center">{customer.id + 1}</div>
              <div className="flex-1 text-center">
                {editCustomerId === customer.id ? (
                  <input
                    type="text"
                    className="rounded border-2"
                    value={editCustomerName}
                    onChange={(e) => setEditCustomerName(e.target.value)}
                  />
                ) : (
                  customer.Customer_name
                )}
              </div>
              <div className="flex-1 text-center">
                {customer.Customer_loyalty}
              </div>
              <div className="flex-1 text-center">{customer.Customer_code}</div>
              <div
                className="flex-1 text-center cursor-pointer"
                onClick={() =>
                  fetchOrders(
                    customer.Customer_code,
                    customer.Customer_name,
                    customer.Customer_loyalty
                  )
                }
              >
                More Detail
              </div>
              <div className="flex-1 text-center cursor-pointer">
                {editCustomerId === customer.id ? (
                  <>
                    <i
                      className="ri-check-line text-green-500 text-3xl cursor-pointer"
                      onClick={handleSave}
                    ></i>
                    <i
                      className="ri-close-line text-red-500 text-3xl cursor-pointer ml-2"
                      onClick={handleCancel}
                    ></i>
                  </>
                ) : (
                  <i
                    className="ri-ball-pen-line text-[#4692DD] text-3xl cursor-pointer"
                    onClick={() =>
                      handleUpdate(customer.id, customer.Customer_name)
                    }
                  ></i>
                )}
              </div>
              <div
                className="flex-1 text-center cursor-pointer text-3xl text-[#FF0B0B]"
                onClick={() => handleDelete(customer.id)}
              >
                <i className="ri-delete-bin-line"></i>
              </div>
              
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="fixed z-10 inset-0">
            <div className="flex items-center ml-[140px] justify-center p-4 text-center">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 ml-[140px] bg-white opacity-80"></div>
              </div>
              <div className="rounded overflow-hidden transform transition-all w-full">
                <div className="absolute w-full flex justify-between ">
                  <div className="text-black text-3xl font-bold font-text">
                    Customer Information
                  </div>
                  <button
                    type="button"
                    className="rounded-md border p-3 bg-customRed text-2xl font-bold text-gray-700 shadow-testShadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={hideOrderDetails}
                  >
                    <i className="ri-close-large-fill"></i>
                  </button>
                </div>
                <div className="bg-white px-4 mt-[70px] shadow-testShadow">
                  <div className="">
                    <div className="flex items-start">
                      <div className="flex py-5 w-full justify-between">
                        <p className="text-slate-800 text-3xl font-bold font-text">
                          Customer: {selectedCustomer}
                        </p>
                        <p className="text-slate-800 text-3xl font-bold font-text">
                          Total Sum: ${totalSum.toFixed(2)}
                        </p>
                        <p className="text-slate-800 text-3xl font-bold font-text">
                          Loyalty Points: {loyaltyPoints}
                        </p>
                        <p className="text-slate-800 text-3xl font-bold font-text">
                          Customer Code:{" "}
                          {selectedCustomerOrders &&
                            selectedCustomerOrders[0]?.Customer_code}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white w-full h-screen ">
                  <div className="flex gap-10 w-full  ">
                    {selectedCustomerOrders.map((order) => (
                      <div
                        key={order.id}
                        className=" p-4  border-2 rounded mb-4 bg-gray-100"
                      >
                        <div
                          className="text-xl w-[210px] h-[250px] font-mono cursor-pointer flex flex-col items-center"
                          onClick={() => handleOrderClick(order.id)}
                        >
                          <span className="text-7xl font-thin p-4">
                            <i className="ri-shopping-cart-2-line"></i>
                          </span>
                          <div className="flex flex-col items-start">
                            <span className="">
                              Total : {order.Total_price}$
                            </span>
                            <span className="">
                              Date :{" "}
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {expandedOrderId === order.id && (
                          <div className=" absolute w-full p-20  left-0 top-20 flex flex-col ">
                            <div className="p-2 bg-white flex flex-col gap-10">
                              <div className="text-slate-800 font-medium text-3xl font-inria-sans flex justify-between border-b pb-10">
                                <span
                                  className="  cursor-pointer"
                                  onClick={close}
                                >
                                  <i className="ri-arrow-left-wide-line"></i>
                                </span>
                                <h2 className="text-center">Order Details</h2>
                                <div></div>
                              </div>
                              <div className="flex justify-between text-slate-800 font-medium text-2xl font-inria-sans">
                                <div className="flex flex-col items-start">
                                  <p>
                                    <strong>ID:</strong> {order.id}
                                  </p>
                                  <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                      order.created_at
                                    ).toLocaleDateString()}
                                  </p>
                                </div>

                                <div>
                                  <p>
                                    <strong>Customer Name:</strong>{" "}
                                    {order.Customer_name}
                                  </p>
                                  <p>
                                    <strong>Customer Code:</strong>{" "}
                                    {order.Customer_code}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full  flex-col flex">
                                <div className="w-full flex bg-gray-100  py-5 rounded">
                                  {lists.map((list) => (
                                    <div
                                      key={list}
                                      className="flex-1 text-center"
                                    >
                                      <span className="text-slate-800 font-medium text-2xl font-inria-sans">
                                        {list}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div className="">
                                  {order.products.map((product) => (
                                    <div
                                      key={product.id}
                                      className="max-h-[90px] w-full  py-5 flex items-center border-b text-2xl font-inria-sans"
                                    >
                                      <div className="flex-1 text-center">
                                        {product.id}
                                      </div>
                                      <div className="flex-1 text-center">
                                        {product.Product_name}
                                      </div>
                                      <div className="flex-1 text-center">
                                        {product.size}
                                      </div>
                                      <div className="flex-1 text-center">
                                        ${product.Price}
                                      </div>
                                      <div className="flex-1 text-center">
                                        {product.pivot.quantity}
                                      </div>
                                      <div className="flex-1 text-center">
                                        $
                                        {(
                                          parseFloat(
                                            product.pivot.price_at_order
                                          ) * product.pivot.quantity
                                        ).toFixed(2)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col items-end justify-end text-2xl font-inria-sans ">
                                <div className="pl-10 bg-gray-100 py-5 px-5 w-[400px]">
                                  Sum Total : $
                                  {calculateTotalPrice(order.products)}
                                </div>
                                <div className=" pl-10 py-5 px-5 w-[400px]">
                                  Discount(0%) : 00
                                </div>
                                <div className=" pl-10 bg-gray-100 py-5 px-5 w-[400px]">
                                  Total Price : $
                                  {calculateTotalPrice(order.products)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customerlist;
