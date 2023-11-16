import React from 'react';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { AiOutlineLineChart, AiOutlineBell } from "react-icons/ai";
import { FiUsers, FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineChartSquareBar, HiOutlineReceiptTax} from "react-icons/hi";
import { FaCoins } from "react-icons/fa";
import { MdOutlineAssignment, MdOutlineLogout } from "react-icons/md";
import { TbCalendarStats } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";

const SideBar = ({sidebarOpen, setSidebarOpen}) => {
    
    // let sidebarOpen = false;
    const toggleSidebarMenu = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <section id="sidebar" className={`relative overflow-hidden transition-[width] ease ${sidebarOpen ? "w-[269px]" : "w-[98px]"} min-h-screen`}>
            <div className={`sidebar_innercontainer myprimarybgcolor fixed left-0 top-0 flex min-h-screen transition-[width] ease px-3 justify-center ${sidebarOpen ? "w-[269px]" : "w-[98px]"} py-5 `}>
                {/* pl-[35px] */}
                <div className="sidebar_content flex flex-col justify-between">
                    <div className="flex flex-col gap-7 justify-start">
                        <div className="flex">
                            <div className=" rounded-full bg-indigo-600 text-white p-1 font-medium">
                                VB
                            </div>
                        </div>
                        <div className="flex">
                            <div onClick={() => toggleSidebarMenu()} className="cursor-pointer border border-solid border-white rounded-full">
                                {sidebarOpen ? 
                                <FiChevronLeft size={24} color={"white"}/>
                                :
                                <FiChevronRight size={24} color={"white"}/>
                                }
                            
                            </div>
                        </div>
                        <Link to={'/dashboard'} className="sidebar_menu_item active_item relative flex items-center gap-5 text-white">
                            <span className="flex w-7">
                                <RxDashboard size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Overview</span>                                
                        </Link>
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="flex w-7">
                                <AiOutlineLineChart size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Business overview</span>
                        </Link>
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="flex w-7">
                                <FiUsers size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Employee</span>
                        </Link>
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="flex w-7">
                                <HiOutlineChartSquareBar size={26} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Budget</span>
                        </Link>
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="flex w-7">
                                <FaCoins size={22} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Sales & Expenses</span>
                        </Link>
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="w-7">
                                <MdOutlineAssignment size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Report</span>
                        </Link>
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="w-7">
                                <HiOutlineReceiptTax size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Taxes</span>
                        </Link>
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="w-7">
                                <TbCalendarStats size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Schedule</span>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-7">
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="w-7">
                                <VscFeedback size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Feedback</span>
                        </Link>
                        {/* /dashboard/settings */}
                        <Link to={'#'} className="sidebar_menu_item relative flex items-center gap-5 text-white">
                            <span className="w-7">
                                <FiSettings size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Settings</span>
                        </Link>                            
                        <Link to={'#'} className=" sidebar_menu_item relative flex items-center gap-6 text-white">
                            <span className="w-6 flip_H">
                                <MdOutlineLogout size={24} color={"white"}/>
                            </span>
                            <span className={`sidebar_menu_item_text ${sidebarOpen ? "block" : "hidden"}`}>Log out</span>
                        </Link>
                        
                    </div>
                </div>                    
            </div>
        </section>
    )
}

export default SideBar