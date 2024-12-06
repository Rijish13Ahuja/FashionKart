import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section3Items = [
  {
    id: 1,
    title: 'Winter Special 1',
    price: '₹2,499',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/z/h/x/4xl-no-mt2-jkt-hood-windc-gone-white-red-strip-motrex-original-imah4kj2wmj738nk.jpeg?q=70',
  },
  {
    id: 2,
    title: 'Winter Special 2',
    price: '₹1,799',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sweater/1/q/w/s-h-black-highneck-freaks-original-imah5huhxyzf3ag9.jpeg?q=70',
  },
  {
    id: 3,
    title: 'Winter Special 3',
    price: '₹999',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/t/b/3/m-tblrnfulsweat-plain-tripr-original-imah58ggcje9gs4q.jpeg?q=70',
  },
  {
    id: 4,
    title: 'Winter Special 4',
    price: '₹599',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/muffler/t/a/g/free-ms-muf-903-weavers-villa-original-imagtxuk8z5d4bkj.jpeg?q=70',
  },
  {
    id: 5,
    title: 'Winter Special 5',
    price: '₹399',
    imageUrl: 'https://rukminim2.flixcart.com/image/312/312/xif0q/scarf/w/o/l/32-inch-wqygdx32-henceberry-original-imagutu5pymzgp2w.jpeg?q=70&crop=false',
  },
];

const Section3: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (category: string) => {
    navigate(`/products?section=${category}`);
  };

  const handleScroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300; // Amount to scroll
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="mb-12 relative bg-gray-50 p-6 rounded-lg shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Winter Essentials</h2>
      </div>
      <div className="mt-4 overflow-hidden relative">
        <div
          className="flex space-x-6 transition-transform duration-300"
          ref={scrollRef}
          style={{ overflowX: 'hidden' }}
        >
          {section3Items.map((item) => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              key={item.id}
              onClick={() => handleCardClick('WinterEssentials')}
            >
              <Card
                title={item.title}
                imageUrl={item.imageUrl}
              />
              <p className="text-lg font-semibold text-gray-700 mt-2">From {item.price}</p>
            </div>
          ))}
        </div>
        {/* Left Arrow Button */}
        {isHovered && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => handleScroll('left')}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        )}
        {/* Right Arrow Button */}
        {isHovered && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => handleScroll('right')}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l7-7-7-7M5 12h14"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Section3;
