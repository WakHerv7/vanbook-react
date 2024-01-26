import React, { useState, useRef } from "react";
import DemoCTA2 from "./DemoCTA2";
import { reviewerData } from '../../constants'
import { AiOutlineArrowRight } from "react-icons/ai";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

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

  // const cardStyle = {
  //   background: "rgb(0,0,0)",
  //   width: "90%",
  //   margin: "auto",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "left",
  //   justifyContent: "center",
  //   padding: "1.5rem",
  // };

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
    <section>
      <div className="flex flex-col md:flex-row items-center justify-between md:w-[85%] mx-auto py-16">
        <div id="testimonial_section" className="w-full">
          <h2 className="text-[#101828] text-[1.7rem] mb-[1rem] text-center">
            Don't just take our word for it
          </h2>
          <p className="text-[#475467] text-[1rem] text-center mb-[1rem]">
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
          {reviewerData.map((item, index) => {
            return (
              // <div>
              <SwiperSlide key={Math.floor(Math.random() * 1000)}>
                <div className="flex flex-col justify-center items-center gap-2 p-4">
                  <div>
                    <img
                      src={`assets/${item.image}.png`}
                      alt={item.name}
                      className="h-24 w-24 border-none rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-start align-center">
                    <p className="text-base italic text-center">
                      {item.comment}
                    </p>
                    <hr className="mt-4 mb-2"/>
                    <div>
                      <h3 className="text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.role}</p>
                      <p className="text-xs text-gray-400">{item.company}</p>
                    </div>
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
          <span className="text-[#2E2F5B] font-semibold py-1 px-3 rounded-[15px] mx-auto bg-[#F9F5FF] w-fit text-[1.1rem]">
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
          <img src="assets/Devices.png" alt="" className="w-[80%] mx-auto mt-12 mb-8" />
        </div>

        <div className="flex flex-col sm:gap-y-4 md:flex-row items-center py-16">
          <div className="flex flex-col gap-3 text-center flex-1 min-h-[200px] md:justify-between md:gap-0 ">
            <div className="mx-auto w-[40px] rounded-[50%] p-3 bg-[#F9F5FF]">
              <img src="assets/mail.png" alt="" width={30} height={40} />
            </div>
            <span className="text-[#101828] text-[1rem]">
              Share team inboxes
            </span>
            <span className="text-[#667085] md:text-[1.1rem] text-[.9rem] md:px-4">
              Our shared team inboxes keep everyone on the same page and in the
              loop.
            </span>

            <Link className="text-[#2E2F5B] flex items-center mx-auto gap-2 font-medium">
              Learn more
              <AiOutlineArrowRight />
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-center flex-1 min-h-[200px] md:justify-between md:gap-0 ">
            <div className="mx-auto w-[40px] rounded-[50%] p-3 bg-[#F9F5FF]">
              <img src="assets/zap.png" alt="" width={30} height={40} />
            </div>
            <span>Deliver instant answers</span>
            <span className="text-[#667085] md:text-[1.1rem] text-[.9rem] md:px-4">
              An all-in-one customer service platform that helps you balance
              everything.
            </span>

            <Link className="text-[#2E2F5B] flex items-center mx-auto gap-2 font-medium">
              Learn more
              <AiOutlineArrowRight />
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-center flex-1 min-h-[200px] md:justify-between md:gap-0 ">
            <div className="mx-auto w-[40px] rounded-[50%] p-3 bg-[#F9F5FF]">
              <img src="assets/bar-chart-2.png" alt="" width={30} height={40} />
            </div>
            <span>Manage your team with reports</span>
            <span className="text-[#667085] text-[.9rem] md:px-4 md:text-[1.1rem]">
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
            <img src="assets/Avatar.png" alt="" width={100} className="mx-auto" />
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
