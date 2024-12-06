import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section2Items = [
  { id: 1, title: 'Children’s Art Marker Set', price: '₹599', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2024/4/412504842/GM/MI/DF/182026280/modulyss-48-colour-double-tipped-chisel-fine-alcohol-based-art-marker-set-for-kids.jpg' },
  { id: 2, title: 'Bicycle Black Model', price: '₹8,999', imageUrl: 'https://5.imimg.com/data5/IX/WH/AX/SELLER-24532083/ridley-dean-105-x-small-black-bicycle-500x500.jpg' },
  { id: 3, title: 'Classic Bicycle Model', price: '₹7,499', imageUrl: 'https://m.media-amazon.com/images/I/61VgYRaVWFL._AC_UF894,1000_QL80_.jpg' },
  { id: 4, title: 'Folding Treadmill', price: '₹19,999', imageUrl: 'https://img.gkbcdn.com/p/2021-04-07/Faltbares-Laufband-f-r-zu-Hause--Trainingsger-te-mit-herunterladbarer-App--USB-Bluetooth-und-AUX-Konnektivit-t--LED-Anzeige--schwarz-458305-8._w800_p1_.jpg' },
  { id: 5, title: 'Fitness Resistance Bands', price: '₹499', imageUrl: 'https://m.media-amazon.com/images/I/81CgJrVHnGL.jpg' },
];

const Section2: React.FC = () => {
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
        <h2 className="text-2xl font-semibold text-gray-900">Beauty, Food, Toys & more</h2>
      </div>
      <div className="mt-4 overflow-hidden relative">
        <div 
          className="flex space-x-6 transition-transform duration-300" 
          ref={scrollRef} 
          style={{ overflowX: 'hidden' }}
        >
          {section2Items.map(item => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              key={item.id}
              onClick={() => handleCardClick('Beauty')} 
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

export default Section2;
