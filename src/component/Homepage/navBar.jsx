/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const NavBar = ({ searchTerm, setSearchTerm, onSearchIconClick }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, setSearchTerm]);

  return (
    <div className="w-screen">
      <div className="max-w-full ml-[140px] mr-[430px] fixed top-0 z-50 shadow-md bg-homeBg left-0 right-0 h-20 border-b px-5 py-3 flex justify-between items-center">
        <div className="text-black text-3xl font-bold font-text">Choose Category</div>
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full py-3 pl-4 pr-10 shadow-testShadow text-base text-[#333333] outline-none rounded-md border-none"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          <i
            className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={onSearchIconClick}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
