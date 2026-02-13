import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopMERN
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + (item.qty || 1), 0)}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
               <span className="text-gray-700 font-medium">Hi, {user.name}</span>
               <button onClick={onLogout} className="flex items-center space-x-1 text-gray-700 hover:text-red-500">
                 <LogOut className="w-5 h-5" />
                 <span>Logout</span>
               </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
