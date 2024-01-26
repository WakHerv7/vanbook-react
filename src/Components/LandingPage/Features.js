import React from "react";
import {featureData as data} from "../../constants";


const Features = () => {
  return (
    <section className="bg-[#F9FAFB] w-full md:mt-[-8rem] z-1 relative">
      <div className="w-[85%] mx-auto pt-[6rem] pb-[5rem]">
        <div id="overview_section" className="flex flex-col text-center pb-8">

          <span className="mb-3 font-medium text-[2rem] text-[#101828]">
            All you need to run your finances effectively
          </span>

          <span className="text-[#475467] text-[1.1rem]">
            Open a full-featured account on Vanbook in less than 5 minutes
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
          {data.map((data, index) => {
            const { heading, text, image } = data;

            return (
              <div className="text-center mb-[1.5rem]" key={index}>
                <div className="h-[120px] flex items-center">
                  <img
                    src={`assets/${image}.png`}
                    alt=""
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>

                <h3 className="text-[1.1rem] text-[#101828] mb-4">{heading}</h3>
                <p className="text-[1.1rem] sm:text-[1rem] font-light w-[75%] mx-auto">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
