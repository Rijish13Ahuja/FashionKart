import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section7Items = [
  { id: 1, title: 'Pixel 9 Pro', price: '₹109,999', imageUrl: 'https://media.croma.com/image/upload/v1723649007/Croma%20Assets/Communication/Mobiles/Images/309139_0_twgtjr.png' },
  { id: 2, title: 'Women Solid Flared Dress', price: '₹2,399', imageUrl: 'https://n-img1.junaroad.com/uiproducts/21224892/zoom_0-1714739742.jpg' },
  { id: 3, title: 'Women Viscose Rayon', price: '₹799', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2024/2/390394744/JF/RN/NJ/87960517/sa64-1-500x500.png' },
  { id: 4, title: 'Men’s Mufflers', price: '₹1,299', imageUrl: 'https://pashtush.in/cdn/shop/files/pashtush-pashmina-pashtush-mens-fine-wool-reversible-muffler-soft-and-warm-brown-45536209699131.jpg?v=1715072633&width=1080' },
  { id: 5, title: 'High Neck Wool Sweater', price: '₹1,899', imageUrl: 'https://5.imimg.com/data5/ANDROID/Default/2022/1/XB/DK/ME/57996730/product-jpeg.jpg' },
];

const Section7: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (category: string) => {
    navigate(`/products?section=${category}`);
  };

  return (
    <div
      className="mb-12 relative bg-gray-50 p-6 rounded-lg shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Recently Viewed</h2>
      </div>
      <div className="mt-4 overflow-hidden relative">
        <div className="flex space-x-6 transition-transform duration-300" ref={scrollRef} style={{ overflowX: 'hidden' }}>
          {section7Items.map(item => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              key={item.id}
              onClick={() => handleCardClick('RecentlyViewed')}
            >
              <Card
                title={item.title}
                imageUrl={item.imageUrl}
              />
              <p className="text-lg font-semibold text-gray-700 mt-2">From {item.price}</p>
            </div>
          ))}
        </div>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        )}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l7-7-7-7M5 12h14"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Section7;
