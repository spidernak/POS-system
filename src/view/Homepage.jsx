import  { useState, useEffect } from 'react';
import Category from '../component/Homepage/Category';
import Navbar from '../component/Homepage/navBar';
import Product from '../component/Homepage/product';
import Cart from './cart';
import '../App.css';

const Home = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightSearch, setHighlightSearch] = useState(true);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const handleSearchIconClick = () => {
    setHighlightSearch(false);
  };

  return (
    <div className='flex justify-end w-full h-full bg-homeBg'>
      <div className='flex flex-col items-center border max-h-[100vh] scroll'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchIconClick={handleSearchIconClick} />
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Product addToCart={addToCart} selectedCategory={selectedCategory} searchTerm={searchTerm} highlightSearch={highlightSearch} />
      </div>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default Home;
