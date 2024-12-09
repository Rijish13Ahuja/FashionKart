import React from 'react';
import Slider from 'react-slick';

const carouselItems = [
  { id: 1, imageUrl: 'https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sale_23-2150852978.jpg?semt=ais_hybrid' },
  { id: 2, imageUrl: 'https://img.freepik.com/free-psd/mailer-banner-template-design_23-2149234151.jpg?t=st=1733746717~exp=1733750317~hmac=5b9496d481aec5b30c074d1b7d97c6cf6f56b04b17010c25e07b75bd3647f479&w=1380' },
  { id: 3, imageUrl: 'https://antavo.com/wp-content/uploads/2022/08/coca-cola-best-ads.png' },
  { id: 4, imageUrl: 'https://img.freepik.com/free-vector/online-shopping-banner-template_23-2148764706.jpg?t=st=1733746539~exp=1733750139~hmac=2bcf33431ce86fbf75b888ba30263a8996f8b7081a9a605ab0e2b56d9d71aa02&w=1380' },
  { id: 5, imageUrl: 'https://img.freepik.com/free-vector/fashion-sale-landing-page-concept_23-2148597522.jpg?t=st=1733746694~exp=1733750294~hmac=34de73df7d28de8468f2898938630268044bd264b77fe15e8f7e83f1c88dcd73&w=1380' },
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
