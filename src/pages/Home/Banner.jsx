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
      caption: (
        <>
          <span className="text-yellow-400 font-bold">Simplify</span>{" "}
          operations. <span className="text-green-400 font-bold">Improve</span>{" "}
          outcomes. <span className="text-blue-400 font-bold">Serve</span> more
          people.
        </>
      ),
    },
    {
      image: photo2,
      caption: (
        <>
          <span className="text-green-400 font-bold">Efficiently organize</span>{" "}
          and manage{" "}
          <span className="text-yellow-400 font-bold">medical camps</span>{" "}
          anywhere, anytime.
        </>
      ),
    },
    {
      image: photo3,
      caption: (
        <>
          <span className="text-blue-400 font-bold">Streamline</span> patient
          registration,{" "}
          <span className="text-pink-400 font-bold">doctor assignments</span>,
          and <span className="text-green-400 font-bold">reporting</span> in one
          platform.
        </>
      ),
    },
    {
      image: photo4,
      caption: (
        <>
          From <span className="text-yellow-400 font-bold">planning</span> to{" "}
          <span className="text-green-400 font-bold">patient care</span> —
          manage your{" "}
          <span className="text-blue-400 font-bold">medical camps</span> with
          ease.
        </>
      ),
    },
    {
      image: photo5,
      caption: (
        <>
          Recognized for{" "}
          <span className="text-yellow-400 font-bold">innovation</span>,{" "}
          <span className="text-green-400 font-bold">dedication</span>, and{" "}
          <span className="text-blue-400 font-bold">service</span> in community
          health.
        </>
      ),
    },
  ];

  return (
    <div className="mt-8 max-w-7xl mx-auto px-4 lg:px-0">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        swipeable
        emulateTouch
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
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-xl"></div>

            {/* Caption */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center max-w-2xl">
              <p className="text-white text-xl lg:text-3xl font-semibold leading-snug drop-shadow-lg">
                {slide.caption}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
