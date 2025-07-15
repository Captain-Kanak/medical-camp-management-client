import React from "react";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps";
import HealthTips from "./HealthTips";
import Feedbacks from "./Feedbacks";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularCamps />
      <Feedbacks />
      <HealthTips />
    </div>
  );
};

export default Home;
