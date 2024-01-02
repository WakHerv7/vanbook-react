

 
 const DetailListItem = ({ title, detail, padding }) => {
    return (
        <div
            className={`${padding ? padding : "p-1"
                } bg-stone-50 rounded-[5px] inline-flex w-full`}
        >
            <div>
                <span className="text-black text-xs font-normal leading-tight">
                    {title}
                    <br />
                </span>
                <span className="text-black text-base font-medium leading-tight">
                    {detail}
                </span>
            </div>
        </div>
    );
};

export default DetailListItem