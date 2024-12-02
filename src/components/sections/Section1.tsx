import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section1Items = [
  { id: 1, title: 'Item 1', description: 'This is item 1 description', imageUrl: 'https://m.media-amazon.com/images/I/51pycg0MGxL.jpg' },
  { id: 2, title: 'Item 2', description: 'This is item 2 description', imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/in/lu28r550uqwxxl/gallery/in-ur55-lu28r550uqwxxl-536896135?$650_519_PNG$' },
  { id: 3, title: 'Item 3', description: 'This is item 3 description', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-iegnFAE0ox6VxdebSaAXZZlUx6UL2WMBv_EPLMPDw1ap31P8J_F06Xg8P21VCHvR6to&usqp=CAU' },
  { id: 4, title: 'Item 4', description: 'This is item 4 description', imageUrl: 'https://media.takealot.com/covers_images/068196db2fa1446cad3f89bc09c71b13/s-fb.file' },
  { id: 5, title: 'Item 5', description: 'This is item 5 description', imageUrl: 'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/U/6UU48A-1_T1680354480.png' },
  { id: 6, title: 'Item 6', description: 'This is item 6 description', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYO7KstiOfdrjeTB-8jnBWHioAK8DurjcZw&s' },
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
        <h2 className="text-2xl font-semibold text-gray-900">Best of Electronics</h2>
      </div>
      <div className="mt-6 overflow-hidden relative">
        <div className="flex space-x-6" ref={scrollRef} style={{ overflowX: 'hidden' }}>
          {section1Items.map(item => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer"
              key={item.id}
              onClick={() => handleCardClick('Technology')} // Replace 'Technology' with relevant category
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

export default Section1;
