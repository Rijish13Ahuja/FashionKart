import React from 'react';

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

const Dropdown: React.FC = () => {
  return (
    <div className="absolute bg-white shadow-lg rounded-md w-48 py-2 mt-2 z-10">
      <ul>
        <li className="px-4 py-2 hover:bg-gray-100">Latest Trends</li>
        <li className="px-4 py-2 hover:bg-gray-100">Top Products</li>
        <li className="px-4 py-2 hover:bg-gray-100">New Arrivals</li>
        <li className="px-4 py-2 hover:bg-gray-100">Popular Items</li>
      </ul>
    </div>
  );
};

const Categories: React.FC = () => {
  return (
    <div className="bg-white py-6">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-center space-x-8">
          {categories.map((category, index) => (
            <div key={index} className="relative group">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-28 h-28 object-cover rounded-full"
              />
              <h3 className="text-center text-sm font-medium text-gray-900">{category.name}</h3>
              {['Fashion', 'Home', 'Beauty', 'Technology', 'Lifestyle'].includes(category.name) && (
                <>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-700 text-white flex justify-center items-center rounded-full cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <div className="group-hover:block hidden absolute top-12 left-0 transition-all duration-300">
                    <Dropdown />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
