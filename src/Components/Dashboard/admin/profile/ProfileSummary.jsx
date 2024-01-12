import React from 'react'
import DetailListItem from '../../../../Components/Dashboard/admin/profile/DetailListItem'



const ProfileSummary = () => {
    return (
        <article className="bg-white rounded-[.625rem] myshadow pb-5 relative w-[13.875rem] ">
            <img src="/Michelle.jpg" alt="micheal" className='w-full rounded-[.625rem]'  />
            <div className="absolute top-0 right-0 p-[4.5px] bg-white rounded-full">
                <img src="/Pencil.png" alt="pencil" className="object-contain" />
            </div>
            <h4 className="text-[#151515] text-base font-medium leading-tight ps-4 pb-2 pt-4">
                Anatasia Brooklin
            </h4>
            <div className="flex-col gap-2.5 flex px-3 ">
                <DetailListItem title={"I.D"} detail={"0056NZ98"} />
                <DetailListItem title={"Date of resumption"} detail={"18/02/2012"} />
                <DetailListItem title={" Department"} detail={"Language"} />
                <DetailListItem title={"Role"} detail={"English Teacher"} />
                <DetailListItem title={"Salary"} detail={"₦250,000"} />
                <DetailListItem title={"Status"} detail={"Full-time"} />
            </div>
        </article>
    );
};

export default ProfileSummary