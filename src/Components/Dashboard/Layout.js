import React, {useState} from 'react';
import { Outlet } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';

function Layout(props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className='flex w-full'>            
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            
            <section className={`bg-[#F9F9F9] w-full transition-[width] ease ${sidebarOpen ? "sectionWidthSidebarOpen" : "sectionWidthSidebarClosed"}`}>
                <Header/>
                <Outlet/>
            </section>
            
        </div>
    );
}

export default Layout;