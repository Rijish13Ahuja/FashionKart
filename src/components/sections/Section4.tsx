import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';

const section4Items = [
  {
    id: 1,
    title: 'Women Sarees',
    description: 'Self Design Bollywood Georgette Saree',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/l/r/-original-imaguhzpzunhfdn9.jpeg?q=70',
  },
  {
    id: 2,
    title: 'Women Ethnic Sets',
    description: 'Women Viscose Rayon Kurta Pant Dupatta Set',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/0/h/z/xl-green-ghanti-gvs-shoppe-original-imaghj34dxaubfhy.jpeg?q=70',
  },
  {
    id: 3,
    title: 'Women Kurtas',
    description: 'This is winter special item 8',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/m/h/q/5xl-victoria-purple-nw-gosriki-original-imah3yztcykef3vs.jpeg?q=70',
  },
  {
    id: 4,
    title: 'Women Dupattas',
    description: 'This is winter special item 9',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/dupatta/r/j/c/2-25-meters-irsn-jb-prdu52-iris-original-imaghut66jsnyjyk.jpeg?q=70',
  },
  {
    id: 5,
    title: 'Women Skirts',
    description: 'This is winter special item 10',
    imageUrl: 'https://rukminim2.flixcart.com/image/612/612/krp94sw0/skirt/d/k/o/free-midi-plated-skirt-otabu-original-imag5fugtqhzruxh.jpeg?q=70',
  },
];

const Section4: React.FC = () => {
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
        <h2 className="text-2xl font-semibold text-gray-900">Fashion's Top Deals</h2>
      </div>
      <div className="mt-6 overflow-hidden relative">
        <div className="flex space-x-6" ref={scrollRef} style={{ overflowX: 'hidden' }}>
          {section4Items.map((item) => (
            <div
              className="w-64 flex-shrink-0 cursor-pointer"
              key={item.id}
              onClick={() => handleCardClick('FashionTopDeals')}
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
            <svg
              className="h-5 w-5"
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

export default Section4;
