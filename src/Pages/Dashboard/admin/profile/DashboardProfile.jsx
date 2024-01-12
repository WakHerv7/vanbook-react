import React from 'react'

import SideBar from '../../../../Components/Dashboard/admin/SideBar'
import ProfileSummary from '../../../../Components/Dashboard/admin/profile/ProfileSummary'
import PersonalDetails from '../../../../Components/Dashboard/admin/profile/PersonalDetails'
import ContactDetails from '../../../../Components/Dashboard/admin/profile/ContactDetails'
import ProfileHeader from '../../../../Components/Dashboard/admin/profile/ProfileHeader'


const DashboardProfile = () => {
    
    return (
        <main className="min-w-screen min-h-screen flex bg-[#f9f9f9] font-['DM_Sans']">
            <SideBar height={'100%'} />

            <section className="pb-[3.87rem] flex-1 ">
                <ProfileHeader />
                <header className="py-3.5 px-12 bg-[#f9fafb] text-[#2E2F5B] justify-between items-center flex border border-[#d7d7d7]">
                    <div className="py-2.5 gap-2 items-center flex">
                        <img
                            src="/svg/dropdown.svg"
                            alt="dropdown"
                            className="transform rotate-90"
                        />
                        <span className="text-slate-700 text-base font-normal">Back</span>
                    </div>

                    <span className="text-slate-700 text-xl font-normal ">
                        Date; 11/12/22
                    </span>
                </header>

                <div className="px-12 ">
                    <h2 className="text-[#242424] text-2xl font-normal border-b border-[#d7d7d7] pt-7 pb-4 mb-6">
                        Employee details
                    </h2>

                    <div className="flex gap-6 flex-wrap">
                        <ProfileSummary />
                        <div className="flex-1 flex-col gap-6 flex flex-wrap">
                            <PersonalDetails />
                            <ContactDetails />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DashboardProfile