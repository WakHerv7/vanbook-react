import React, { useState, useRef } from "react";
import DemoCTA2 from "./DemoCTA2";
import reviewer1 from "../../Assets/reviewer1.png";
import reviewer2 from "../../Assets/reviewer2.png";
import reviewer3 from "../../Assets/reviewer3.png";
import stars from "../../Assets/stars.png";
import mail from "../../Assets/mail.png";
import bar from "../../Assets/bar-chart-2.png";
import zap from "../../Assets/zap.png";
import avatar from "../../Assets/Avatar.png";
import devices from "../../Assets/Devices.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation, Autoplay, Scrollbar, A11y } from "swiper";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const [swipeIndex, setSwipeIndex] = useState(0);
  // const swiperRef = useRef();

  // const swiper = useSwiper();
  const prevRef = useRef();
  const nextRef = useRef();

  const data = [
    {
      image: reviewer1,
      name: "Dave Chapman",
      role: "Accountant, Altair",
      company: "Interior Design Company.",
    },
    {
      image: reviewer2,
      name: "Adeola Adeoye",
      role: "Accountant, DeClair’s Academy",
      company: "Finance Consulting firm",
    },
    {
      image: reviewer3,
      name: "Oluwakemi Ade",
      role: "Principal, Wilmer’s Academy",
      company: "Institute for higher learning",
    },
    {
      image: reviewer1,
      name: "Dave Chapman",
      role: "Accountant, Altair",
      company: "Interior Design Company.",
    },
    {
      image: reviewer2,
      name: "Adeola Adeoye",
      role: "Accountant, Altair",
      company: "Finance Consulting firm.",
    },
    {
      image: reviewer3,
      name: "Oluwakemi Ade",
      role: "Accountant, Altair",
      company: "Institute for higher learning",
    },
  ];

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.5)",
    width: "90%",
    margin: "auto",
    height: "170px",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    padding: "1.5rem",
    color: "#ffffff",
  };

  const SwiperButtonPrev = ({ idx, onClick }) => {
    // const swiper = useSwiper();
    return <button
      className={`cursor-pointer rounded-lg border bg-transparent ${idx == 0 ? 'opacity-5' : 'opacity-100'}`}
      onClick={onClick}>
      <BsArrowLeftCircle size={35} />
    </button>;
  };

  const SwiperButtonNext = ({ idx, onClick }) => {
    // const swiper = useSwiper();
    return <button
      className={`cursor-pointer rounded-lg border bg-transparent ${idx == 5 ? 'opacity-5' : 'opacity-100'}`}
      onClick={onClick}>
      <BsArrowRightCircle size={35} />
    </button>;
  };

  return (
    <section >
      <div className="flex flex-col md:flex-row items-center justify-between md:w-[85%] mx-auto py-16">
        <div id="testimonial_section">
          <h2 className="text-[#101828] text-[1.7rem] mb-[1rem] text-center">
            Don’t just take our word for it
          </h2>
          <p className="text-[#475467] text-[1rem] text-center md:text-left mb-[1rem]">
            Hear from some of our amazing customers
          </p>
        </div>

        <div className="flex items-center">
          {/* <DemoCTA2 /> */}
        </div>
      </div>

      {/* Swiper start */}
      <div className="w-[85%] mx-auto">
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          onSwiper={(swiper) => {
            nextRef.current = swiper;
            prevRef.current = swiper;
          }}

          // modules={[Pagination, Navigation, Autoplay, Scrollbar, A11y]}

          onSlideChange={(swiper) => setSwipeIndex(swiper.realIndex)}
          // onSwiper={(swiper) => console.log(swiper)}
          /*using the refs instead of className*/
          // navigation
          pagination={{ clickable: true }}

          // navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            1200: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            968: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 100,
            },
            // 300: {
            //   slidesPerView: 3,
            //   spaceBetween: 50,
            // },
          }}
        >
          {data.map((item, index) => {
            return (
              // <div>
              <SwiperSlide key={Math.floor(Math.random() * 1000)}>
                <div
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: `cover`,
                    backgroundPosition: `center`,
                    width: `350px`,
                    height: `450px`,
                    display: `flex`,
                    paddingTop: `12rem`,
                  }}
                >
                  <div style={cardStyle}>
                    <img
                      src={stars}
                      alt=""
                      width={110}
                      className="mr-auto mb-4"
                    />
                    <span className="text-[1.5rem] mb-4">{item.name}</span>
                    <span>{item.role}</span>
                    <span>{item.company}</span>
                  </div>
                </div>
              </SwiperSlide>
              // </div>
            );
          })}
        </Swiper>
        <div className="flex gap-5 w-full mt-10">
          <SwiperButtonPrev idx={swipeIndex} onClick={() => prevRef.current.slidePrev()}></SwiperButtonPrev>
          <SwiperButtonNext idx={swipeIndex} onClick={() => nextRef.current.slideNext()}></SwiperButtonNext>
        </div>

      </div>
      {/* Swiper end */}

      <div className="w-[85%] mx-auto pt-[10rem] pb-16">
        <div id="feature_section" className="flex flex-col text-center gap-4">
          <span className="text-[#2E2F5B] font-semibold py-1 px-3 rounded-[15px] mx-auto bg-[#F9F5FF] w-fit text-[.9rem]">
            Features
          </span>
          <span className="-mb-1 font-medium text-[2rem] text-[#101828] capitalize">
            Cutting-edge finance management Platform
          </span>

          <span className="text-[#667085] text-[1.1rem] mb-8">
            A powerful, self-serve management platform for managing your school finances.
          </span>
        </div>

        <div>
          <img src={devices} alt="" className="w-[80%] mx-auto mt-12 mb-8" />
        </div>

        <div className="flex flex-col sm:gap-y-4 md:flex-row items-center py-16">
          <div className="flex flex-col gap-3 text-center flex-1 min-h-[180px] md:justify-between md:gap-0 ">
            <div className="mx-auto w-[40px] rounded-[50%] p-3 bg-[#F9F5FF]">
              <img src={mail} alt="" width={30} height={40} />
            </div>
            <span className="text-[#101828] text-[1rem]">
              Share team inboxes
            </span>
            <span className="text-[#667085] text-[.9rem] md:px-4">
              Our shared team inboxes keep everyone on the same page and in the
              loop.
            </span>

            <Link className="text-[#2E2F5B] flex items-center mx-auto gap-2 font-medium">
              Learn more
              <AiOutlineArrowRight />
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-center flex-1 min-h-[180px] md:justify-between md:gap-0 ">
            <div className="mx-auto w-[40px] rounded-[50%] p-3 bg-[#F9F5FF]">
              <img src={zap} alt="" width={30} height={40} />
            </div>
            <span>Deliver instant answers</span>
            <span className="text-[#667085] text-[.9rem] md:px-4">
              An all-in-one customer service platform that helps you balance
              everything.
            </span>

            <Link className="text-[#2E2F5B] flex items-center mx-auto gap-2 font-medium">
              Learn more
              <AiOutlineArrowRight />
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-center flex-1 min-h-[180px] md:justify-between md:gap-0 ">
            <div className="mx-auto w-[40px] rounded-[50%] p-3 bg-[#F9F5FF]">
              <img src={bar} alt="" width={30} height={40} />
            </div>
            <span>Manage your team with reports</span>
            <span className="text-[#667085] text-[.9rem] md:px-4 md:text-[.82rem] lg:text-[.9rem] ">
              Measure what matters with Vanbook’s easy-to-use reports. You can
              filter, export, and drilldown on the data in a couple
              clicks.
            </span>

            <Link className="text-[#2E2F5B] flex items-center mx-auto gap-2 font-medium">
              Learn more
              <AiOutlineArrowRight />
            </Link>
          </div>
        </div>

        <div className="py-16 border-t border-b text-center">
          <span className="text-[2.2rem] sm:text-[20px] text-[#101828]">
            I highly recommend Vanbook to any educational institution <br />{" "}
            looking to simplify their financial management
          </span>

          <div className="text-center flex flex-col gap-2 pt-12">
            <img src={avatar} alt="" width={100} className="mx-auto" />
            <span className="text-[#101828] text-[1.3rem] sm:text-[1rem]">Adeola Adeoye</span>
            <span className="text-[#667085] text-[1.3rem] sm:text-[1rem]">
              Accountant, DeClair’s Academy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
