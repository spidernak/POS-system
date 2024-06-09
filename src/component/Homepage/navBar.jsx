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
    <div className="w-screen flex absolute justify-between ">
      <div className="max-w-full w-screen h-[80px] border-b flex justify-between fixed bg-homeBg ml-[140px]  px-10 py-5" >
      <div className="text-black text-3xl font-bold font-text">
            Choose Category
          </div>
          <div className="relative w-[415px] mr-[500px]">
            <input
              type="text"
              placeholder="Search"
              className="h-full w-full py-3 pl-4 pr-10 shadow-testShadow text-base text-[#333333] outline-none rounded-md border-none"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
            <i
              className="ri-search-line absolute pr-4 right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={onSearchIconClick}
            ></i>
          </div>
      </div>
    </div>
  );
};

export default NavBar;
