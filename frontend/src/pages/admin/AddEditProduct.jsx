import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getProductById } from '../../features/products/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: 1, // Default or fetch categories
    images: null,
  });

  const { name, description, price, stock, categoryId } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, product } = useSelector(
    (state) => state?.product
  );

  console.log(" product",product)

  useEffect(() => {
    if(id) {
        dispatch(getProductById(id));
    }
  }, [id]);

  useEffect(() => {
    if(product && id && product!==null) {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId,
            images: product.images,
        });
    }
  }, [product]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          images: e.target.files
      }))
  }
  

  const onSubmit = (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('name', name);
    productData.append('description', description);
    productData.append('price', price);
    productData.append('stock', stock);
    productData.append('categoryId', categoryId);
    
    if(formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
            productData.append('images', formData.images[i]);
        }
    }
    if(id) {
        dispatch(updateProduct(id, productData));
    } else {
        dispatch(createProduct(productData));
    }
    navigate('/admin/products');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-gray-700 font-bold mb-2">Price</label>
                <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-bold mb-2">Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={stock}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>
        </div>
        
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Images</label>
            <input type="file" multiple onChange={onFileChange} className="w-full" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddEditProduct;
