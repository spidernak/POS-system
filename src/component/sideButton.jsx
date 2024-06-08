// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../assets/logo.jpg";

import { Link } from "react-router-dom";

const SideButton = () => {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <div className="w-[140px] bg-white h-screen flex flex-col items-center pt-6">
      <img
        className=" w-[70px] h-[70px] shadow-testShadow object-cover border border-black rounded-[10px] hover:scale-95"
        src={logo}
        alt="Login Image"
      />
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center gap-7 pt-5">
          {[
            { icon: "ri-home-office-line", label: "Home",to:'/home' },
            { icon: "ri-menu-search-line", label: "Products" },
            { icon: "ri-history-line", label: "History" },
            { icon: "ri-wallet-line", label: "Customer" },
          ].map(({ icon, label }) => (
            <Link
              key={icon}
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
              ? "text-mainColor  rounded-md text-[30px]"
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
      </div>
    </div>
  );
};

export default SideButton;
