import { Link } from "react-router-dom";
import logo from "../../Assets/tech64Logo.svg";
import { useState } from "react";

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const dropdownMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="flex w-full h-[75px] bg-[#ffffff]">
      <div className="flex items-center w-[85%] h-full max-w-[1560px] mx-auto justify-between">
        {/* logo */}
        <div className="flex justify-between items-center h-full">
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
        {/* hamburger */}
        <button
          onClick={dropdownMenu}
          id="menu-btn"
          className={`${
            openMenu ? "open" : ""
          } block hamburger md:hidden focus:outline-none`}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>

        {/* menu */}
        <div className="hidden md:block">
          <ul className="flex items-center text-[#101828] gap-11 text-[.9rem] font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact us</Link>
            </li>
          </ul>
        </div>
        {/* login and sign-up */}
        <div className="hidden md:flex items-center gap-4 px-4">
          {/* <button className="text-[#101828] bg-[#F9FAFB] text-[.9rem] py-2 px-4 rounded-lg font-medium">
            <Link to="/login">Login</Link>
          </button> */}
          <button className="bg-[#2E2F5B] text-white py-2 px-4 rounded-lg text-[.9rem] font-medium">
            <Link to="/join-wait-list">Join wait-list</Link>
          </button>
        </div>
      </div>
      {/* mobile menu */}
      {openMenu && (
        <div className="md:hidden">
          <div
            id="menu"
            className="absolute flex-col items-center self-end py-8 mt-[4.5rem] space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
          >
            <ul className="flex flex-col items-center text-[#101828] gap-7 text-[.9rem] font-medium">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about-us">About us</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact us</Link>
              </li>
              <li>
                {/* <button className="text-[#101828] bg-[#F9FAFB] text-[.9rem] py-2 px-4 rounded-lg font-medium">
                  <Link to="/login">Login</Link>
                </button> */}
              </li>
              <li>
                <button className="bg-[#2E2F5B] text-white py-2 px-4 rounded-lg text-[.9rem] font-medium">
                  <Link to="/join-wait-list">Join wait-list</Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
