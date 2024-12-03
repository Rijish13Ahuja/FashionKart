import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default Card;
