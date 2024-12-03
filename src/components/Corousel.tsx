import React from 'react';
import Slider from 'react-slick';

const carouselItems = [
  { id: 1, imageUrl: 'https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sale_23-2150852978.jpg?semt=ais_hybrid' },
  { id: 2, imageUrl: 'https://graphicsfamily.com/wp-content/uploads/edd/2023/06/E-commerce-Website-Product-Banner-Design-scaled.jpg' },
  { id: 3, imageUrl: 'https://antavo.com/wp-content/uploads/2022/08/coca-cola-best-ads.png' },
  { id: 4, imageUrl: 'https://www.intermediatms.com/wp-content/uploads/Boughey-reliability-advertising.jpg' },
  { id: 5, imageUrl: 'https://media.licdn.com/dms/image/C4E12AQEl_rbc3zMDBw/article-cover_image-shrink_600_2000/0/1520042081919?e=2147483647&v=beta&t=xYIbECVLZsbq-gKYUeLtFn8LtU7pCGaaFQT2D9FKk_w' },
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
                className="w-full h-[36rem] object-cover rounded-lg shadow-md" // Increased height here
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
