import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './user/CartContext';

interface Product {
  id: number;
  name: string;
  image_url: string;
  category: string;
  description: string;
  original_price: number;
  reduced_price: number;
  discount: number;
  stock: number;
  ratings: number;
  reviews: string[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details.');
        }
        return response.json();
      })
      .then((data) => {
        setProduct({ ...data, reviews: data.reviews || [] }); // Ensure reviews is always an array
      })
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image_url,
        price: product.reduced_price,
        quantity: 1,
      });
    }
  };

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 w-96 flex flex-col items-center justify-between">
        <div className="w-full h-60 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
          <p className="text-sm text-gray-600 mt-2">{product.category}</p>
          <p className="text-gray-500 mt-4">{product.description}</p>
          <p className="mt-4 text-lg">
            <span className="text-green-600 font-bold">
              ₹{product.reduced_price}
            </span>{' '}
            <del className="text-gray-400">₹{product.original_price}</del>
          </p>
          <p
            className={`mt-2 ${
              product.stock > 0 ? 'text-blue-600' : 'text-red-600'
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
