import { React, useState } from 'react';
import Header from '../../Components/Dashboard/Header';
import Sidebar from '../../Components/Dashboard/Sidebar';
import { FiChevronLeft } from "react-icons/fi";

const listItems = [
    { value: "Item", text: "Element" },
    { value: "Item", text: "Element" },
    { value: "Item", text: "Element" },
    { value: "Item", text: "Element" }
];

function AccountsList(props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);


    return (
        <div className='flex w-full'>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <section className={`bg-[#F9F9F9] w-full transition-[width] ease ${sidebarOpen ? "sectionWidthSidebarOpen" : "sectionWidthSidebarClosed"}`}>
                <Header />
                {/* Main Page Container */}
                <div className="main_page_container bg-[#F0F0F0] flex flex-col justify-between">

                    <div>
                        <div className="flex px-10 py-3 justify-between gap-10  border border-b-slate-300">
                            <a href="#" className="flex gap-1 items-center">
                                <FiChevronLeft size={20} color={"#white"} />
                                <span className="myprimarytextcolor">Back</span>
                            </a>

                            <div className="select_container flex gap-5 items-center">
                                <span className="myprimarytextcolor">Look for</span>

                                <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select from the list`}</option>
                                    {
                                        listItems.map((val, ind) => {
                                            return <option value={val.value}>{val.text}</option>
                                        })
                                    }
                                </select>

                            </div>

                            <div className="select_container flex gap-5 items-center">
                                <span className="myprimarytextcolor">In</span>

                                <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select from the list`}</option>
                                    {
                                        listItems.map((val, ind) => {
                                            return <option value={val.value}>{val.text}</option>
                                        })
                                    }
                                </select>

                            </div>

                            <div className="select_container flex gap-5 items-center">
                                <span className="myprimarytextcolor">Currency</span>

                                <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select from the list`}</option>
                                    {
                                        listItems.map((val, ind) => {
                                            return <option value={val.value}>{val.text}</option>
                                        })
                                    }
                                </select>

                            </div>
                        </div>

                        <div className="table_container">
                            <table className="w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                            Name
                                        </th>
                                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                            Type
                                        </th>
                                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                            Currency
                                        </th>
                                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-100 border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            School income
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            Income
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            Naira
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            N455700
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            School income
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            Income
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            Naira
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            N455700
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-100 border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            School income
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            Income
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            Naira
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            N455700
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex px-5 py-3 gap-10 ">

                        <div className="select_container flex gap-5 items-center">
                            <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Account`}</option>
                                {
                                    listItems.map((val, ind) => {
                                        return <option value={val.value}>{val.text}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="select_container flex gap-5 items-center">
                            <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Activites`}</option>
                                {
                                    listItems.map((val, ind) => {
                                        return <option value={val.value}>{val.text}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="select_container flex gap-5 items-center">
                            <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Report`}</option>
                                {
                                    listItems.map((val, ind) => {
                                        return <option value={val.value}>{val.text}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="select_container flex gap-5 items-center">
                            <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Export`}</option>
                                {
                                    listItems.map((val, ind) => {
                                        return <option value={val.value}>{val.text}</option>
                                    })
                                }
                            </select>
                        </div>

                    </div>

                </div>
                {/* <h1 className="m-5" >Main Page</h1> */}
            </section>
        </div>
    );
}

export default AccountsList;