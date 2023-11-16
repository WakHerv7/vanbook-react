import React from "react";
import clock from "../../Assets/clock.png";
import cuate from "../../Assets/cuate.png";
import cuate2 from "../../Assets/cuate2.png";
import rafiki from "../../Assets/rafiki.png";
import calendar from "../../Assets/Calendar.png";
import group from "../../Assets/Group 242.png";

const Features = () => {
  const data = [
    {
      image: calendar,
      heading: "Organized format",
      text: "Vanbook keeps everything in its right place, so you'll always have what you need when you need it",
    },
    {
      image: clock,
      heading: "Free up time",
      text: "Sync with your bank  so your books are always accurate and up to date",
    },
    {
      image: cuate2,
      heading: "Claim everything",
      text: "Claim every of your entitlement at  tax time with your expense receipts stored and sorted in Vanbook",
    },
    {
      image: group,
      heading: "Deliver instant answers",
      text: "All-in-one accounting platform that helps you balance everything regarding your business finances",
    },
    {
      image: cuate,
      heading: "Manage business with reports",
      text: "Measure what matters with Vanbook easy-to-use reports, You can filter, export and drilldown on the data you need.",
    },
    {
      image: rafiki,
      heading: "Unlimited support",
      text: "With Vanbook free and unlimited customer support, help is just a click away 24/7",
    },
  ];

  return (
    <section className="bg-[#F9FAFB] w-full md:mt-[-8rem] z-1 relative">
      <div className="w-[85%] mx-auto pt-[6rem] pb-[5rem]">
        <div className="flex flex-col text-center pb-8">

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
                    src={image}
                    alt=""
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>

                <h3 className="text-[1.1rem] text-[#101828] mb-4">{heading}</h3>
                <p className="text-[.8rem] font-light w-[75%] mx-auto">
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
