import { menu } from '../../store/index';
const Category = () => {
  return (
    <div className=" w-[1020px] max-w-[1080px]  ">
      <div className='flex justify-center gap-10 py-10'>
      {menu.map((categoryItem) => (
        <div key={categoryItem.id} className="w-[115px] h-[145px] flex flex-col items-center justify-center bg-white rounded-md shadow-testShadow">
          <img src={categoryItem.image} alt="" />
          <div className='text-black font-semibold '>{categoryItem.title}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Category;
