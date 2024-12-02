import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section2Items = [
  { id: 1, title: 'Featured Item 1', description: 'This is a featured item description', imageUrl: 'https://image.made-in-china.com/226f3j00hdeVWPJniNpK/12-Color-Small-Double-Headed-Children-s-Art-Line-Marker-Pen.webp' },
  { id: 2, title: 'Featured Item 2', description: 'This is another featured item', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZX0RPHCWetbJHPsw3WeDfJwU7xa0Njtdmg&s' },
  { id: 3, title: 'Featured Item 3', description: 'Here is the third featured item', imageUrl: 'https://5.imimg.com/data5/IX/WH/AX/SELLER-24532083/ridley-dean-105-x-small-black-bicycle-500x500.jpg' },
  { id: 4, title: 'Featured Item 4', description: 'This is another featured item', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvtRUBdnegwIkMIwyq0BB1B7AW1B_-5O3PiA&s' },
  { id: 5, title: 'Featured Item 5', description: 'This is a new featured item', imageUrl: 'https://img.gkbcdn.com/p/2021-04-07/Faltbares-Laufband-f-r-zu-Hause--Trainingsger-te-mit-herunterladbarer-App--USB-Bluetooth-und-AUX-Konnektivit-t--LED-Anzeige--schwarz-458305-8._w800_p1_.jpg' },
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
      className="mb-12 relative" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Beauty, Food, Toys & more</h2>
      </div>
      <div className="mt-6 overflow-hidden relative">
        <div className="flex space-x-6" ref={scrollRef} style={{ overflowX: 'hidden' }}>
          {section2Items.map(item => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer"
              key={item.id}
              onClick={() => handleCardClick('Beauty')}
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
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        )}
        {/* Right Arrow Button */}
        {isHovered && (
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => handleScroll('right')}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l7-7-7-7M5 12h14"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Section2;
