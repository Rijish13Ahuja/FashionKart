import React from 'react';

interface CardProps {
  title: string;
  imageUrl: string;
  description?: string; // Optional description
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 w-64 h-80 flex flex-col items-center justify-between">
      <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 text-center mt-4">{title}</h3>
      {description && <p className="text-sm text-gray-600 text-center mt-2">{description}</p>}
    </div>
  );
};

export default Card;
