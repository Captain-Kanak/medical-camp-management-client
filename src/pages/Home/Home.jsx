import React from "react";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps";
import HealthTips from "./HealthTips";
import Feedbacks from "./Feedbacks";
import UpcomingCamps from "./UpcomingCamps";
import OurHealthcareProfessionals from "./OurHealthcareProfessionals";
import NewsletterSection from "./NewsletterSection";
import AchievementsSection from "./AchievementsSection";

const Home = () => {
  return (
    <>
      <Banner />
      <PopularCamps />
      <HealthTips />
      <UpcomingCamps />
      <OurHealthcareProfessionals />
      <AchievementsSection />
      <Feedbacks />
      <NewsletterSection />
    </>
  );
};

export default Home;
