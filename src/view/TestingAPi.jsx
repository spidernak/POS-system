// src/ProductList.js
// import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapiserver.vercel.app/amazonproducts')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='w-full h-full'>

      <div className='w-full grid grid-cols-6  pl-10  gap-10 pb-10'>
        {products.map(product => (
          <div key={product.id} className='w-[200px] h-[250px] flex flex-col font-inria-sans items-center pt-2 bg-white rounded-md shadow-testShadow'>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} width="100" />
            {/* <div>{product.description}</div> */}
            <div>Price: ${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
