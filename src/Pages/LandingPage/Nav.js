import { Link } from "react-router-dom";
import logo from "../../Assets/Tech64-logo.svg";

const Nav = () => {
  const dropdownMenu = () => {
    const hamburger = document.getElementById("menu-btn");
    const dropNav = document.getElementById("menu");
    hamburger.classList.toggle("open");
    dropNav.classList.toggle("flex");
    dropNav.classList.toggle("hidden");
  };

  return (
    <nav className="flex w-full h-[75px] bg-[#ffffff]">
      <div className="flex items-center w-[85%] h-full max-w-[1560px] mx-auto justify-between">
        {/* logo */}
        <div className="flex justify-between items-center h-full">
          <img src={logo} alt="" />
        </div>

        {/* hamburger */}
        <button
          onClick={dropdownMenu}
          id="menu-btn"
          class="block hamburger md:hidden focus:outline-none"
        >
          <span class="hamburger-top"></span>
          <span class="hamburger-middle"></span>
          <span class="hamburger-bottom"></span>
        </button>

        {/* menu */}
        <div className="hidden md:block">
          <ul className="flex items-center text-[#101828] gap-11 text-[.9rem] font-medium">
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">Product</Link>
            </li>
            <li>
              <Link to="#">Pricing</Link>
            </li>
            <li>
              <Link to="#">Learn & Support</Link>
            </li>
          </ul>
        </div>
        {/* login and sign-up */}
        <div className="hidden md:flex items-center gap-6 px-4">
          <button className="text-[#101828] text-[.9rem] font-medium">
            <Link to="/login">Login</Link>
          </button>

          <button className="bg-[#2E2F5B] text-white py-2 px-4 rounded-lg text-[.9rem] font-medium">
            <Link to="/signup">Sign up</Link>
          </button>
        </div>
      </div>
      {/* mobile menu */}
      <div class="md:hidden">
        <div
          id="menu"
          class="absolute flex-col items-center self-end hidden py-8 mt-[4.5rem] space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
        >
          <ul className="flex flex-col items-center text-[#101828] gap-7 text-[.9rem] font-medium">
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">Product</Link>
            </li>
            <li>
              <Link to="#">Pricing</Link>
            </li>
            <li>
              <Link to="#">Learn & Support</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
