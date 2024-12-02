import React from 'react';
import { useNavigate } from 'react-router-dom';

const section5Items = [
  {
    id: 1,
    title: "Men's Jackets",
    description: 'Min. 50% Off',
    imageUrl:
      'https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/z/h/x/4xl-no-mt2-jkt-hood-windc-gone-white-red-strip-motrex-original-imah4kj2wmj738nk.jpeg?q=70',
  },
  {
    id: 2,
    title: "Men's Sweaters",
    description: 'Min. 50% Off',
    imageUrl:
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sweater/1/q/w/s-h-black-highneck-freaks-original-imah5huhxyzf3ag9.jpeg?q=70',
  },
  {
    id: 3,
    title: "Men's Sweatshirts",
    description: 'Big Savings',
    imageUrl:
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/t/b/3/m-tblrnfulsweat-plain-tripr-original-imah58ggcje9gs4q.jpeg?q=70',
  },
  {
    id: 4,
    title: "Men's Mufflers",
    description: 'Min. 50% Off',
    imageUrl:
      'https://rukminim2.flixcart.com/image/612/612/xif0q/muffler/t/a/g/free-ms-muf-903-weavers-villa-original-imagtxuk8z5d4bkj.jpeg?q=70',
  },
];

const Section5: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (category: string) => {
    navigate(`/products?section=${category}`);
  };

  return (
    <div className="flex mb-12">
      {/* Left Side: Cards */}
      <div className="w-2/3 grid grid-cols-2 gap-4">
        {section5Items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick('MensFashion')}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-32 w-auto object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-green-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Right Side: Banner/Ad */}
      <div className="w-1/3 flex items-center justify-center bg-gray-100 rounded-lg p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Top Selling Smartphones
          </h2>
          <p className="text-gray-600 mb-4">Latest Technology, Best Brands</p>
          <button
            onClick={() => navigate('/products?section=TopSellingSmartphones')}
            className="px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section5;
