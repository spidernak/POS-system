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
        <div className="flex flex-col items-center gap-10 pt-10">
          {[
            { icon: "ri-home-office-line", label: "Home" },
            { icon: "ri-menu-search-line", label: "Menu" },
            { icon: "ri-history-line", label: "History" },
            { icon: "ri-wallet-line", label: "Wallet" },
          ].map(({ icon, label }) => (
            <div
              key={icon}
              className={`flex flex-col items-center w-[70px] cursor-pointer ${
                activeIcon === icon ? "bg-[#0071BD] rounded-md text-white shadow-testShadow" : ""
              }`}
              onClick={() => handleClick(icon)}
            >
              <i className={`${icon} text-[40px]`}></i>
              <span className="translate-y-[-10px] text-[14px] font-semibold">{label}</span>
            </div>
          ))}
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeIcon === "ri-logout-box-line" ? "text-[#0071BD] rounded-md " : ""
          }`}
          onClick={() => handleClick("ri-logout-box-line")}
        >
          <i className="ri-logout-box-line text-[40px]"></i>
          <span className="translate-y-[-10px] text-[14px] font-semibold">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default SideButton;
