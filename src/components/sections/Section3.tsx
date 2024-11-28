// src/components/sections/Section3.tsx
import React from 'react';
import Card from '../Card';
import { Link } from 'react-router-dom';

const section3Items = [
  { id: 1, title: 'Winter Special 1', description: 'This is winter special item 1', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/z/h/x/4xl-no-mt2-jkt-hood-windc-gone-white-red-strip-motrex-original-imah4kj2wmj738nk.jpeg?q=70' },
  { id: 2, title: 'Winter Special 2', description: 'This is winter special item 2', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sweater/1/q/w/s-h-black-highneck-freaks-original-imah5huhxyzf3ag9.jpeg?q=70' },
  { id: 3, title: 'Winter Special 3', description: 'This is winter special item 3', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/t/b/3/m-tblrnfulsweat-plain-tripr-original-imah58ggcje9gs4q.jpeg?q=70' },
  { id: 4, title: 'Winter Special 4', description: 'This is winter special item 4', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/muffler/t/a/g/free-ms-muf-903-weavers-villa-original-imagtxuk8z5d4bkj.jpeg?q=70' },
  { id: 5, title: 'Winter Special 5', description: 'This is winter special item 5', imageUrl: 'https://rukminim2.flixcart.com/image/312/312/xif0q/scarf/w/o/l/32-inch-wqygdx32-henceberry-original-imagutu5pymzgp2w.jpeg?q=70&crop=false' },
];

const Section3: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Winter Essentials</h2>
        <Link to="/winter-special" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          <span>See All</span>
          <svg className="ml-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l7-7-7-7M5 12h14"></path>
          </svg>
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <div className="flex space-x-6">
          {section3Items.map(item => (
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

export default Section3;
