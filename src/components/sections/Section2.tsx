import React from 'react';
import Card from '../Card';
import { Link } from 'react-router-dom';

const section2Items = [
  { id: 1, title: 'Featured Item 1', description: 'This is a featured item description', imageUrl: 'https://image.made-in-china.com/226f3j00hdeVWPJniNpK/12-Color-Small-Double-Headed-Children-s-Art-Line-Marker-Pen.webp' },
  { id: 2, title: 'Featured Item 2', description: 'This is another featured item', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZX0RPHCWetbJHPsw3WeDfJwU7xa0Njtdmg&s' },
  { id: 3, title: 'Featured Item 3', description: 'Here is the third featured item', imageUrl: 'https://5.imimg.com/data5/IX/WH/AX/SELLER-24532083/ridley-dean-105-x-small-black-bicycle-500x500.jpg' },
  { id: 4, title: 'Featured Item 4', description: 'This is another featured item', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvtRUBdnegwIkMIwyq0BB1B7AW1B_-5O3PiA&s' },
  { id: 5, title: 'Featured Item 5', description: 'This is a new featured item', imageUrl: 'https://img.gkbcdn.com/p/2021-04-07/Faltbares-Laufband-f-r-zu-Hause--Trainingsger-te-mit-herunterladbarer-App--USB-Bluetooth-und-AUX-Konnektivit-t--LED-Anzeige--schwarz-458305-8._w800_p1_.jpg' },
];

const Section2: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Beauty, Food, Toys & more

        </h2>
        <Link to="/featured" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          <span>See All</span>
          <svg className="ml-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l7-7-7-7M5 12h14"></path>
          </svg>
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <div className="flex space-x-6">
          {section2Items.map(item => (
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

export default Section2;
