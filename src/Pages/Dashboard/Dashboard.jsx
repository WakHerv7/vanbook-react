import { React, useState } from 'react';
import Header from '../../Components/Dashboard/Header';
import Sidebar from '../../Components/Dashboard/Sidebar';
import {
    HiOutlineArrowNarrowRight, HiOutlineBookOpen,
    HiOutlineArrowNarrowDown, HiOutlineCash
} from "react-icons/hi";
import {
    BsReceiptCutoff, BsCashCoin,
    BsReceipt, BsCreditCard
} from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { RiHandCoinLine } from "react-icons/ri";
import { IoCashOutline } from "react-icons/io5";






function Dashboard(props) {


    const [sidebarOpen, setSidebarOpen] = useState(false);


    return (
        <div className='flex w-full'>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <section className={`bg-[#F9F9F9] w-full transition-[width] ease ${sidebarOpen ? "sectionWidthSidebarOpen" : "sectionWidthSidebarClosed"}`}>
                <Header />
                {/* Main Page Container */}
                <div className="main_page_container px-10 bg-[#F0F0F0] flex flex-col justify-center items-center">

                    <div className="dashboard_container flex flex-col justify-center items-center">
                        <div className="dashboard_row mb-5 flex flex-col justify-center items-center">
                            <div className="dashboard_row_title">
                                <div className='myprimarytextcolor'>Administration</div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-4 pl-3">
                                    <div className="dashboard_box">
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <FiEdit3 size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Registration</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pl-3">
                                    <HiOutlineArrowNarrowRight size={'40'} color={'#41436a'} />
                                    <div className="dashboard_box">
                                        <div className="horiz_line_mask_right"></div>
                                        <div className="vertical_arrow_stick"></div>
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <BsReceiptCutoff size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Create receipt</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard_row mb-5 pt-3 flex flex-col justify-center items-center">
                            <div className="horiz_line_primary"></div>
                            <div className="dashboard_row_title">
                                <div className='myprimarytextcolor'>Bookkeeping</div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-4 pl-3">
                                    <div className="dashboard_box">
                                        <div className="horiz_line_mask_left"></div>
                                        <div className="box_top_arrow">
                                            <HiOutlineArrowNarrowDown size={'35'} color={'#41436a'} />
                                        </div>
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <RiHandCoinLine size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Receive payment</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pl-3">
                                    <HiOutlineArrowNarrowRight size={'40'} color={'#41436a'} />
                                    <div className="dashboard_box">
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <HiOutlineBookOpen size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Cashbook</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pl-3">
                                    <HiOutlineArrowNarrowRight size={'40'} color={'#41436a'} />
                                    <div className="dashboard_box">
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <BsCashCoin size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Debtors</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pl-3">
                                    <HiOutlineArrowNarrowRight size={'40'} color={'#41436a'} />
                                    <div className="dashboard_box">
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <IoCashOutline size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Deposit</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard_row mb-5 flex flex-col justify-center items-center">
                            <div className="dashboard_row_title">
                                <div className='myprimarytextcolor'>Creditors</div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-4 pl-3">
                                    <div className="dashboard_box">
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <BsReceipt size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Generate bill</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pl-3">
                                    <HiOutlineArrowNarrowRight size={'40'} color={'#41436a'} />
                                    <div className="dashboard_box">
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <HiOutlineCash size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Pay bill</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pl-3">
                                    <HiOutlineArrowNarrowRight size={'40'} color={'#41436a'} />
                                    <div className="dashboard_box">
                                        <div className="flex">
                                            <div className="dashboard_box_icon">
                                                <BsCreditCard size={'20'} color={'#41436a'} />
                                            </div>
                                        </div>
                                        <span className='myprimarytextcolor'>Creditors</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
                {/* <h1 className="m-5" >Main Page</h1> */}
            </section>
        </div>
    );
}

export default Dashboard;