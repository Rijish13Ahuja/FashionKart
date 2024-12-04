import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  img_url?: string; // Optional field for product image URL
}

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const productsData = await response.json();
        console.log(productsData); // Check the response structure
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId: number) => {
    setEditingProductId(productId);
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setEditedProduct({ ...productToEdit });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (editedProduct) {
      setProducts(
        products.map((product) =>
          product.id === editedProduct.id ? { ...editedProduct } : product
        )
      );
      setEditingProductId(null);
      setEditedProduct(null);
    }
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setEditedProduct(null);
  };

  const handleDelete = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Total Products</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-2">{products.length}</p>
            <p className="text-gray-500 mt-1">Total number of products in the inventory</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">120</p>
            <p className="text-gray-500 mt-1">Total number of orders placed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Pending Products</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">5</p>
            <p className="text-gray-500 mt-1">Products pending approval or restocking</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Products Overview</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={product.img_url || 'https://via.placeholder.com/150?text=Product+Image'}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  {editingProductId === product.id ? (
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={editedProduct?.name || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full mb-2"
                      />
                      <input
                        type="text"
                        name="category"
                        value={editedProduct?.category || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full mb-2"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editedProduct?.price || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full mb-2"
                      />
                      <input
                        type="number"
                        name="stock"
                        value={editedProduct?.stock || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full mb-2"
                      />
                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={handleSave}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <p className="text-lg font-bold text-indigo-600 mt-2">${product.price}</p>
                      <p className="text-sm text-gray-500">In Stock: {product.stock}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
