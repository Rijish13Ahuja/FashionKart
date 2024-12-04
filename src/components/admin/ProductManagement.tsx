import React, { useEffect, useState } from 'react';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from '../../services/ProductService.ts';
import { productValidationSchema } from '../admin/validations/productValidations';
import * as Yup from 'yup';

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
    discount: '',
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

  const validateAndSubmit = async (e: React.FormEvent, isUpdate: boolean, productId?: number) => {
    e.preventDefault();

    try {
      // Validate form data using productValidationSchema
      await productValidationSchema.validate({
        name: formData.name,
        category: formData.category,
        imageUrl: formData.imageUrl,
        originalPrice: parseFloat(formData.originalPrice),
        reducedPrice: parseFloat(formData.reducedPrice),
        stock: parseInt(formData.stock),
        discount: formData.discount ? parseInt(formData.discount) : undefined,
      });

      const productData = {
        name: formData.name,
        category: formData.category,
        imageUrl: formData.imageUrl,
        originalPrice: parseFloat(formData.originalPrice),
        reducedPrice: parseFloat(formData.reducedPrice),
        stock: parseInt(formData.stock),
        discount: formData.discount ? parseInt(formData.discount) : undefined,
      };

      if (isUpdate && productId) {
        await updateProduct(productId, productData);
        setEditProduct(null);
      } else {
        await createProduct(productData);
      }

      setFormData({
        name: '',
        category: '',
        imageUrl: '',
        originalPrice: '',
        reducedPrice: '',
        stock: '',
        discount: '',
      });

      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        alert(`Validation Error: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    }
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
      discount: product.discount?.toString() || '',
    });
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Product Management</h2>

      <form
        className="space-y-6 bg-white p-8 rounded-lg shadow-sm w-full"
        onSubmit={(e) =>
          validateAndSubmit(e, !!editProduct, editProduct ? editProduct.id : undefined)
        }
      >
        <div className="flex flex-col space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="number"
              name="originalPrice"
              placeholder="Original Price"
              value={formData.originalPrice}
              onChange={handleFormChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="discount"
              placeholder="Discount (%)"
              value={formData.discount}
              onChange={handleFormChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {editProduct ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>

      <h3 className="text-xl mt-8 text-center text-gray-700">Product List</h3>
      <ul className="space-y-6 mt-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-green-600">
                ${product.reducedPrice} (Discount: {product.discount}% off)
              </p>
              <p className="text-gray-800">Stock: {product.stock}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="w-24 h-10 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50 transition-colors"
                  onClick={() => handleEditProduct(product.id)}
                >
                  Edit
                </button>
                <button
                  className="w-24 h-10 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
