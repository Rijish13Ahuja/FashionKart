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
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
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
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-contain rounded-md"
        />
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-gray-500 mt-4">{product.description}</p>
          <p className="mt-4 text-lg">
            <span className="text-green-600 font-bold">
              ₹{product.reduced_price}
            </span>{' '}
            <del className="text-gray-400">₹{product.original_price}</del>
          </p>
          <p
            className={`mt-2 ${product.stock > 0 ? 'text-blue-600' : 'text-red-600'}`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
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
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
        <p className="mt-2">Rating: {product.ratings} / 5</p>
        <ul className="mt-4 space-y-2">
          {product.reviews.map((review, index) => (
            <li key={index} className="border-b pb-2">
              {review}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
