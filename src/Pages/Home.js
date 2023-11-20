import React from "react";
import Features from "./LandingPage/Features";
import Footer from "../Components/Footer";
import Header from "./LandingPage/Header";
import Nav from "./LandingPage/Nav";
import Trial from "./LandingPage/Trial";
import Testimonials from "./LandingPage/Testimonials";
// import Pricing from "../Components/LandingPage/Pricing";
import FAQ from "./LandingPage/FAQ";
import Alert from "./LandingPage/Alert";

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
