import React, { useState, useEffect } from 'react';
import Barchat from '../../component/Dashboard/Barchat';
import Top from '../../component/Dashboard/Top';
import Bottom from '../../component/Dashboard/Bottom'; // Ensure the correct import path

const Dashboard = () => {
  const [isVisibleBestSelling, setIsVisibleBestSelling] = useState(false); // State for Best Selling section visibility
  const [isVisibleRecentlyAdd, setIsVisibleRecentlyAdd] = useState(false); // State for Recently Add section visibility

  const handleShowBestSelling = () => {
    setIsVisibleBestSelling(prevState => !prevState); // Toggle Best Selling section visibility
    setIsVisibleRecentlyAdd(false); // Close Recently Add section
  };

  const handleShowRecentlyAdd = () => {
    setIsVisibleRecentlyAdd(prevState => !prevState); // Toggle Recently Add section visibility
    setIsVisibleBestSelling(false); // Close Best Selling section
  };

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-5 py-5 gap-5">
        <div className="w-full flex">
          <Top />
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="h-full shadow-testShadow scroll border border-t-none rounded-b-md">
            <Barchat />
          </div>
        </div>
        <div className="flex text-3xl font-inria-sans">
          <button
            className={`mx-2 py-2 px-4 w-[50%] h-[95px] hover:scale-95  bg-Blue text-white rounded ${isVisibleBestSelling }`}
            onClick={handleShowBestSelling}
          >
            Best Selling
          </button>
          <button
            className={`mx-2 py-2 px-4 w-[50%] h-[95px] hover:scale-95 bg-Blue text-white rounded ${isVisibleRecentlyAdd }`}
            onClick={handleShowRecentlyAdd}
          >
            Recently Add
          </button>
        </div>
        <div className="flex mt-5">
          <Bottom type="bestSelling" isVisible={isVisibleBestSelling} />
          <Bottom type="recentlyAdd" isVisible={isVisibleRecentlyAdd} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
