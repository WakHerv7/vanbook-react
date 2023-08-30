import {React, useState, useEffect }from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";

function Persons(props) {

    return (
        <>
        <div className="main_page_container px-10 bg-[#F0F0F0] flex flex-col justify-between">

            <div>
                <div className="flex py-3 justify-between items-center gap-10  border border-b-slate-300">
                    <Link to={""} onClick={"/dashboard"} className="flex gap-1 items-center">
                        <FiChevronLeft size={20} color={"#white"}/>
                        <span className="myprimarytextcolor">Back</span>
                    </Link>
                    <div className="flex justify-end overflow-hidden border-2 rounded-lg border-gray-300">
                        <NavLink reloadDocument to={"/dashboard/persons/students"} 
                        style={({ isActive }) => (isActive ? {background: 'white'} : {})}                        
                        className={`outline-none border border-r-gray-400 text-[#41436a] text-sm px-3 py-2`}
                        >
                            Student
                        </NavLink>
                        <NavLink reloadDocument to={"/dashboard/persons/staff"}
                        style={({ isActive }) => (isActive ? {background: 'white'} : {})}
                        className={`outline-none text-[#41436a] text-sm px-3 py-2`}
                        >
                            Staff
                        </NavLink>
                        <NavLink reloadDocument to={"/dashboard/persons/customers"}
                        style={({ isActive }) => (isActive ? {background: 'white'} : {})}
                        className={`outline-none border border-l-gray-400 rounded-md text-[#41436a] text-sm px-3 py-2`}
                        >
                            Customers
                        </NavLink>
                    </div>

                </div>

                <Outlet/>
            </div>

        </div>
        </>
    );
}

export default Persons;