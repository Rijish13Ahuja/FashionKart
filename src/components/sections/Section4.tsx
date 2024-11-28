// src/components/sections/Section4.tsx
import React from 'react';
import Card from '../Card';
import { Link } from 'react-router-dom';

const section4Items = [
  { id: 1, title: 'Women Sarees', description: 'Self Design Bollywood Georgette Saree', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/l/r/-original-imaguhzpzunhfdn9.jpeg?q=70' },
  { id: 2, title: 'Women Ethnic Sets', description: 'Women Viscose Rayon Kurta Pant Dupatta Set', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/0/h/z/xl-green-ghanti-gvs-shoppe-original-imaghj34dxaubfhy.jpeg?q=70' },
  { id: 3, title: 'Women Kurtas', description: 'This is winter special item 8', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/m/h/q/5xl-victoria-purple-nw-gosriki-original-imah3yztcykef3vs.jpeg?q=70' },
  { id: 4, title: 'Women Dupattas', description: 'This is winter special item 9', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/dupatta/r/j/c/2-25-meters-irsn-jb-prdu52-iris-original-imaghut66jsnyjyk.jpeg?q=70' },
  { id: 5, title: 'Women Skirts', description: 'This is winter special item 10', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/krp94sw0/skirt/d/k/o/free-midi-plated-skirt-otabu-original-imag5fugtqhzruxh.jpeg?q=70' },
];

const Section4: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Fashion's Top Deals</h2>
        <Link to="/winter-special-continued" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          <span>See All</span>
          <svg className="ml-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l7-7-7-7M5 12h14"></path>
          </svg>
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <div className="flex space-x-6">
          {section4Items.map(item => (
            <div className="w-64 flex-shrink-0" key={item.id}>
              <Card
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
