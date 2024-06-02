import { menu } from '../store/index';
import logo from '../assets/logo.jpg'
const Category = () => {
  return (
    <div className="flex px-11 py-10  gap-10">
      {menu.map((categoryItem) => (
        <div key={categoryItem.id} className="w-[115px] h-[145px] flex flex-col items-center justify-center bg-white rounded-md shadow-testShadow">
          <img src={logo} alt="" />
          <div className='text-black font-semibold '>{categoryItem.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Category;
