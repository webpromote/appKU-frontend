import React from "react";
import Banner from "../components/Banner";
import AboutUs from "../components/HomePage/Features";
import OurSpeciality from "../components/HomePage/OurSpeciality";
import Portfolio from "../components/HomePage/Portfolio";
import Team from "../components/HomePage/Team";
import Testimonials from "../components/HomePage/Testimonials";
import Pricing from "../components/HomePage/Pricing";
import FeaturesPage from "./FeaturesPage";
import CountArea from "../components/HomePage/CountArea";
import ProcessArea from "../components/HomePage/ProcessArea";


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturesPage></FeaturesPage>
      {/* <CountArea></CountArea>
       */}
      {/* <Portfolio></Portfolio> */}
      <AboutUs></AboutUs>
      <OurSpeciality></OurSpeciality>
      <ProcessArea></ProcessArea>
      {/* <Team></Team> */}
      <Pricing></Pricing>
      <Testimonials></Testimonials>    
    </div>
  );
};

export default Home;
