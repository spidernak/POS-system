/* eslint-disable react/prop-types */
import { menu } from '../../store/index';

const Category = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-[1020px] max-w-[1080px] pt-16">
      <div className='flex justify-center gap-10 py-10'>
        {menu.map((categoryItem) => (
          <div 
            key={categoryItem.id} 
            className={`w-[115px] h-[145px] flex flex-col items-center justify-center bg-white rounded-md shadow-testShadow ${selectedCategory === categoryItem.title ? 'bg-blue-200' : ''}`}
            onClick={() => setSelectedCategory(categoryItem.title)}
          >
            <img src={categoryItem.image} alt={categoryItem.title} />
            <div className='text-black font-semibold'>{categoryItem.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
