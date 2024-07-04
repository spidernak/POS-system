// src/view/login.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import logo from '../assets/logo.jpg';

const Login = () => {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8005/api/login', {
        name: username,
        password: password,
      });

      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Invalid username or password');
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
      <div className="w-[87px] h-[70px] text-black text-[32px] font-semibold font-inria-sans">
        Login
      </div>

      <section className="h-[300px] flex flex-col gap-[40px] relative w-[450px]">
        {/* Username */}
        <div className="max-w-[710px] flex items-center">
          <input
            type="text"
            className={`w-full p-2 border-[#ABA2A2] h-[55px] shadow-testShadow border-[1px] rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#837c7c] ${
              usernameFocused || username ? '' : ''
            }`}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            className={`absolute pl-2 transition-all duration-200 ease-in-out flex items-center gap-2 ${
              usernameFocused || username
                ? 'text-[14px] -left-2 text-blue-500 -top-[25px]'
                : 'text-base text-[#ABA2A2]'
            }`}
          >
            <FontAwesomeIcon
              icon={faUser}
              className={`transition-all duration-300 ease-in-out ${
                usernameFocused || username ? 'w-5 h-5' : 'w-[20px] h-7'
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
              passwordFocused || password ? '' : ''
            }`}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className={`absolute pl-2 transition-all duration-200 ease-in-out flex items-center gap-2 ${
              passwordFocused || password
                ? 'top-[-25px] -left-2 text-[14px] text-blue-500'
                : 'top-[15px] text-base text-[#ABA2A2]'
            }`}
          >
            <FontAwesomeIcon
              icon={faLock}
              className={`transition-all duration-300 ease-in-out ${
                passwordFocused || password ? 'w-5 h-5' : 'w-[20px] h-7'
              }`}
            />
            Password
          </label>
        </div>

        {error && (
          <div className="text-red-500 absolute translate-y-[158px] translate-x-1">
            {error}
          </div>
        )}
        {/* Login Button */}
        <button
          type="submit"
          className="w-full p-2 h-[50px] bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-md shadow-testShadow hover:scale-105"
          onClick={handleLogin}
        >
          Login
        </button>
      </section>
      <div className="pb-[120px]" />
    </div>
  );
};

export default Login;
