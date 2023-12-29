import React from "react";

const StepsBtn = () => {
  return (
    <div className="flex gap-3 mt-4">
      <button
        className="py-[.5rem] px-[2.2rem] text-[#2E2F5B] rounded-lg text-[.8rem]"
        style={{
          border: "1px solid #2E2F5B",
        }}
      >
        Back
      </button>

      <button className="py-[.5rem] px-[2.2rem] bg-[#2E2F5B] text-white rounded-lg text-[.8rem]">
        Next
      </button>
    </div>
  );
};

export default StepsBtn;
