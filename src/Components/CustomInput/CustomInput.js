import React, {useState, useEffect} from 'react';
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import CustomDropdownSelect from '../CustomDropdownSelect/CustomDropdownSelect';
import CustomDropdownPeriod from '../CustomDropdownPeriod/CustomDropdownPeriod';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";


function CustomInput(props) {
    const { onekey=0, id=0, attr='', type, label, labelPosition, title, name, value, placeholder, onChange, options, className, country, region, note, required, err, inputRef, optionValues, optionLabels } = props;
    const [error, setError] = useState();
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        // console.log("onekey :", onekey);
          onChange({
            key:onekey,
            attr:attr,
            target: {
                name: e.target.name, 
                value: e.target.value,
                required: required
            } 
        });
      };

    useEffect(() => {
      if (err) { 
        if (err[name] === `${name} is required`) {
          const inputLabel = name === "password" ? "Password":label;
          setError(`${inputLabel} is required`);
        } else if (err[name]) {
          setError(err[name])
        } else if (err[attr]) {
          setError(err[attr])
        } else {
          setError()
        }
      } else {
        setError()
      }
    }, [err])
    

  return (
    <div key={id} className={`${className} ${labelPosition == 'side'? 'flex gap-4 items-center':''}`}>
      {type === 'checkbox' ?
        <></>
        :
        <label className='text-[.9rem] whitespace-nowrap' htmlFor={name}>{label}</label>
      }
      <div className='flex flex-col'>
      {type === 'select' ? 
        <select
        className={"w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem] border border-vanbook-100 "}
        ref={inputRef}
        name={name} 
        value={value} 
        onChange={handleChange}>
            <option value="">{placeholder}...</option>
            {optionValues ?
            options.map((option, index) => (
              <option key={index} value={optionValues[index]}>{optionLabels[index]}</option>
            ))
            :
            options.map((option, index) => (
                <option key={index} value={option.value}>
                  {`${option.label} `}
                  {option.description ? <i className='italic text-[10px]'>({option.description})</i>:<></>}
                </option>
            ))}
        </select>
      
      : type ==='phone' ?
        <PhoneInput
        className='w-full h-[2.5rem] border border-vanbook-100  outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
        value={value}
        onChange={(val)=>handleChange({ target: { name: name, value: val } })}
        defaultCountry="NG"
        />
      : type ==='country' ?
        <CountryDropdown
          classes='w-full h-[2.5rem] border border-vanbook-100  outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
          value={country}
          onChange={(val)=>handleChange({ target: { name: name, value: val } })}
        />
        
      : type ==='region' ?
        <RegionDropdown
        classes='w-full h-[2.5rem] border border-vanbook-100  outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
        country={country}
        value={region}
        onChange={(val)=>handleChange({ target: { name: name, value: val } })}
        />
      :
        type === 'cselect' ?
        <CustomDropdownSelect
        className='w-full h-[2.5rem] border border-vanbook-100  outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
        ref={inputRef}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        />
      :
        type === 'cperiod' ?
        <CustomDropdownPeriod
        className='w-full h-[2.5rem] border border-vanbook-100  outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
        ref={inputRef}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        />
      : type === 'checkbox' ?
        <CustomCheckbox
        className='w-full'
        ref={inputRef}
        name={name}
        value={value}
        label={label}
        title={title}
        onChange={handleChange}
        />
        // <label htmlFor={name} className="checkboxContainer">
        //     {label}
        //     <input type="radio" name={name} id={name} checked={checked} value={value}
        //     onChange={handleChange}/>
        //     <span className="customCheckmark"></span>
        // </label>
      :
        <div className='relative'>
        <input 
        type={name === "password" || name === "confirm_password" ? showPassword ? "text" : "password" : type}
        ref={inputRef}
        name={name} 
        value={value !== undefined ? value : null}
        placeholder={placeholder} 
        onChange={handleChange}
        className={"w-full h-[2.5rem] border border-vanbook-100  outline-none pl-4 rounded-lg mt-1 text-[.9rem]"}
        />
        <div className='absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer' 
        onClick={togglePasswordVisibility}>
            {name === "password" || name === "confirm_password"?
                !showPassword ?
                <HiOutlineEye/>
                :
                <HiOutlineEyeOff/>
            :<></>}
        </div>
        </div>
      }
      {error ? 
        <div className='text-red-500 text-xs'>{error}</div>
        :
        <div className='text-sm'>{note}</div>
      }
      </div>

      
    </div>
  );
}

export default CustomInput;