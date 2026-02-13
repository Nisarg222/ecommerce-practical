import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './pages/admin/AdminLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/admin/ProductList';
import AddEditProduct from './pages/admin/AddEditProduct';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<ProductList />} />
          <Route path="product/add" element={<AddEditProduct />} />
          <Route path="product/edit/:id" element={<AddEditProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
