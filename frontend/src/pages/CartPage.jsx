import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl text-gray-600 mb-4">Your cart is empty</h2>
          <Link to="/" className="text-blue-600 hover:underline">Go Back</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Image Placeholder if url not available or mock */}
                   <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                       {item.ProductImages && item.ProductImages.length > 0 ? (
                            <img src={`http://localhost:5000${item.ProductImages[0].image_url}`} alt={item.name} className="w-full h-full object-cover" />
                       ) : (
                           <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">img</div>
                       )}
                   </div>
                  <div>
                    <Link to={`/product/${item.id}`} className="font-semibold text-gray-800 hover:text-blue-600">
                      {item.name}
                    </Link>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                   <select 
                     value={item.qty} 
                     onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                     className="border rounded p-1"
                   >
                     {[...Array(item.stock > 0 ? item.stock : 1).keys()].map((x) => (
                       <option key={x + 1} value={x + 1}>
                         {x + 1}
                       </option>
                     ))}
                   </select>
                   <button 
                     onClick={() => dispatch(removeFromCart(item.id))}
                     className="text-red-500 hover:text-red-700"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
              <span>${total}</span>
            </div>
            <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                <button 
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                    Proceed to Checkout
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
