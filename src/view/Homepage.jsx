/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Login from './login';
import Category from '../component/Homepage/Category';
import SideButton from '../component/Homepage/sideButton';
import Navbar from '../component/Homepage/navBar';
import Product from '../component/Homepage/product';
import Cart from './cart';
import { product } from '../store/index';
import '../App.css'

const Home = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className='flex w-screen bg-homeBg'>
      <SideButton />
      <div className='flex flex-col items-center  max-h-[100vh]  scroll'>
        <Navbar />
        <Category />
        <Product addToCart={addToCart} />
      </div>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
}

export default Home;
