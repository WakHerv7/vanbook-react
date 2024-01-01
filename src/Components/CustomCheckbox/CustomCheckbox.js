
import React, { useRef, useState, useEffect } from 'react';
import styles from './style.css';


const CustomCheckbox = (props) => {
    const {
        ref, name, value, label, title, onChange, size, className, index
    } = props;

    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {    
        if (value !== undefined) {
            setIsChecked(value);
        }
     }, [value]);
     
    const handleChange = () => {
        if (onChange) {
            onChange({
                key:index,
                target: {
                    name: name, 
                    value: !isChecked,
                }
            });
        }
        setIsChecked(!isChecked);
    };

    return (
        <div ref={ref} className={className}>
            <label htmlFor={name} title={title} className={`checkboxContainer ${size=="md"? 'md':'sm'} text-[.9rem]`}>
                {label}
                <input type="checkbox" name={name} id={name} checked={isChecked}
                onChange={handleChange}/>
                <span className={`customCheckmark ${size=="md"? 'md':'sm'}`}></span>
            </label>
        </div>
    )
}
export default CustomCheckbox