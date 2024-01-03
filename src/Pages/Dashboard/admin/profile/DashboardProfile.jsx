import SideBar from '../../../../Components/Dashboard/admin/SideBar'
import ProfileSummary from '../../../../Components/Dashboard/admin/profile/ProfileSummary'
import PersonalDetails from '../../../../Components/Dashboard/admin/profile/PersonalDetails'
import ContactDetails from '../../../../Components/Dashboard/admin/profile/ContactDetails'
import Header from '../../../../Components/Dashboard/Header'


const DashboardProfile = () => {
    
    return (
        <main className="min-w-screen min-h-screen flex bg-gray-300">
            <SideBar />

            <section className="pb-6 flex-1 ">
                <Header />
                <header className="py-3.5 px-12 justify-between items-center flex border border-zinc-400">
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

                <div className="px-12 pt-[30px]">
                    <h2 className="text-neutral-800 text-2xl font-normal leading-loose">
                        Employee details
                    </h2>

                    <div className="flex gap-12">
                        <ProfileSummary />
                        <div className="flex-1 flex-col gap-6 flex">
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