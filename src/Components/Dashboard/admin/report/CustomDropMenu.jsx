import React, { useState } from "react";



 const CustomDropMenu = ({ children, px, title, subtitle }) => {
    const [showContent, setShowContent] = useState("");
    const [rotateArrow, setRotateArrow] = useState("");
    const toogleShowContent = () => {
        if (showContent === "") {
            setShowContent("hidden");
            setRotateArrow("rotate-180");
        } else {
            setShowContent("");
            setRotateArrow("");
        }
    };

    return (
        <div className="">
            <div
                onClick={toogleShowContent}
                className={`w-full px-${px} py-4 bg-gray-50 border-b border-gray-200 items-center gap-2 inline-flex`}
            >
                <img
                    src="/svg/dropdown.svg"
                    alt="arrow down"
                    className={`transform ${rotateArrow}`}
                />
                <span className=" text-neutral-800 text-base font-semibold ">
                    {title}
                </span>
                <span className="text-neutral-800 text-sm font-normal ">
                    {subtitle}
                </span>
            </div>
            <div className={`${showContent}`}>{children}</div>
        </div>
    );
};

export default CustomDropMenu