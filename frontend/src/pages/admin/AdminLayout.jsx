import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state?.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    if (!user || user.role !== 'admin') {
        return <div className="text-center mt-20 text-red-500 font-bold">Access Denied. Admins Only.</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex-shrink-0">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/products" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                        <Package className="w-5 h-5" />
                        <span>Products</span>
                    </Link>
                    <Link to="/admin/orders" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                        <ShoppingBag className="w-5 h-5" />
                        <span>Orders</span>
                    </Link>
                    <button onClick={onLogout} className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-red-50 text-red-600 rounded-md mt-8">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
