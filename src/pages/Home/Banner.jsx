import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import photo1 from "../../assets/banner/photo1.jpeg";
import photo2 from "../../assets/banner/photo2.jpg";
import photo3 from "../../assets/banner/photo3.jpg";
import photo4 from "../../assets/banner/photo4.jpg";
import photo5 from "../../assets/banner/photo5.jpg";

const Banner = () => {
  return (
    <div className="mb-10">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        className="mt-10 px-4 lg:px-0"
      >
        <div>
          <img className="max-w-7xl max-h-[500px]" src={photo1} alt="" />
          <p className="legend">
            Simplify operations. Improve outcomes. Serve more people.
          </p>
        </div>

        <div>
          <img className="max-w-7xl max-h-[500px]" src={photo2} alt="" />
          <p className="legend">
            Efficiently organize and manage medical camps anywhere, anytime.
          </p>
        </div>

        <div>
          <img className="max-w-7xl max-h-[500px]" src={photo3} alt="" />
          <p className="legend">
            Streamline patient registration, doctor assignments, and reporting
            in one platform.
          </p>
        </div>

        <div>
          <img className="max-w-7xl max-h-[500px]" src={photo4} alt="" />
          <p className="legend">
            From planning to patient care — manage your medical camps with ease.
          </p>
        </div>

        <div>
          <img className="max-w-7xl max-h-[500px]" src={photo5} alt="" />
          <p className="legend">
            Awards for innovation, dedication, and service in community health.
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
