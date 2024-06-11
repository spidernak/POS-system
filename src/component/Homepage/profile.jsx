import { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  return (
    <div className="flex px-4 py-4 gap-5 max-h-[100px]">
      <img className="w-[70px] h-[70px] rounded-[10px] border shadow-testShadow" src={logo} alt="" />
      <div className="flex flex-col">
        <div className="font-inria-sans font-semibold">{user?.name}</div>
        <div className="font-kotta-one">{user?.role}</div>
      </div>
    </div>
  );
};

export default Profile;
