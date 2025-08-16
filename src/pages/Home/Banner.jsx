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
    <div className="mt-8 max-w-7xl mx-auto px-4 lg:px-0">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
      >
        <div>
          <img
            className="max-w-7xl max-h-[500px] rounded-xl"
            src={photo1}
            alt=""
          />
          <p className="legend">
            Simplify operations. Improve outcomes. Serve more people.
          </p>
        </div>

        <div>
          <img
            className="max-w-7xl max-h-[500px] rounded-xl"
            src={photo2}
            alt=""
          />
          <p className="legend">
            Efficiently organize and manage medical camps anywhere, anytime.
          </p>
        </div>

        <div>
          <img
            className="max-w-7xl max-h-[500px] rounded-xl"
            src={photo3}
            alt=""
          />
          <p className="legend">
            Streamline patient registration, doctor assignments, and reporting
            in one platform.
          </p>
        </div>

        <div>
          <img
            className="max-w-7xl max-h-[500px] rounded-xl"
            src={photo4}
            alt=""
          />
          <p className="legend">
            From planning to patient care — manage your medical camps with ease.
          </p>
        </div>

        <div>
          <img
            className="max-w-7xl max-h-[500px] rounded-xl"
            src={photo5}
            alt=""
          />
          <p className="legend">
            Awards for innovation, dedication, and service in community health.
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
