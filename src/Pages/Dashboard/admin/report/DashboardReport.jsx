import React from 'react'

import SideBar from '../../../../Components/Dashboard/admin/SideBar'
import Datepicker from '../../../../Components/Dashboard/admin/report/DatePicker'
import SelectFromList from '../../../../Components/Dashboard/admin/report/SelectFromList'
import CustomDropMenu from '../../../../Components/Dashboard/admin/report/CustomDropMenu'
import ItemCell from '../../../../Components/Dashboard/admin/report/ItemCell'
import ProfileHeader from '../../../../Components/Dashboard/admin/profile/ProfileHeader'



const DashboardReport = () => {
    return (
        <main className="min-w-screen min-h-screen scroll-smooth flex bg-[#F9F9F9] font-['DM_Sans'] ">
            <SideBar height={'0px'} />

            <section className="pb-6 flex-1 h-full">
                <ProfileHeader />
                <header className='bg-[#F9FAFB] '>
                    <div className="py-3.5 px-12 justify-between items-center flex border border-[#D7D7D7]">
                        <div className="flex items-center justify-around gap-20">
                            <div className="py-2.5 gap-2 items-center flex">
                                <img
                                    src="/svg/dropdown.svg"
                                    alt="dropdown"
                                    className="transform rotate-90"
                                />
                                <span className="text-[#2E2F5B] text-base font-normal">
                                    Back
                                </span>
                            </div>

                            <form className="gap-8 items-center flex">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#2E2F5B] text-base font-normal ">
                                        From
                                    </span>
                                    <Datepicker />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#2E2F5B] text-base font-normal ">
                                        To
                                    </span>
                                    <Datepicker />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#2E2F5B] text-base font-normal ">
                                        Branch
                                    </span>
                                    <SelectFromList />
                                </div>
                            </form>
                        </div>

                        <span className="text-[#2E2F5B] text-xl font-normal ">
                            Date; 11/12/22
                        </span>
                    </div>

                    <div className="py-3.5 px-12 justify-between items-center flex border border-[#D7D7D7]">
                        <div className="items-center flex gap-11">
                            <span className="text-[#2E2F5B] text-base font-medium me-1">
                                Report basis
                            </span>
                            <div className="inline-flex items-center gap-2">
                                <input
                                    id='accural'
                                    type="radio"
                                    name="report"
                                    className="w-4 h-4 accent-[#2E2F5B] "
                                />
                                <label htmlFor='accural' className="text-[#2E2F5B] text-base font-medium ">
                                    Accural
                                </label>
                            </div>
                            <div className="inline-flex items-center gap-2">
                                <input
                                    id='cash'
                                    type="radio"
                                    name="report"
                                    className="w-4 h-4 accent-[#2E2F5B] "
                                />
                                <label htmlFor='cash' className="text-[#2E2F5B] text-base font-medium ">
                                    Cash
                                </label>
                            </div>
                        </div>

                        <div className="cursor-pointer px-4 py-2.5 me-10 bg-white rounded-lg border border-zinc-300 justify-center items-center gap-2 inline-flex">
                            <img src="/svg/print.svg" alt="printer" />
                            <span className="text-[#2E2F5B] text-base font-medium ">
                                Print
                            </span>
                        </div>
                    </div>
                </header>

                <div className="w-4/6 bg-white mx-auto my-12 pb-12 ">
                    <h1 className="p-8 border-b border-gray-200 text-center text-[#2E2F5B] text-[30px] font-semibold leading-[52px] flex-col flex ">
                        <span className=" text-2xl font-medium ">
                            CHAPEL SECONDARY SCHOOL
                        </span>
                        INCOME STATEMENT
                        <span className=" text-xl font-medium ">
                            January 2023 through December 2023
                        </span>
                    </h1>

                    <CustomDropMenu title={"Income"} px={"6"}>
                        <CustomDropMenu subtitle={"2001. Revenue"} px={"12"}>
                            <ItemCell itemName={"2002. School fees"} amount={"0.00"} />
                            <ItemCell itemName={"2003. Hostel fees"} amount={"0.00"} />
                            <ItemCell total={"Total income"} amount={"0.00"} />
                        </CustomDropMenu>
                    </CustomDropMenu>

                    <CustomDropMenu title={"Expenses"} px={"6"}>
                        <CustomDropMenu subtitle={"3001. Administrative"} px={"12"}>
                            <ItemCell itemName={"3002. Office supplies"} amount={"0.00"} />
                            <ItemCell
                                total={"Total Administrative Expenses"}
                                amount={"0.00"}
                            />
                        </CustomDropMenu>

                        <CustomDropMenu subtitle={"4001. Energy supplies"} px={"12"}>
                            <ItemCell itemName={"4002. Petrol"} amount={"0.00"} />
                            <ItemCell itemName={"4003. Diesel"} amount={"0.00"} />
                            <ItemCell total={"Total Energy Expenses"} amount={"0.00"} />
                        </CustomDropMenu>

                        <CustomDropMenu subtitle={"5001. Payroll"} px={"12"}>
                            <ItemCell itemName={"5002. Salaries"} amount={"0.00"} />
                            <ItemCell total={"Total Payroll Expenses"} amount={"0.00"} />
                        </CustomDropMenu>

                        <CustomDropMenu subtitle={"6001. Transport expenses"} px={"12"}>
                            <ItemCell itemName={"6002. Local transport"} amount={"0.00"} />
                            <ItemCell total={"Total Payroll Expenses"} amount={"0.00"} />
                        </CustomDropMenu>

                        <ItemCell total={"Total Expenses"} amount={"0.00"} overallTotal={"yes"} />
                    </CustomDropMenu>

                    <div className="bg-gray-50 w-full ps-[38px] pe-[8em] justify-between items-center border-b border-gray-200 flex">
                        <span className="text-neutral-800 text-base font-semibold flex-1">Net Income</span>

                        <div
                            className={`w-[136px] pe-3 py-5 border-y-2 border-solid border-[#2E2F5B] font-semibold justify-end items-center inline-flex`}
                        >
                            0.00
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DashboardReport