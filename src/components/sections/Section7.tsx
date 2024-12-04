import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section7Items = [
  { id: 1, title: 'Pixel 9 Pro', description: '₹109,999', imageUrl: 'https://media.croma.com/image/upload/v1723649007/Croma%20Assets/Communication/Mobiles/Images/309139_0_twgtjr.png' },
  { id: 2, title: 'Women Solid Flared Dress', description: '₹239 999', imageUrl: 'https://n-img1.junaroad.com/uiproducts/21224892/zoom_0-1714739742.jpg' },
  { id: 3, title: 'Women Viscose Rayon', description: '₹799 2,699', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2024/2/390394744/JF/RN/NJ/87960517/sa64-1-500x500.png' },
  { id: 4, title: 'Men’s Mufflers', description: '₹122 999', imageUrl: 'https://pashtush.in/cdn/shop/files/pashtush-pashmina-pashtush-mens-fine-wool-reversible-muffler-soft-and-warm-brown-45536209699131.jpg?v=1715072633&width=1080' },
  { id: 5, title: 'High Neck Wool Sweater', description: '₹115 349', imageUrl: 'https://5.imimg.com/data5/ANDROID/Default/2022/1/XB/DK/ME/57996730/product-jpeg.jpg' },
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
      className="mb-12 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Recently Viewed</h2>
      </div>
      <div className="mt-6 overflow-hidden relative">
        <div className="flex space-x-6" ref={scrollRef} style={{ overflowX: 'hidden' }}>
          {section7Items.map(item => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer"
              key={item.id}
              onClick={() => handleCardClick('RecentlyViewed')}
            >
              <Card
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            </div>
          ))}
        </div>
        {/* Left Arrow Button */}
        {isHovered && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => handleScroll('left')}
          >
            <svg
              className="h-5 w-5"
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
        {/* Right Arrow Button */}
        {isHovered && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => handleScroll('right')}
          >
            <svg
              className="h-5 w-5"
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
