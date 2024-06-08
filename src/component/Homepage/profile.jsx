import logo from "../../assets/logo.jpg";
const profile = () => {
  return (
    <div className="flex px-4 py-4 gap-5 max-h-[100px]">
      <img className="w-[70px] h-[70px] rounded-[10px]" src={logo} alt="" />
      <div className="flex flex-col ">
        <div className="font-inria-sans font-semibold">name</div>
        <div className="font-kotta-one">role</div>

      </div>
    </div>
  );
};
export default profile;