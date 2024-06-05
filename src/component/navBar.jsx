const NavBar = () => {
  return (
    <div className="max-w-[1080px] w-[950px] flex justify-center">
      <div className="flex bg-homeBg  py-6 w-[950px] h-[70px] items-center justify-between  mx-auto">
      <div className="text-black text-3xl  font-bold font-text">
        Choose Category
      </div>

      <div className="relative w-[415px]">
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full py-3 pl-4 pr-10 shadow-testShadow text-base text-[#333333] outline-none rounded-md border-none"
        />
        <i className="ri-search-line absolute pr-4 right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
