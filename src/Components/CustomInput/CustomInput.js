import React, {useState, useEffect} from 'react';
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
function CustomInput(props) {
    const { type, label, name, value, placeholder, onChange, options, className, country, region, note, required, err, inputRef } = props;
    const [error, setError] = useState();
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
          onChange({ 
            target: { 
                name: e.target.name, 
                value: e.target.value,
                required: required
            } 
        });
      };

    useEffect(() => {
      if (err[name] === `${name} is required`) {
        const inputLabel = name === "password" ? "Password":label;
        console.log(`${inputLabel} is required`);
        setError(`${inputLabel} is required`);
      } else if (err[name]) {
        setError(err[name])
      } else {
        setError('')
      }
    }, [err])
    

  return (
    <div className={`${className}`}>
      <label className='text-[.9rem]' htmlFor={name}>{label}</label>
      {type === 'select' ? 
        <select
        className={"w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem] border border-vanbook-100 "}
        ref={inputRef}
        name={name} 
        value={value} 
        onChange={handleChange}>
            <option value="">Select...</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
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
        onChange={(val)=>onChange({ target: { name: name, value: val } })}
        />
      :
        <div className='relative'>
        <input 
        type={name === "password" || name === "confirm_password" ? showPassword ? "text" : "password" : type}
        ref={inputRef}
        name={name} 
        defaultValue={value} 
        placeholder={placeholder} 
        onChange={onChange}
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
  );
}

export default CustomInput;