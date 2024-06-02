const NavBar = () => {
  return (
    <div className="flex bg-homeBg w-[1100px] py-6 h-[70px] items-center justify-between px-5 mx-auto">
      <div className="text-black text-3xl pl-6 font-bold font-text">
        Choose Category
      </div>

      <div className="relative w-[415px]">
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full py-3 pl-4 pr-10 shadow-testShadow text-base text-[#333333] outline-none rounded-md border-none"
        />
        <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
      </div>
    </div>
  );
};

export default NavBar;
