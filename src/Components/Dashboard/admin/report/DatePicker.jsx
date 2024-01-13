import React, { forwardRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Datepicker = () => {
    const [startDate, setStartDate] = useState(new Date());
   


    return (
        <DatePicker 
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            closeOnScroll={(e) => e.target === document}
            customInput={<ExampleCustomInput />}
            placeholderText="Choose date" 
            
            />
    )
}


export default Datepicker

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    
    <div 
        className="w-[9.8125rem] p-[.625rem] flex items-center gap-6 border border-solid border-[#EAECF0] rounded-[.5rem] bg-white font-['DM_Sans'] " 
        onClick={onClick} 
        ref={ref}>
            {value}
      <img 
        src="/svg/calendar.png" 
        alt="calendar icon"
        className='relative -right-2'
         />
    </div>
  ));
  ExampleCustomInput.displayName = 'ExampleCustomInput'


