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
      const result = await axios.get(`http://localhost:8005/api/findOrderByCustomerName?Customer_code=${customerCode}`);
      console.log("Fetched orders:", result.data.orders);
      setSelectedCustomerOrders(result.data.orders);
      setSelectedCustomer(customerName);
      setIsModalOpen(true);
      setTotalSum(result.data.orders.reduce((sum, order) => sum + order.Total_price, 0));
      setLoyaltyPoints(customerLoyalty);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
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

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8005/api/updatecustomer/${editCustomerId}`, {
        Customer_name: editCustomerName,
      });
      console.log("Customer updated successfully.");
      setEditCustomerId(null);
      setEditCustomerName("");
      setTempCustomerName("");
      fetchData();
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  const handleCancel = () => {
    setEditCustomerId(null);
    setEditCustomerName("");
    setTempCustomerName("");
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8005/api/removecutomer/${customerId}`);
      console.log("Customer deleted successfully.");
      fetchData();
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  const listHeaders = ["ID", "Name", "Loyalty", "Code", "Detail", "Edit", "Delete"];

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-5 py-5 ">
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
        <div className="w-full  flex-col flex">
          <div className="w-full flex bg-Blue py-5 rounded shadow-testShadow">
            {listHeaders.map((header, index) => (
              <div key={index} className="flex-1 text-center">
                <span className="text-white font-medium text-2xl font-inria-sans">
                  {header}
                </span>
              </div>
            ))}
          </div>
          
        </div><div className="h-full shadow-testShadow scroll border border-t-none rounded-b-md">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="w-full max-h-[80px]  py-5 flex border-b text-black font-medium text-2xl font-inria-sans"
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
                <div className="flex-1 text-center">{customer.Customer_loyalty}</div>
                <div className="flex-1 text-center">{customer.Customer_code}</div>
                <div
                  className="flex-1 text-center cursor-pointer"
                  onClick={() => fetchOrders(customer.Customer_code, customer.Customer_name, customer.Customer_loyalty)}
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
                      onClick={() => handleUpdate(customer.id, customer.Customer_name)}
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
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={hideOrderDetails}>&times;</span>
              <h2>Orders for {selectedCustomer}</h2>
              <p>Total Sum: {totalSum}</p>
              <p>Loyalty Points: {loyaltyPoints}</p>
              {selectedCustomerOrders.map((order) => (
                <div key={order.id} className="order">
                  <div onClick={() => handleOrderClick(order.id)}>
                    Order ID: {order.id} - Total Price: {order.Total_price}
                  </div>
                  {expandedOrderId === order.id && (
                    <div className="order-details">
                      {/* Render order details here */}
                      <p>Order Date: {order.order_date}</p>
                      <p>Items:</p>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>{item.name} - {item.quantity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customerlist;
