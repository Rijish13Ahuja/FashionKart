import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './user/CartContext';
import { ToastContainer, toast } from 'react-toastify';
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
  rating: number; 
  brand: string; 
}

const ProductListing: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // State hooks for filters
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category');
    setSelectedCategory(categoryFromUrl);

    fetch(`http://localhost:3000/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error(err));
  }, [location.search]);

  useEffect(() => {
    let filtered = products;

    if (priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.reduced_price >= priceRange[0] &&
          product.reduced_price <= priceRange[1]
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    if (selectedRating !== null) {
      filtered = filtered.filter(
        (product) => product.rating >= selectedRating // Filtering by 'rating'
      );
    }

    setFilteredProducts(filtered);
  }, [priceRange, selectedCategory, selectedBrand, selectedRating, products]);

  const handleAddToCart = (product: Product) => {
    // Ensure image_url is defined and not null before calling split
    const imageUrl = product.image_url?.split(',')[0] || ''; // Use an empty string if image_url is undefined

    const cartItem = {
      id: product.id,
      name: product.name,
      image: imageUrl,
      price: product.reduced_price,
      quantity: 1,
    };

    addToCart(cartItem);

    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const handleBuyNow = (product: Product) => {
    navigate('/checkout', { state: { product } });

    toast.info(`Proceeding to buy ${product.name}`, {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto flex px-4">
        <aside className="w-1/5 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Filters</h2>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>₹0</span>
              <span>₹10000+</span>
            </div>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full h-2 bg-blue-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-600"
            />
            <p className="text-blue-600 text-sm mt-2">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
            <select
              className="border p-2 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={selectedCategory || ''}
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Beauty">Beauty</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
              <option value="Grocery">Grocery</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Customer Rating</h3>
            <select
              className="border p-2 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setSelectedRating(parseInt(e.target.value))}
              value={selectedRating || ''}
            >
              <option value="">All Ratings</option>
              <option value={1}>1 Star & Above</option>
              <option value={2}>2 Stars & Above</option>
              <option value={3}>3 Stars & Above</option>
              <option value={4}>4 Stars & Above</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
        </aside>

        <div className="w-4/5 p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Products</h1>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                // Ensure image_url is defined before splitting
                const images = product.image_url?.split(',').map((url) => url.trim()) || []; // Default to empty array if image_url is undefined

                return (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg shadow-md bg-white p-4"
                  >
                    <div className="relative group">
                      <div className="w-full h-40 overflow-hidden rounded-md">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={product.name}
                            className={`w-full h-40 object-contain absolute inset-0 transition-opacity duration-500 ${
                              index === 0 ? 'opacity-100' : 'opacity-0'
                            } group-hover:opacity-100`}
                            style={{
                              animation: `fade ${images.length * 1.5}s infinite`,
                              animationDelay: `${index * 1.5}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <h2 className="text-lg font-medium text-gray-800 mt-4">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                    <p className="text-xl font-semibold text-gray-900">
                      ₹{product.reduced_price}{' '}
                      <span className="text-sm line-through text-gray-500">
                        ₹{product.original_price}
                      </span>
                    </p>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
