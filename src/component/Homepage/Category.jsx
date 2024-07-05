/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { menu } from '../../store/index';

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Adjust the scrollY value as needed
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div className="max-w-screen h-screen mr-[450px] ml-[140px] pt-14">
        <div className='flex w-full justify-center text-2xl font-inria-sans gap-10 py-10 px-10'>
          {menu.map((categoryItem) => (
            <div 
              key={categoryItem.id} 
              className={`w-[150px] h-[180px] flex flex-col items-center justify-center bg-white rounded-md shadow-testShadow hover:scale-x-105 ${selectedCategory === categoryItem.title ? 'bg-blue-200' : ''}`}
              onClick={() => setSelectedCategory(categoryItem.title)}
            >
              <img className='w-[120px] h-[100px] object-cover scale-105' src={categoryItem.image} alt={categoryItem.title} />
              <div className='text-black font-semibold text-xl'>{categoryItem.title}</div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Category;
