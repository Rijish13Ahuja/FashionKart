// src/components/admin/ProductManagement.tsx
import React, { useEffect, useState } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById } from '../../services/ProductService.ts';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    imageUrl: '',
    originalPrice: '',
    reducedPrice: '',
    stock: '',
    discount: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getAllProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      category: formData.category,
      imageUrl: formData.imageUrl,
      originalPrice: parseFloat(formData.originalPrice),
      reducedPrice: parseFloat(formData.reducedPrice),
      stock: parseInt(formData.stock),
      discount: formData.discount ? parseInt(formData.discount) : undefined
    };

    await createProduct(newProduct);
    setFormData({
      name: '',
      category: '',
      imageUrl: '',
      originalPrice: '',
      reducedPrice: '',
      stock: '',
      discount: ''
    });

    const productsData = await getAllProducts();
    setProducts(productsData);
  };

  const handleUpdateProduct = async (id: number) => {
    const updatedProduct = {
      name: formData.name,
      category: formData.category,
      imageUrl: formData.imageUrl,
      originalPrice: parseFloat(formData.originalPrice),
      reducedPrice: parseFloat(formData.reducedPrice),
      stock: parseInt(formData.stock),
      discount: formData.discount ? parseInt(formData.discount) : undefined
    };

    await updateProduct(id, updatedProduct);
    setEditProduct(null);
    setFormData({
      name: '',
      category: '',
      imageUrl: '',
      originalPrice: '',
      reducedPrice: '',
      stock: '',
      discount: ''
    });

    const productsData = await getAllProducts();
    setProducts(productsData);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    const productsData = await getAllProducts();
    setProducts(productsData);
  };

  const handleEditProduct = async (id: number) => {
    const product = await getProductById(id);
    setEditProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      imageUrl: product.imageUrl,
      originalPrice: product.originalPrice.toString(),
      reducedPrice: product.reducedPrice.toString(),
      stock: product.stock.toString(),
      discount: product.discount?.toString() || ''
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>

      <form
        className="space-y-4"
        onSubmit={editProduct ? (e) => { e.preventDefault(); handleUpdateProduct(editProduct.id); } : handleCreateProduct}
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleFormChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleFormChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleFormChange}
            className="input-field"
          />
        </div>
        <div>
          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={formData.originalPrice}
            onChange={handleFormChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="reducedPrice"
            placeholder="Reduced Price"
            value={formData.reducedPrice}
            onChange={handleFormChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleFormChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={formData.discount}
            onChange={handleFormChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="btn-submit">
          {editProduct ? 'Update Product' : 'Create Product'}
        </button>
      </form>

      <h3 className="text-xl mt-6">Product List</h3>
      <ul className="space-y-4 mt-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg">
            <div>
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-green-600">${product.reducedPrice} (Discount: {product.discount}% off)</p>
              <p className="text-gray-800">Stock: {product.stock}</p>
              <button
                className="btn-edit"
                onClick={() => handleEditProduct(product.id)}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
