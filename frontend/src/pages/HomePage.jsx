import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, isLoading, isError, message } = useSelector((state) => state.product);
  
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, qty: 1 }));
        alert('Added to cart');
    };
  
    return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 rounded-lg mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopMERN</h1>
        <p className="text-lg md:text-xl mb-8">Discover the latest trends in electronics and fashion.</p>
        <Link to="/shop" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured Products</h2>
        {isLoading ? (
            <div className="text-center">Loading...</div>
        ) : isError ? (
            <div className="text-center text-red-500">{message}</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition">
                <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400 overflow-hidden">
                    {product.ProductImages && product.ProductImages.length > 0 ? (
                        <img src={`http://localhost:5000${product.ProductImages[0].image_url}`} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <span>No Image</span>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-500 mb-4">${product.price}</p>
                    <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Add to Cart
                    </button>
                </div>
                </div>
            ))}
            </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
