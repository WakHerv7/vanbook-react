import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../Assets/tech64Logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] w-full mt-[24px] ">
      <div className="flex flex-col lg:flex-row border-b w-[95%] lg:w-[85%] mx-auto justify-between py-16">
        {/* logo and pitch */}
        <div className="flex flex-col justify-center w-full lg:w-[30%] pt-2">
          <div className="flex items-center h-[50%] sm:mb-[10px] ">
            <img src={logo} alt="" className="mr-[8px] h-[38px] mt-[5px]" />
            <div className="flex flex-col">
              <span className="font-[400] text-[16px] leading-[20px] ">
                Tech 64 Africa
              </span>
              <span className="font-[600] text-[22px] leading-[20px] ">
                Vanbook
              </span>
            </div>
          </div>
          
          <span className="text-[#667085] max-w-xl mt-7">
            We aim to create an amazing digital accounting experiences that
            create more happiness in the world.
          </span>
        </div>
        {/* footer items list */}
        <div className="flex flex-col md:flex-row gap-x-8 mt-8 lg:w-[60%] ">
          <div className="flex mb-[16px] md:mb-[0] md:w-1/2">
            <div className="text-[.9rem] leading-8 w-1/2">
              <span className="text-[#98A2B3]">Product</span>
              <div className="text-[#667085] font-medium flex flex-col">
                <Link to="#">Overview</Link>
                <Link to="#">Features</Link>
                <Link to="#" className="flex gap-2">
                  Testimonials
                  {/* <span className="bg-[#ECFDF3] px-2 rounded-lg text-[.7rem]">
                    New
                  </span> */}
                </Link>
                <Link to="#">Pricing</Link>
              </div>
            </div>
            <div className="text-[.9rem] leading-8 w-1/2">
              <span className="text-[#98A2B3]">Company</span>
              <div className="text-[#667085] font-medium flex flex-col">
                <Link to="#">About us</Link>
                <Link to="#">Our values</Link>
                <Link to="#">Meet Our team</Link>
                <Link to="#">Sign up for free trial</Link>
              </div>
            </div>
          </div>
          <div className="flex md:w-1/2">
            <div className="text-[.9rem] leading-8 w-1/2">
              <span className="text-[#98A2B3]">Social</span>
              <div className="text-[#667085] font-medium flex flex-col">
                <Link to="#">Twitter</Link>
                <Link to="#">LinkedIn</Link>
                <Link to="#">Facebook</Link>
              </div>
            </div>
            <div className="text-[.9rem] leading-8 w-1/2">
              <span className="text-[#98A2B3]">Legal</span>
              <div className="text-[#667085] font-medium flex flex-col">
                <Link to="#">Terms</Link>
                <Link to="#">Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="w-[85%] mx-auto text-[#98A2B3] flex justify-between">
          <span className="text-[.9rem]">
            © 2023 Tech64. All rights reserved.
          </span>

          <div className="flex gap-4">
            <AiOutlineTwitter fontSize={20} />
            <AiFillLinkedin fontSize={20} />
            <BsFacebook fontSize={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
