import{ useState, useEffect } from 'react';
import Category from '../component/Homepage/Category';
import Navbar from '../component/Homepage/navBar';
import Product from '../component/Homepage/product';
import Cart from '../component/Homepage/cart';
import { product as initialProducts } from '../store/index'; // Import initial product data
import '../App.css';

const Home = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightSearch, setHighlightSearch] = useState(true);

  // Use initial products to avoid modifying the original data
  const [products, setProducts] = useState(initialProducts);

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

  const updateProductQuantities = (cartItems) => {
    const updatedProducts = products.map(product => {
      const updatedProduct = { ...product };
      cartItems.forEach(cartItem => {
        if (cartItem.id === updatedProduct.id && cartItem.selectedSize in updatedProduct.quantity) {
          updatedProduct.quantity[cartItem.selectedSize] -= cartItem.quantity;
        }
      });
      return updatedProduct;
    });
    setProducts(updatedProducts);
  };

  const handleSearchIconClick = () => {
    setHighlightSearch(false);
  };

  return (
    <div className='flex bg-homeBg absolute'>
      <div className='flex flex-col items-center max-h-[100vh] scroll'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchIconClick={handleSearchIconClick} />
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Product addToCart={addToCart} selectedCategory={selectedCategory} searchTerm={searchTerm} highlightSearch={highlightSearch} />
      </div>
      <Cart cartItems={cartItems} setCartItems={setCartItems} updateProductQuantities={updateProductQuantities} />
    </div>
  );
};

export default Home;
