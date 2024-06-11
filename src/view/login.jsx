import { useState } from "react";``
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { cashiers, admins } from "../store/index"; // Import user data
import "../App.css";
import logo from "../assets/logo.jpg";

const Login = () => {
  
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const cashier = cashiers.find(
      (cashier) =>
        cashier.name === username && cashier.password === password
    );
    if (cashier) {
      localStorage.setItem("user", JSON.stringify(cashier));
      window.location.href = "/home";
    } else {
      const admin = admins.find(
        (admin) =>
          admin.name === username && admin.password === password
      );
      if (admin) {
        localStorage.setItem("user", JSON.stringify(admin));
        window.location.href = "/admin";
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="py-10 pt-[80px]">
        <img
          className="w-[200px] h-[200px] shadow-testShadow object-cover border border-black rounded-[10px] hover:scale-95"
          src={logo}
          alt="Login Image"
        />
      </div>
      <div className="w-[87px] h-[70px] text-black text-[32px]  font-semibold font-inria-sans">
        Login
      </div>
      
      <section className="h-[300px] flex flex-col gap-[40px] relative w-[450px]">
        {/* Username */}
        
        <div className="max-w-[710px] flex items-center">
          <input
            type="text"
            className={`w-full p-2  border-[#ABA2A2] h-[55px] shadow-testShadow border-[1px] rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#837c7c] ${
              usernameFocused || username ? "" : ""
            }`}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={`absolute pl-2 transition-all duration-200 ease-in-out flex items-center gap-2 ${
              usernameFocused || username
                ? "text-[14px] -left-2 text-blue-500 -top-[25px]"
                : " text-base text-[#ABA2A2] "
            }`}>
             <FontAwesomeIcon
              icon={faUser}
              className={`transition-all duration-300 ease-in-out ${
                usernameFocused || username ? "w-5 h-5 " : "w-[20px] h-7 "
              }`}
            />
            Username
          </label>
        </div>
        {/* Password */}
        <div className="relative w-full">
          <input
            type="password"
            className={`w-full p-2 border-[#ABA2A2] h-[55px] shadow-testShadow border-[1px] rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#837c7c] ${
              passwordFocused || password ? "" : ""
            }`}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={`absolute pl-2 transition-all duration-200 ease-in-out flex items-center gap-2 ${
              passwordFocused || password
                ? "top-[-25px] -left-2 text-[14px] text-blue-500"
                : "top-[15px] text-base text-[#ABA2A2]"
            }`}>
              <FontAwesomeIcon
              icon={faLock}
              className={`transition-all duration-300 ease-in-out ${
                passwordFocused || password ? "w-5 h-5" : "w-[20px] h-7"
              }`}
            />
            Password
          </label>
        </div>
        
      {error && <div className="text-red-500 absolute translate-y-[158px] translate-x-1">{error}</div>}
        {/* Login Button */}
        <button
          className="w-full p-2  h-[50px] bg-[#0F7AC1] font-inria-sans text-white font-semibold text-[20px] rounded-md shadow-testShadow hover:scale-105 transition-all duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
      </section>
    </div>
  );
};

export default Login;
