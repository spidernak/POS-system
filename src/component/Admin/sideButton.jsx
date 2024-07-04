import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const SideButton = () => {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false); // State to manage confirmation dialog

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.to === currentPath);
    setActiveIcon(activeItem ? activeItem.icon : null);
  }, [location]);

  const handleClick = (icon) => {
    if (icon === "ri-logout-box-line") {
      setShowConfirm(true); // Show confirmation dialog on logout button click
    } else {
      setActiveIcon(icon);
    }
  };

  const handleLogout = () => {
    // Perform logout actions here
    // For example, clearing local storage, redirecting to login page, etc.
    console.log("Logging out...");
    // After logout actions, you might redirect to the login page or perform other cleanup
  };

  const menuItems = [
    { icon: "ri-dashboard-3-line", label: "Dashboard", to: "/admin" },
    { icon: "ri-menu-search-line", label: "Products", to: "/admin/product" },
    { icon: "ri-id-card-line", label: "Employees", to: "/admin/employee" },
    { icon: "ri-user-line", label: "Customers", to: "/admin/customer" },
    { icon: "ri-history-line", label: "History", to: "/admin/history" },
  ];

  return (
    <div className="w-[140px] bg-white h-screen flex flex-col items-center pt-6 absolute">
      <Link to="/home">
        <img
          className="w-[70px] h-[70px] shadow-testShadow object-cover border border-black rounded-[10px] hover:scale-95"
          src={logo}
          alt="Logo"
        />
      </Link>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center gap-7 pt-5">
          {menuItems.map(({ icon, label, to }) => (
            <Link
              key={icon}
              to={to}
              className={`flex flex-col items-center w-[70px] h-[70px] cursor-pointer transition-all duration-300 ${
                activeIcon === icon
                  ? "bg-mainColor rounded-md text-white shadow-testShadow text-[30px]"
                  : "text-[40px]"
              }`}
              onClick={() => handleClick(icon)}
            >
              <i className={icon}></i>
              <span
                className={`translate-y-[-10px] font-semibold transition-all duration-300 ${
                  activeIcon === icon ? "text-[12px] text-white" : "text-[14px] text-black"
                }`}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
        <div
          className={`flex flex-col items-center pb-2 cursor-pointer transition-all duration-300 ${
            activeIcon === "ri-logout-box-line"
              ? "text-mainColor rounded-md text-[30px]"
              : "text-[40px]"
          }`}
          onClick={() => handleClick("ri-logout-box-line")}
        >
          <i className="ri-logout-box-line"></i>
          <span
            className={`translate-y-[-10px] font-semibold transition-all duration-300 ${
              activeIcon === "ri-logout-box-line" ? "text-[12px] text-mainColor" : "text-[14px] text-black"
            }`}
          >
            Log out
          </span>
        </div>
        {showConfirm && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-lg">
              <p className="text-lg mb-4">Are you sure you want to log out?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => {
                    handleLogout();
                    setShowConfirm(false);
                  }}
                >
                  Logout
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideButton;
