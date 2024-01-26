import React from 'react';
import { AiOutlineBell } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { FiSearch, FiHelpCircle } from "react-icons/fi";


const Header = () => {
    return (
        <header className="flex w-full h-[78px] px-10 py-3 justify-center bg-white">
            <div className="flex w-full justify-between items-center">
                <h1 className="myprimarytextcolor text-xl">XYZ Company</h1>
                <div className="search_bar rounded-[35px] h-[40px] w-[35%] bg-[#F0F0F0]  pl-5 pr-10 flex items-center">
                    <span className="pr-3">
                        <FiSearch size={20} color={"#959BA5"}/>
                    </span>
                    <input className="outline-none h-[40px] bg-[#F0F0F0] w-full" type="text" name="" id="" placeholder='Search...'/>
                </div>
                <div className="navbar_right flex gap-10 items-center">
                    <div className="navbar_links flex gap-5">
                        <a href="#">
                            <FiHelpCircle size={20} color={"#41436a"}/>
                        </a>
                        <a href="#">
                            <AiOutlineBell size={20} color={"#41436a"}/>
                        </a>
                        <a href="#">
                            <FiSettings size={20} color={"#41436a"}/>
                        </a>
                    </div>
                    <div className="user_infos flex gap-5">
                            <div className="photo flex items-center justify-center relative user_photo_container">
                                <div className=" relative overflow-hidden rounded-full h-[40px] w-[40px] ">
                                    <img className="object-cover w-full h-full" src='assets/reviewer2.png' alt="authenticated_user" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="myprimarytextcolor">David A.</span>
                                <span className="text-[#959BA5] text-xs">Manager</span>
                            </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header