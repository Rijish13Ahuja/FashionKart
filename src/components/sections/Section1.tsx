import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section1Items = [
  { id: 1, title: 'Apple iPhone 13', price: '₹79,900', imageUrl: 'https://iplanet.one/cdn/shop/files/iPhone_13_Blue_PDP_Image_Position-1A__GBEN.jpg?v=1691170152' },
  { id: 2, title: 'Samsung LU28R550UQWX 4K Monitor', price: '₹28,999', imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/in/lu28r550uqwxxl/gallery/in-ur55-lu28r550uqwxxl-536896135?$650_519_PNG$' },
  { id: 3, title: 'Sony Wireless Noise Cancelling Headphones', price: '₹29,990', imageUrl: 'https://cdn1.smartprix.com/rx-iF0qOPzkL-w1200-h1200/F0qOPzkL.jpg' },
  { id: 4, title: 'Samsung 75" 4K Smart TV', price: '₹1,49,999', imageUrl: 'https://media.takealot.com/covers_images/068196db2fa1446cad3f89bc09c71b13/s-fb.file' },
  { id: 5, title: 'Apple AirPods Pro', price: '₹24,900', imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=1725492498882' },
  { id: 6, title: 'Bose SoundLink Bluetooth Speaker', price: '₹12,999', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1730266594/Croma%20Assets/Entertainment/Speakers%20and%20Media%20Players/Images/307855_0_qcyfy2.png' },
];

const Section1: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (category: string) => {
    navigate(`/products?section=${category}`);
  };

  const handleScroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300; 
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
        <h2 className="text-2xl font-semibold text-gray-900">Best of Electronics</h2>
      </div>
      <div className="mt-4 overflow-hidden relative">
        <div 
          className="flex space-x-6 transition-transform duration-300" 
          ref={scrollRef} 
          style={{ overflowX: 'hidden' }}
        >
          {section1Items.map(item => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              key={item.id}
              onClick={() => handleCardClick('Technology')} 
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
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        )}
        {isHovered && (
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => handleScroll('right')}
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l7-7-7-7M5 12h14"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Section1;
