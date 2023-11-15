import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] w-full">
      <div className="flex flex-col md:flex-row border-b w-[95%] pl-[1rem] md:w-[85%] mx-auto justify-between py-16 lg:pr-12">
        {/* logo and pitch */}
        <div className="flex flex-col justify-center w-full md:w-[30%] pt-2">
          <span className="font-bold text-[1.1rem] mb-4">Tech 64</span>
          <span className="text-[#667085] max-w-xl">
            We aim to create an amazing digital accounting experiences that
            create more happiness in the world.
          </span>
        </div>

        {/* row 1 */}
        <div className="flex gap-x-8 mt-8 md:w-1/4">
          <div className="text-[.9rem] leading-8 w-1/2">
            <span className="text-[#98A2B3]">Product</span>
            <div className="text-[#667085] font-medium flex flex-col">
              <Link to="#">Overview</Link>
              <Link to="#">Features</Link>
              <Link to="#" className="flex gap-2">
                Solutions
                <span className="bg-[#ECFDF3] px-2 rounded-lg text-[.7rem]">
                  New
                </span>
              </Link>
              <Link to="#">Tutorials</Link>
              <Link to="#">Pricing</Link>
              <Link to="#">Releases</Link>
            </div>
          </div>

          <div className="text-[.9rem] leading-8 w-1/2">
            <span className="text-[#98A2B3]">Company</span>
            <div className="text-[#667085] font-medium flex flex-col">
              <Link to="#">About us</Link>
              <Link to="#">Careers</Link>
              <Link to="#">Press</Link>
              <Link to="#">News</Link>
              <Link to="#">Media kit</Link>
              <Link to="#">Contact</Link>
            </div>
          </div>
        </div>

        {/* row 2 */}
        <div className="flex gap-x-8 mt-8 md:w-1/4">
          <div className="text-[.9rem] leading-8 w-1/2">
            <span className="text-[#98A2B3]">Resources</span>
            <div className="text-[#667085] font-medium flex flex-col">
              <Link to="#">Blog</Link>
              <Link to="#">Newsletter</Link>
              <Link to="#">Events</Link>
              <Link to="#">Help centre</Link>
              <Link to="#">Tutorials</Link>
              <Link to="#">Support</Link>
            </div>
          </div>

          <div className="text-[.9rem] leading-8 w-1/2">
            <span className="text-[#98A2B3]">Social</span>
            <div className="text-[#667085] font-medium flex flex-col">
              <Link to="#">Twitter</Link>
              <Link to="#">LinkedIn</Link>
              <Link to="#">Facebook</Link>
              <Link to="#">GitHub</Link>
            </div>
          </div>
        </div>

        {/* final row */}
        <div className="mt-8">
          <div className="text-[.9rem] leading-8">
            <span className="text-[#98A2B3]">Legal</span>
            <div className="text-[#667085] font-medium flex flex-col">
              <Link to="#">Terms</Link>
              <Link to="#">Privacy</Link>
              <Link to="#">Cookies</Link>
              <Link to="#">Licenses</Link>
            </div>
          </div>
        </div>
        {/* end */}
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
