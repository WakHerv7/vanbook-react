import React from 'react'
import DetailListItem from '../../../../Components/Dashboard/admin/profile/DetailListItem'


 const PersonalDetails = () => {
    
    return (
        <section className="personal_details px-6 py-4 bg-white rounded-[.625rem] myshadow flex-col gap-4 flex">
            <div className="items-center justify-between flex">
                <h3 className="text-[#2E2F5B] text-2xl font-normal leading-7">
                    Personal details
                </h3>
                <img src="/Pencil.png" alt="pencil" className="w-6 h-6" />
            </div>
            <div className="flex gap-11">
                <div className="flex-1">
                    <DetailListItem
                        title={"First name"}
                        detail={"Anatasia"}
                        padding={"pl-4 py-2"}
                    />
                </div>
                <div className="flex-1">
                    <DetailListItem
                        title={"Middle name"}
                        detail={"Olanike"}
                        padding={"pl-4 py-2"}
                    />
                </div>
            </div>

            <DetailListItem
                title={"Last name"}
                detail={"Broklin"}
                padding={"pl-4 py-2"}
            />
            <DetailListItem
                title={"Gender"}
                detail={"Female"}
                padding={"pl-4 py-2"}
            />
            <DetailListItem
                title={"Date of birth"}
                detail={"28/03/1995"}
                padding={"pl-4 py-2"}
            />
        </section>
    );
};

export default PersonalDetails