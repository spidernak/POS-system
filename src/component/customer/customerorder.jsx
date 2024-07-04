import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const CustomerOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, customerName, totalSum, loyaltyPoints } = location.state;

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  const hideOrderDetails = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={hideOrderDetails}>&times;</span>
        <h2>Order Details for {customerName}</h2>
        <p>Total Sum: ${totalSum.toFixed(2)}</p>
        <p>Loyalty Points: {loyaltyPoints}</p>
        {orders.map(order => (
          <div key={order.id} className="order-block">
            <h3 className="order-header" onClick={() => handleOrderClick(order.id)}>
              Order ID: {order.id}
              <span className="toggle-icon">
                {expandedOrderId === order.id ? '-' : '+'}
              </span>
            </h3>
            {expandedOrderId === order.id && (
              <div className="order-details">
                <p><strong>Customer Name:</strong> {order.Customer_name}</p>
                <p><strong>Customer Code:</strong> {order.Customer_code}</p>
                <p><strong>Quantity:</strong> {order.Quantity}</p>
                <p><strong>Total Price:</strong> ${order.Total_price}</p>
                <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
                <h4>Products:</h4>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Price at Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.Product_name}</td>
                        <td>{product.size}</td>
                        <td>${product.Price}</td>
                        <td>{product.pivot.quantity}</td>
                        <td>${(parseFloat(product.pivot.price_at_order) * product.pivot.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
