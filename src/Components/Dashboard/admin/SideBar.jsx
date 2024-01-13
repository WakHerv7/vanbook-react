import React, { useState } from "react";
import NavItem from "./NavItem";


const SideBar = ({ height }) => {
    const [isVisible, setIsVisible] = useState("hidden");
    const [rotate, setRotate] = useState("rotate-180");

    const toogleSidebar = () => {
        if (isVisible === "hidden") {
            setRotate("");
            setIsVisible("");
        } else {
            setRotate("rotate-180");
            setIsVisible("hidden");
        }
    };

    return (
        <section style={{minHeight: height}} className={`sidebar bg-[#2E2F5B] px-6 py-10 flex-col justify-between flex `}>
            <div>
                <header className="pb-6">
                    <div className="w-[50px] h-[50px] mb-4 bg-violet-900 rounded-full justify-center items-center flex">
                        <h1 className="text-stone-50 text-xl font-medium">VB</h1>
                    </div>
                    <div
                        onClick={toogleSidebar}
                        className={`w-[34px] cursor-pointer h-[34px] ms-2.5 p-[5px] rounded-[44px] border border-stone-50 justify-center items-center gap-2.5 inline-flex transform ${rotate}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="#F8F8F8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </header>
                <main className="pb-[178px]">
                    <nav className="flex-col gap-2 flex">
                        <NavItem
                            img={"/svg/overview.svg"}
                            isVisible={isVisible}
                            text={"Overview"}
                        />
                        <NavItem
                            img={"/svg/graph.svg"}
                            isVisible={isVisible}
                            text={"Business overview"}
                        />
                        <NavItem
                            img={"/svg/users.svg"}
                            isVisible={isVisible}
                            text={"Employee"}
                        />
                        <NavItem
                            img={"/svg/bar-graph.svg"}
                            isVisible={isVisible}
                            text={"Budget"}
                        />
                        <NavItem
                            img={"/svg/coins.svg"}
                            isVisible={isVisible}
                            text={"Report"}
                        />
                        <NavItem img={"/svg/tax.svg"} isVisible={isVisible} text={"Taxes"} />
                        <NavItem
                            img={"/svg/calendar.svg"}
                            isVisible={isVisible}
                            text={"Schedule"}
                        />
                    </nav>
                </main>
            </div>
            <footer>
                <nav className="flex-col gap-2 flex">
                    <NavItem
                        img={"/svg/feedback.svg"}
                        isVisible={isVisible}
                        text={"Feedback"}
                    />
                    <NavItem
                        img={"/svg/settings.svg"}
                        isVisible={isVisible}
                        text={"Settings"}
                    />
                    <NavItem
                        img={"/svg/logout.svg"}
                        isVisible={isVisible}
                        text={"Log out"}
                    />
                </nav>
            </footer>
        </section>
    );
};

export default SideBar