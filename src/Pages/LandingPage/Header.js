import React from "react";
import heroImg from "../../Assets/Rectangle.png";
import DemoCTA from "./DemoCTA";

const Header = () => {
  return (
    <section className="w-full max-h-[900px] overflow-y-hidden bg-[#ffffff]">
      <div className="mx-auto w-[85%] flex flex-col text-center mt-16">
        <span className="text-[.9rem] text-[#2E2F5B] font-semibold mb-4">
          ACCOUNTING SOFTWARE | TECH 64 VANBOOK
        </span>
        <span className="text-[3rem] text-[#101828] font-bold mb-4">
          Smart Financial Management for schools
        </span>
        <span className="text-[#475467] font-light text-[.9rem] w-[76%] mx-auto">
          Are you tired of using complex accounting software for your
          educational institution? <br /> Look no further!, Our cutting edge
          accounting software is designed specifically for the education sector,
          providing a streamlined and user friendly experience for financial
          management. Whether you are a small school or a large university,{" "}
          <br />
          our accounting software is scalable to meet the needs of your
          institution.
        </span>

        <div className="my-6">
          <DemoCTA />
        </div>

        <div className="hidden md:block max-w-[1300px] mx-auto">
          <img src={heroImg} alt="" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Header;
