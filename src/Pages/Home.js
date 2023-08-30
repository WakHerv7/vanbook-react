import React from "react";
import Features from "../Components/LandingPage/Features";
import Footer from "../Components/Footer";
import Header from "../Components/LandingPage/Header";
import Nav from "../Components/LandingPage/Nav";
import Trial from "../Components/LandingPage/Trial";
import Testimonials from "../Components/LandingPage/Testimonials";
// import Pricing from "../Components/LandingPage/Pricing";
import FAQ from "../Components/LandingPage/FAQ";
import Alert from "../Components/LandingPage/Alert";

const Home = () => {
  return (
    <div>
      <Alert />
      <Nav />
      <Header />
      <Features />
      <Testimonials />
      {/* <Pricing /> */}
      <FAQ />
      <Trial />
      <Footer />
    </div>
  );
};

export default Home;
