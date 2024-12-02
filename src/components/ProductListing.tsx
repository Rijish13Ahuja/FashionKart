import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from './user/CartContext';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: number;
  category: string;
  url: string;
  name: string;
  image_url: string;
  discount: number;
  original_price: number;
  reduced_price: number;
  stock: number;
}

const ProductListing: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const sectionId = new URLSearchParams(location.search).get('section'); // Get section ID

  useEffect(() => {
    // Fetch products based on section ID
    fetch(`http://localhost:3000/products?category=${sectionId}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [sectionId]);

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image_url,
      price: product.reduced_price,
      quantity: 1,
    };

    addToCart(cartItem);

    const toastMessage = (
      <div className="flex items-center">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-12 w-12 object-cover rounded-md border border-gray-300 mr-4"
        />
        <div>
          <h4 className="font-bold text-gray-800">{product.name}</h4>
          <p className="text-sm text-green-600">Added to your cart!</p>
        </div>
      </div>
    );

    toast(toastMessage, {
      position: 'top-center',
      autoClose: 3000,
      closeOnClick: true,
      className: 'bg-white shadow-lg rounded-lg p-4',
      progressClassName: 'bg-green-500',
    });
  };

  const handleBuyNow = (product: Product) => {
    navigate('/checkout', { state: { product } });
  };

  const handleViewDetails = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Products in {sectionId}</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-gray-500 line-through">
                ₹{product.original_price.toFixed(2)}
              </p>
              <p className="text-green-600 font-bold">
                ₹{product.reduced_price.toFixed(2)} ({product.discount}% OFF)
              </p>
              <p
                className={`mt-2 ${
                  product.stock > 0 ? 'text-blue-600' : 'text-red-600'
                }`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Buy Now
                </button>
              </div>
              <button
                onClick={() => handleViewDetails(product.id)}
                className="mt-4 block w-full bg-gray-100 text-gray-700 text-center py-2 rounded-md hover:bg-gray-200"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found in this section.</p>
      )}
    </div>
  );
};

export default ProductListing;
