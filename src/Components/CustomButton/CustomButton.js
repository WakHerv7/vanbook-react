
import React, { useRef, useState, useEffect } from 'react';

const style = {
    outlinedBtn: "py-2 px-2 text-vanbook-primary text-[.9rem] rounded-lg border border-vanbook-primary",
    outlinedBtnDisabled: "py-2 px-2 text-slate-700 text-[.9rem] rounded-lg border border-slate-700 disabled:opacity-25",

    filledBtn:'py-2 px-2 bg-vanbook-primary text-white rounded-lg text-[.9rem]',    
    filledBtnDisabled: `py-2 px-2 bg-slate-700 text-white rounded-lg text-[.9rem] disabled:opacity-25`,
    flex:'flex items-center justify-between gap-2',
  };
const CustomButton = (props) => {
    const {
        ref, name, label, title, onClick, size, disabled, outlined
    } = props;

    const handleClick = () => {
        if (disabled) {
            return;
        } else {
            onClick();
        }
    }

    const outlinedBtn = <button
    title={title}
    onClick={handleClick}
    className={`${style.flex} ${!disabled ? style.outlinedBtn : style.outlinedBtnDisabled}`}
    disabled={disabled}
    >
    {label}
    </button>

    const filledBtn = <button
    title={title}
    onClick={handleClick}
    className={`${style.flex} ${!disabled ? style.filledBtn : style.filledBtnDisabled}`}
    disabled={disabled}
    >
    {label}
    </button>


    return (
        outlined ? outlinedBtn : filledBtn
        
    )
}

export default CustomButton