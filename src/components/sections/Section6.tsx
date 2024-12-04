import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section6Items = [
  { id: 1, title: 'Godrej Refrigerator', description: 'From ₹7,240', imageUrl: 'https://i.pinimg.com/originals/0e/cb/54/0ecb545f35ea4990906cff1af4897e75.jpg' },
  { id: 2, title: 'Double Door Refrigerator', description: 'From ₹16,129', imageUrl: 'https://5.imimg.com/data5/HU/ZR/EO/SELLER-29248935/smart-refrigerator.jpg' },
  { id: 3, title: 'Semi Automatic Washing Machine', description: 'Buy Now', imageUrl: 'https://m.economictimes.com/thumb/msid-98537702,width-640,height-480,resizemode-7/lg-242-l-3-star-smart-inverter-frost-free-double-door-refrigerator.jpg' },
  { id: 4, title: 'Top Load Washing Machine', description: 'Buy now', imageUrl: 'https://img.etimg.com/photo/msid-98537727,imgsize-3586/AmazonBasics564LInverterFrost-FreeSide-by-SideRefrigeratorwithWaterDispenser.jpg' },
  { id: 5, title: 'Samsung Refrigerator', description: 'From ₹12,690', imageUrl: 'https://5.imimg.com/data5/RR/JL/CA/SELLER-3023569/refrigenator-500x500.png' },
  { id: 6, title: 'Energy Efficient Refrigerator', description: 'From ₹14,590', imageUrl: 'https://thumbs.dreamstime.com/b/modern-refrigerator-isolated-white-background-76167751.jpg' },
];

const Section6: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300; // Amount to scroll
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
        <h2 className="text-2xl font-semibold text-gray-900">Top Deals on TVs & Appliances</h2>
      </div>
      <div className="mt-6 overflow-hidden relative">
        <div className="flex space-x-6" ref={scrollRef} style={{ overflowX: 'hidden' }}>
          {section6Items.map(item => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer"
              key={item.id}
              onClick={() => handleCardClick('Appliances')}
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

export default Section6;
