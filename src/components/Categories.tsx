import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  name: string;
  imageUrl: string;
}

const categories: Category[] = [
  { name: 'Technology', imageUrl: 'https://rukminim2.flixcart.com/flap/58/58/image/69c6589653afdb9a.png?q=100' },
  { name: 'Mobiles', imageUrl: 'https://rukminim2.flixcart.com/flap/58/58/image/22fddf3c7da4c4f4.png?q=100' },
  { name: 'Lifestyle', imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/58/58/image/0d75b34f7d8fbcb3.png?q=100' },
  { name: 'Beauty', imageUrl: 'https://png.pngtree.com/png-clipart/20240629/original/pngtree-beauty-product-icon-icon-vector-png-image_15434796.png' },
  { name: 'Entertainment', imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/58/58/image/0139228b2f7eb413.jpg?q=100' },
  { name: 'Sports', imageUrl: 'https://cdn-icons-png.freepik.com/256/5351/5351478.png?semt=ais_hybrid' },
  { name: 'Travel', imageUrl: 'https://rukminim2.flixcart.com/flap/58/58/image/71050627a56b4693.png?q=100' },
  { name: 'Grocery', imageUrl: 'https://rukminim2.flixcart.com/flap/58/58/image/29327f40e9c4d26b.png?q=100' },
];

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to the products page with the selected category
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <div className="bg-white py-6">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-center space-x-8">
          {categories.map((category, index) => (
            <div key={index} className="relative group">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-28 h-28 object-cover rounded-full cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              />
              <h3 className="text-center text-sm font-medium text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
