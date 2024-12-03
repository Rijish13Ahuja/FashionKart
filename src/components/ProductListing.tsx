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
  customer_ratings: number;
  brand: string;
  color: string;
}

const ProductListing: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Filters state
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    // Fetch products data
    fetch(`http://localhost:3000/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Apply filters
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

    if (selectedRating) {
      filtered = filtered.filter(
        (product) => product.customer_ratings >= selectedRating
      );
    }

    setFilteredProducts(filtered);
  }, [priceRange, selectedCategory, selectedBrand, selectedRating, products]);

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image_url,
      price: product.reduced_price,
      quantity: 1,
    };

    addToCart(cartItem);

    // Show success toast for Add to Cart
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleBuyNow = (product: Product) => {
    navigate('/checkout', { state: { product } });

    // Show info toast for Buy Now
    toast.info(`Proceeding to buy ${product.name}`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Toast Container */}
      <ToastContainer />
      <div className="container mx-auto flex px-4">
        {/* Filters Sidebar */}
        <aside className="w-1/5 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Filters</h2>

          {/* Price Range */}
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

          {/* Category */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
            <select
              className="border p-2 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setSelectedCategory(e.target.value)}
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

          {/* Brand */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Brand</h3>
            <select
              className="border p-2 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setSelectedBrand(e.target.value)}
              value={selectedBrand || ''}
            >
              <option value="">All Brands</option>
              <option value="Samsung">Samsung</option>
              <option value="Apple">Apple</option>
              <option value="OnePlus">OnePlus</option>
              <option value="Sony">Sony</option>
            </select>
          </div>

          {/* Customer Ratings */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Customer Ratings</h3>
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="rating"
                  value={rating}
                  onChange={() => setSelectedRating(rating)}
                  className="w-4 h-4 text-blue-600 focus:ring focus:ring-blue-300"
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="ml-3 text-sm text-gray-700"
                >
                  {rating} ★ & above
                </label>
              </div>
            ))}
          </div>
        </aside>

        {/* Products List */}
        <div className="w-4/5 p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Products</h1>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg p-4"
                >
                  <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden mb-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain transition-transform transform hover:scale-110"
                    />
                  </div>

                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">{product.category}</p>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-600 font-semibold text-sm">
                      ₹{product.reduced_price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through text-xs">
                      ₹{product.original_price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-green-500">{product.discount}% OFF</p>
                  <p
                    className={`text-xs ${
                      product.stock > 0 ? 'text-blue-600' : 'text-red-600'
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : 'Out of stock'}
                  </p>

                  <div className="mt-3 flex space-x-2 justify-between">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-md shadow-md text-xs hover:from-yellow-500 hover:to-yellow-600 transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-md shadow-md text-xs hover:from-blue-600 hover:to-blue-700 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No products found matching filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
