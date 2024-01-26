/* eslint-disable no-unused-vars */
import Footer from "../Components/Footer";
import Nav from "../Components/LandingPage/Nav";
import Trial from "../Components/LandingPage/Trial";
import TeamCard from "../Components/Card/TeamCard";
import Alert from "../Components/LandingPage/Alert";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function AboutUs() {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behaviour: 'smooth'})
  }, [])


  return (
    <div>
      <Alert />
      <Nav />
      <section
        id="mapBg-section"
        className={`bg-[#F9FAFB] bg-center bg-cover bg-no-repeat`}
      >
        <div className="map-container max-w-[90%] mx-[auto]">
          <div className="flex flex-col justify-center items-center text-center h-[488px] gap-[48px]">
            <div className="flex flex-col gap-[24px]">
              <p>
                <span className="bg-[#fff] p-[10px] rounded-[24px]">
                  About us
                </span>
              </p>
              <h1 className="font-[500] text-[20px] leading-[26.04px] text-[#101828] ">
                Efficient finance management for all
              </h1>
              <p className="font-[500] text-[16px] leading-[20.83px] text-[#475467]">
                We're a dedicated team for your school's smart financial
                management
              </p>
            </div>
            <div className="flex gap-[20px] justify-center">
              {/* <button className="bg-[#FFFFFF] text-[#344054] py-[12px] px-[20px] rounded-[8px] font-[500] text-[16px] leading-[21,6px] shadow-[0px_4px_4px_rgba(0,0,0,0.12)] ">
                Chat to sales
              </button> */}
              <button
                className='bg-[#2E2F5B] text-white py-2 px-4 rounded-lg text-[.9rem] font-medium'
            >
                <Link to="/join-wait-list">
                    Join wait-list
                </Link>
            </button>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section>
        <div className="mission-container py-[56px] text-center max-w-[90%] mx-[auto]">
          <h2 className="font-[500] text-[20px] leading-[27px] text-[#101828] mb-[24px]">
            We're a mission driven company
          </h2>
          <p className="font-[400] text-[16px] leading-[21.6px] text-[#475467]">
            Powerful, self-serve financial management product to help organize
            and, manage, your schools finances. Trusted by 20+ schools
          </p>
        </div>
      </section>
      <section className="bg-[#F9FAFB] py-[48px]">
        <div id="our_values_section" className="values-container flex flex-col max-w-[90%] mx-[auto]">
          <div className="text-center">
            <p className="font-[400] text-[16px] leading-[24px] text-[#2E2F5B]">
              Our values
            </p>
            <h2 className="font-[400] text-[20px] leading-[44px] tracking-[-2%] text-[#101828]">
              How we work at Tech64
            </h2>
            <p className="font-[400] text-[16px] leading-[21.6px] text-[#667085]">
              Our shared values keep us connected and guide us as one team.
            </p>
          </div>
          {/*  */}
          <div className="mt-[80px] flex flex-col md:flex-row flex-wrap justify-evenly gap-[64px] md:gap-x-8 md:gap-y-24">
            <div className="flex flex-col basis-[30%] gap-2 justify-center items-center text-center">
              <img src="assets/people.svg" alt="" />
              <h2 className="font-[400] text-[20px] leading-[30px] text-[#101828]">
                Care about our team
              </h2>
              <p className="font-[400] text-[16px] leading-[24px] text-[#667085]">
                Understand what matters to our employees. Give them what they
                need to do their best work.
              </p>
            </div>
            <div className="flex flex-col basis-[30%] gap-2 justify-center items-center text-center">
              <img src="assets/heart.svg" alt="" />
              <h2 className="font-[400] text-[20px] leading-[30px] text-[#101828]">
                Be excellent to each other
              </h2>
              <p className="font-[400] text-[16px] leading-[24px] text-[#667085]">
                No games. No bullshit. We rely on our peers to improve. Be open,
                honest and kind.
              </p>
            </div>
            <div className="flex flex-col basis-[30%] gap-2 justify-center items-center text-center">
              <img src="assets/curved-arrow.svg" alt="" />
              <h2 className="font-[400] text-[20px] leading-[30px] text-[#101828]">
                Pride in what we do
              </h2>
              <p className="font-[400] text-[16px] leading-[24px] text-[#667085]">
                Value quality and integrity in everything we do. At all times.
                No exceptions.
              </p>
            </div>
            <div className="flex flex-col basis-[30%] gap-2 justify-center items-center text-center">
              <img src="assets/emoji.svg" alt="" />
              <h2 className="font-[400] text-[20px] leading-[30px] text-[#101828]">
                Care for the customer
              </h2>
              <p className="font-[400] text-[16px] leading-[24px] text-[#667085]">
                Understand customers' stated and unstated needs. Make them
                wildly successful.
              </p>
            </div>
            <div className="flex flex-col basis-[30%] gap-2 justify-center items-center text-center">
              <img src="assets/flag.svg" alt="" />
              <h2 className="font-[400] text-[20px] leading-[30px] text-[#101828]">
                Do the impossible
              </h2>
              <p className="font-[400] text-[16px] leading-[24px] text-[#667085]">
                Be energized by difficult problems. Revel in unknowns. Ask
                "Why?", but always question, "Why not?"
              </p>
            </div>
            <div className="flex flex-col basis-[30%] gap-2 justify-center items-center text-center">
              <img src="assets/bzzzt.svg" alt="" />
              <h2 className="font-[400] text-[20px] leading-[30px] text-[#101828]">
                Sweat the small stuff
              </h2>
              <p className="font-[400] text-[16px] leading-[24px] text-[#667085]">
                We believe the best products come from the best attention to
                detail. Sweat the small stuff.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section>
        <div className="meet-team-container my-[104px] max-w-[90%] mx-[auto]">
          <div id="our_team_section" className="text-center">
            <h2 className="text-[#101828] font-[400] text-[24px] leading-[32.4px] ">
              Meet our team
            </h2>
            <p className="text-[#667085] font-[400] text-[16px] leading-[21.6px]">
              Our philosophy is simple — form a team of diverse, passionate
              people and foster a culture that empowers you to do you best work.
            </p>
          </div>
          <div className="team-container mt-[64px] flex flex-col flex-wrap gap-[24px] md:flex-row">
            {/* card component */}
            <TeamCard
              img="assets/vanessa-Avt.svg"
              name={"Vanessa"}
              position={"C.E.O"}
            />
            <TeamCard
              img="assets/hermanAvt.svg"
              name={"Hermann"}
              position={"Full Stack Developer"}
            />
            <TeamCard
              img="assets/davidAvt.svg"
              name={"David"}
              position={"Design Lead"}
            />
            <TeamCard
              img="assets/fisayoAvt.svg"
              name={"Fisayo"}
              position={"Product Designer"}
            />
            <TeamCard
              img="assets/olanikeAvt.svg"
              name={"Olanike"}
              position={"Product Designer"}
            />
            <TeamCard
              img="assets/olanikeAvt.svg"
              name={"Maureen"}
              position={"UX Researcher"}
            />
            <TeamCard
              img="assets/joyAvt.svg"
              name={"Arinze Joy"}
              position={"Backend Developer"}
            />
          </div>
        </div>
      </section>
      {/*  */}
      <section>
        <div className="get-started-container flex flex-col items-center max-w-[90%] mx-[auto] mb-[80px] md:flex-row md:justify-between">
          <div className="text-center md:text-left md:flex-1">
            <h2 className="font-medium text-[26px] leading-[32.4px] mb-[24px]">
              We're just getting started
            </h2>
            <p className="font-normal text-[16px] leading-[24px] text-[#475467] md:pe-6 ">
              Our philosophy is simple - We are a team of diverse, passionate
              people  and foster a culture that empowers you to do your best
              work.
            </p>
          </div>


          <div className="md:flex-1 md:flex md:items-center md:justify-end">
            <img 
            src="assets/frame9727.svg"
            alt=""
            className="object-contain md:w-5/6 md:h-5/6"
            />
          </div>
        </div>
      </section>
      {/* <Trial /> */}
      <Footer />
    </div>
  );
}
export default AboutUs;
