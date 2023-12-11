import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/tech64Logo.svg";
import GoogleAuth from "../../Components/GoogleAuth";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEffect } from "react";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState();


  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);



  return (
    <section>
      <nav className="h-[70px] flex items-center pl-12">
        <a href="/">
          <img src={logo} alt="tech64 logo" className="cursor-pointer" />
        </a>
      </nav>

      <div className="w-[65%] border mx-auto flex my-8 rounded">
        {/*====== Left-Side ========*/}
        <div className="flex-1 p-8 bg-white">
          <form>
            <div className="w-[80%]">
              <div className="flex flex-col">
                <span className="text-[1.15rem] font-semibold text-[#2C2C2C]">
                  Sign up for Vanbook account
                </span>
                <span className="text-[.75rem] text-[#2C2C2C] mt-2 mb-[-0.5rem] font-light">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-[#41436a] font-semibold ml-1"
                  >
                    Sign in
                  </Link>
                </span>
              </div>

              <GoogleAuth />

              <div className="my-4 flex items-center justify-between">
                <span className="w-[45%] h-[1px] bg-[#D7D7D7]"></span>
                <span>or</span>
                <span className="w-[45%] h-[1px] bg-[#D7D7D7]"></span>
              </div>

              <div>
                <div className="mb-4">
                  <label className="text-[.9rem]">Email Address</label>
                  <input
                    type="email"
                    className="w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[.9rem]">First name</label>
                  <input
                    type="name"
                    className="w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[.9rem]">Last name</label>
                  <input
                    type="name"
                    className="w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-[.9rem]">Phone</label>
                  <PhoneInput
                    className="w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]"
                    value={phoneNumber}
                    onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    defaultCountry="NG"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-[.9rem]">Password</label>
                  <input
                    type="password"
                    className="w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]"
                  />
                </div>
              </div>

              {/*====== SignUp Button ========*/}
              {/* <button
                type='submit'
                className='w-full h-[2.5rem] bg-[#41436a] rounded-lg text-white text-[.9rem]'
              >
                <Link to="/dashboard">
                Create account
              </button> */}
              <Link
                to="/onboarding2"
                className="flex items-center justify-center h-[2.5rem] bg-[#41436a] rounded-lg text-white"
              >
                Create account
              </Link>

              <p className="text-[.6rem] my-4 text-[#151515]">
                By selecting create account or sign up google, you agree with
                our terms and have read our and acknowledged our Global privacy
                statement.
              </p>
            </div>
          </form>
        </div>

        {/*====== Right-Side ========*/}
        <div className="flex-1 bg-[#FAF0CA] p-8 text-[#2E2F5B]">
          <div className="pt-[4rem]">
            <h2 className="text-[2rem] mb-4 font-semibold">
              Your Vanbook Online Plan
            </h2>
            <span className="text-[1.4rem] font-bold">N5,000/month</span>

            <ul className="mt-4 list-disc ml-4 text-[.9rem]">
              <li>Track inventory</li>
              <li>Access data from all your devices</li>
            </ul>

            <p className="mt-4 text-[.9rem]">
              * If you have an existing QuickBooks Online account, you can add /
              sign up for a new company using your existing sign in details.
              This single sign in allows you to view and manage multiple
              companies, including your existing account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
