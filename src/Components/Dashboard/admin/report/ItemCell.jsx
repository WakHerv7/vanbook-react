


 const ItemCell = ({ total, itemName, amount, overallTotal }) => {
    return (
        <div className="bg-white w-full ps-[12.5em] pe-[8em] justify-between items-center border-b border-gray-200 flex">
            {itemName && (
                <span className="text-neutral-800 text-sm font-normal  py-5">
                    {itemName}
                </span>
            )}
            {total && (
                <span className="text-neutral-900 text-sm font-semibold  py-5">
                    {total}
                </span>
            )}

            <div
                className={`w-[136px] pe-3 py-5 ${total
                    ? `${overallTotal ? "border-y-[3px]" : "border-y-2"} border-solid border-[#2E2F5B] font-semibold`
                    : ""
                    } justify-end items-center inline-flex`}
            >
                {amount}
            </div>
        </div>
    );
};

export default ItemCell;