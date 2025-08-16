import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import photo1 from "../../assets/banner/photo1.jpeg";
import photo2 from "../../assets/banner/photo2.jpg";
import photo3 from "../../assets/banner/photo3.jpg";
import photo4 from "../../assets/banner/photo4.jpg";
import photo5 from "../../assets/banner/photo5.jpg";

const Banner = () => {
  const slides = [
    {
      image: photo1,
      caption: "Simplify operations. Improve outcomes. Serve more people.",
    },
    {
      image: photo2,
      caption:
        "Efficiently organize and manage medical camps anywhere, anytime.",
    },
    {
      image: photo3,
      caption:
        "Streamline patient registration, doctor assignments, and reporting in one platform.",
    },
    {
      image: photo4,
      caption:
        "From planning to patient care — manage your medical camps with ease.",
    },
    {
      image: photo5,
      caption:
        "Awards for innovation, dedication, and service in community health.",
    },
  ];

  return (
    <div className="mt-8 max-w-7xl mx-auto px-4 lg:px-0">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        swipeable
        emulateTouch
        dynamicHeight={false}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden shadow-lg"
          >
            <img
              className="w-full max-h-[500px] object-cover rounded-xl"
              src={slide.image}
              alt={`Banner ${i + 1}`}
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white text-lg lg:text-xl font-semibold px-4 lg:px-8 bg-black/30 rounded-md">
              {slide.caption}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
