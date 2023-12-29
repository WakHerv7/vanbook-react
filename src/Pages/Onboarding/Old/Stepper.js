import React from "react";
import StepsBtn from "./StepsBtn";
import AboutBusiness from "./Steps/AboutBusiness";

const Stepper = () => {
  return (
    <section className="mx-auto w-[95%] h-screen">
      <AboutBusiness />
      <StepsBtn />
    </section>
  );
};

export default Stepper;
