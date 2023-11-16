import {React, useState }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {HiOutlineArrowNarrowRight, HiOutlineBookOpen,
    HiOutlineArrowNarrowDown, HiOutlineCash} from "react-icons/hi";
import {BsReceiptCutoff, BsCashCoin, BsCash,
    BsReceipt, BsCreditCard} from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import {RiHandCoinLine} from "react-icons/ri";
import { IoCashOutline } from "react-icons/io5";



function Dashboard(props) {

    const navigate = useNavigate();

    return (
        <>
            <div className="main_page_container px-10 mt-10 bg-[#F0F0F0] flex flex-col items-center">

                <div className="dashboard_container flex flex-col justify-center items-center">
                   
                    <div className="dashboard_row mb-5 flex flex-col justify-center items-center">
                        <div className="dashboard_row_title">
                            <div className='myprimarytextcolor'>Settings</div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/accounts'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Accounts</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/account_types'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Account Types</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/items'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Items</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/item_types'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Item Types</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/school_classes'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Classes</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/school_payment_configs'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Payments configurations</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/persons/students'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Registered Students</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/persons/staff'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'> Staff</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/persons/customers'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'> Customers</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/receipts'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Receipts</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/person_roles'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Person roles</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 pl-3 mb-5">
                                <Link reloadDocument to={'/dashboard/payment_methods'} className="dashboard_box">
                                    <span className='text-xl text-center font-bold myprimarytextcolor'>Payment methods</span>
                                </Link>
                            </div>                      
                        </div>
                    </div>
                    
                </div>

                
                
            </div>
        </>
    );
}

export default Dashboard;