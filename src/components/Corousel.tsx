import React from 'react';
import Slider from 'react-slick';

const carouselItems = [
  { id: 1, imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/dd484f1b19c67712.jpg?q=20' },
  { id: 2, imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/0511ba08d5abe9aa.jpg?q=20' },
  { id: 3, imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/1316eb53d6f52c71.jpg?q=20' },
  { id: 4, imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/f7b74e32c435adb6.jpg?q=20' },
  { id: 5, imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/a76db078b31108e1.jpeg?q=20' },
];

const Carousel: React.FC = () => {
  const settings = {
    infinite: true, 
    speed: 500,
    autoplay: true, 
    autoplaySpeed: 2000, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    arrows: true, 
    dots: true, 
  };

  return (
    <div className="py-6">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>
          {carouselItems.map(item => (
            <div key={item.id} className="relative">
              <img
                src={item.imageUrl}
                alt={`Carousel Item ${item.id}`}
                className="w-full h-72 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
