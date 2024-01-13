import React, { useState } from 'react'


const SelectFromList = () => {
    const [isActive, setIsActive] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    const [expanded, setExpanded] = useState(false)

    const toogleSelectDropdown = () => {
        if (isActive === "") {
            setIsActive("active")
            setExpanded(true)
        } else {
            setIsActive("")
            setExpanded(false)
        }
    }

    const handleOptionClick = (e) => {
        const value = e.children[1].innerHTML
        setSelectedValue(value)
        setIsActive("")
        setExpanded(false)
    }



    return (
        <div className={`select_container ${isActive} relative`}>
            <label
                htmlFor="" className='w-[14.875rem] block relative'>
                <input
                    onClick={toogleSelectDropdown}
                    type="text"
                    value={selectedValue}
                    readOnly
                    placeholder='Select from the list'
                    className='w-full p-[.625rem] bg-white rounded-[.5rem] border border-solid border-[#EAECF0]  text-[#C4C4C4] focus:border-none outline-none cursor-pointer'
                    role="combobox"
                    aria-labelledby="select button"
                    aria-haspopup="listbox"
                    aria-expanded={expanded}
                    aria-controls="select-dropdown"

                />
                <img
                    className='absolute right-2 top-2 arrow'
                    src="/svg/dropdown.svg"
                    alt="icon" />
            </label>

            <ul role="listbox" id="select_dropdown" className=' rounded-[.5rem] absolute max-h-[200px] overflow-y-auto border border-solid border-[#EAECF0] w-full bg-white mt-2 '>
                <li onClick={(e) => { handleOptionClick(e.currentTarget) }} role="option" className='focus:bg-gray-400 p-[.625rem] rounded-[.5rem] hover:bg-[#eaecf0] '>
                    <input type="radio" id="instagram" name="social-account" />
                    <label htmlFor="instagram">Instagram</label>
                </li>
                <li onClick={(e) => { handleOptionClick(e.currentTarget) }} role="option" className='focus:bg-gray-400 p-[.625rem] rounded-[.5rem] hover:bg-[#eaecf0] '>
                    <input type="radio" id="facebook" name="social-account" />
                    <label htmlFor="facebook">Facebook</label>
                </li>
                <li onClick={(e) => { handleOptionClick(e.currentTarget) }} role="option" className='focus:bg-gray-400 p-[.625rem] rounded-[.5rem] hover:bg-[#eaecf0] '>
                    <input type="radio" id="twitter" name="social-account" />
                    <label htmlFor="twitter">Twitter</label>
                </li>
                <li onClick={(e) => { handleOptionClick(e.currentTarget) }} role="option" className='focus:bg-gray-400 p-[.625rem] rounded-[.5rem] hover:bg-[#eaecf0] '>
                    <input type="radio" id="snapchat" name="social-account" />
                    <label htmlFor="snapchat">Snapchat</label>
                </li>
            </ul>

        </div>
    )
}

export default SelectFromList