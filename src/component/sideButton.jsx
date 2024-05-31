// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../assets/logo.jpg";

const SideButton = () => {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <div className="w-[120px] h-screen flex flex-col items-center pt-6">
      <img
        className="w-[70px] h-[70px] shadow-testShadow object-cover border border-black rounded-[10px] hover:scale-95"
        src={logo}
        alt="Login Image"
      />
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center gap-7 pt-5">
          {[
            { icon: "ri-home-office-line", label: "Home" },
            { icon: "ri-menu-search-line", label: "Menu" },
            { icon: "ri-history-line", label: "History" },
            { icon: "ri-wallet-line", label: "Wallet" },
          ].map(({ icon, label }) => (
            <div
              key={icon}
              className={`flex flex-col items-center w-[70px] h-[70px] cursor-pointer text-[40px] ${
                activeIcon === icon ? "bg-[#0071BD] rounded-md text-white shadow-testShadow text-[30px] w-[70px] h-[70px] duration-300" : ""
              }`}
              onClick={() => handleClick(icon)}
            >
              <i className={`${icon} `}></i>
              <span className="translate-y-[-10px] text-[14px] font-semibold">{label}</span>
            </div>
          ))}
        </div>
        <div
          className={`flex flex-col items-center pb-2 cursor-pointer text-[40px] ${
            activeIcon === "ri-logout-box-line" ? "text-[#0071BD] rounded-md text-[30px] w-[70px] h-[70px] duration-300" : ""
          }`}
          onClick={() => handleClick("ri-logout-box-line")}
        >
          <i className="ri-logout-box-line"></i>
          <span className="translate-y-[-10px] text-[14px] font-semibold">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default SideButton;
