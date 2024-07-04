/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const SideButton = () => {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.to === currentPath);
    setActiveIcon(activeItem ? activeItem.icon : null);
  }, [location]);

  const handleClick = (icon) => {
    setActiveIcon(icon);
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
      <Link to='/home'>
      <img
        className="w-[70px] h-[70px] shadow-testShadow object-cover border border-black rounded-[10px] hover:scale-95"
        src={logo}
        alt="Logo"
      /></Link>
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
        <Link to='/'>
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
        </div></Link>
      </div>
    </div>
  );
};

export default SideButton;
