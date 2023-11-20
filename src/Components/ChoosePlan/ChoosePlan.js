import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import "./style-choose-plan.css";
import { HiDotsHorizontal  } from 'react-icons/hi';

const options = [
    { 
        id: 'trial', 
        label: 'Trial', 
        amount: 0,
        description: 'Some helpful instruction goes over here.',
        note:"* If you have an existing QuickBooks Online account, you can add / sign up for a new company using your existing sign in details. This single sign in allows you to view and manage multiple companies, including your existing account.",
        features: [
            "Track inventory",
            "Access data from all your devices",
            "Access to basic features",
            "Basic reporting and analytics",
            "Up to 5 individuals",
            "20GB individual data for each user",
            "Basic chat and email support",
          ],
    },
    { 
        id: 'basic', 
        label: 'Basic', 
        amount: 5000, 
        description: 'Some helpful instruction goes over here.',
        note:"* If you have an existing QuickBooks Online account, you can add / sign up for a new company using your existing sign in details. This single sign in allows you to view and manage multiple companies, including your existing account.",
        features: [
            "Track inventory",
            "Access data from all your devices",
            "Access to basic features",
            "Basic reporting and analytics",
            "Up to 5 individuals",
            "20GB individual data for each user",
            "Basic chat and email support",
        ],
    },
    { 
        id: 'business', 
        label: 'Business', 
        amount: 20000, 
        description: 'Some helpful instruction goes over here.',
        note:"* If you have an existing QuickBooks Online account, you can add / sign up for a new company using your existing sign in details. This single sign in allows you to view and manage multiple companies, including your existing account.",
        features: [
            "Track inventory",
            "Access data from all your devices",
            "Access to basic features",
            "Basic reporting and analytics",
            "Up to 5 individuals",
            "20GB individual data for each user",
            "Basic chat and email support",
        ],
    },
    { 
        id: 'premium', 
        label: 'Premium', 
        amount: 50000, 
        description: 'Some helpful instruction goes over here.',
        note:"* If you have an existing QuickBooks Online account, you can add / sign up for a new company using your existing sign in details. This single sign in allows you to view and manage multiple companies, including your existing account.",
        features: [
            "Track inventory",
            "Access data from all your devices",
            "Access to basic features",
            "Basic reporting and analytics",
            "Up to 5 individuals",
            "20GB individual data for each user",
            "Basic chat and email support",
        ],
    },
  ];

const ChoosePlan = ({selectedOption, setSelectedOption}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('trial');

//   useEffect(() => {
//     // console.log("selectedOption : ", selectedOption);
//     // console.log("options[selectedOption] : ", options[selectedOption]);
//   }, [selectedOption])
  
  const handleOptionChange = (id) => {
    setSelectedOption(id);
    toggleDropdown();
  };

  const getOptionById = (id) => {
    return options.find(option => option.id === id);
  };

  const toggleDropdown = () => {
    console.log("dropdownOpen : ", dropdownOpen);
    setDropdownOpen(!dropdownOpen);
  };

  const getPlanAmount = (amount) => {
    if (amount !== undefined && amount !== null) {
        return (
            amount == 0 ?
            `Free`:
            `N${amount.toLocaleString('en-US')} /month`
        )
    }    
  }

  return (
    <div className='relative'>
      <button 
        id="dropdownHelperRadioButton" 
        onClick={toggleDropdown}
        className="text-vanbook-primary w-[100%] border border-vanbook-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 inline-flex text-left items-center justify-between" 
        type="button"
      >
        <div>
            <div>{getOptionById(selectedOption)?.label}</div>
            <div className='text-[1.4rem] mt-1 font-bold'>{getPlanAmount(getOptionById(selectedOption)?.amount)}</div>
        </div>
        <HiDotsHorizontal size={20}/>
      </button>

      {dropdownOpen ? 
        <div 
          className="z-10 w-full rounded-lg"           
          style={{ inset: 'auto auto 0px 0px', margin: '0px',}}>
          <ul className="p-3 space-y-1 text-sm text-vanbook-primary" aria-labelledby="dropdownHelperRadioButton">
            {options.map((option) => (
              <li key={option.id}>
                <div 
                  className={`flex  hover:bg-100 cursor-pointer border-b border-vanbook-300 border-solid`}
                  onClick={() => handleOptionChange(option.id)}
                >
                  <div className="flex items-center justify-between w-full py-3">
                    
                    <div className="ms-2 text-sm">
                        <label htmlFor={option.id} className="font-medium text-vanbook-primary">
                            <div>{option.label}</div>
                            <p id={`helper-radio-text-${option.id}`} className="text-sm text-vanbook-primary font-normal ">{getPlanAmount(option.amount)}</p>
                        {/* <div>{getPlanAmount(option.amount)}</div> */}
                        </label>
                    </div>

                    <div>
                        <div
                        className={`
                        w-6 h-6 border  rounded-[50%] ${selectedOption === option.id ? 'border-vanbook-500 border-[7px]':'border-vanbook-300'}
                        `}>
                        </div>
                    </div>
                  </div>                
                </div> 
              </li>
              
            ))}
          </ul>
        </div>
        :
        <div className='mx-5'>
            <p className='mt-4 text-[.9rem]'>{getOptionById(selectedOption)?.description}</p>
            <ul className='mt-4 list-disc ml-4 text-[.9rem]'>
                {getOptionById(selectedOption)?.features.map((feature, index) => (
                  <li key={index} className="">
                    <span className="">
                      {feature}
                    </span>
                  </li>
                ))}
            </ul>

            <p className='mt-4 text-[.9rem]'>Note: {getOptionById(selectedOption)?.note}</p>
        </div>}
    </div>
  );
};

export default ChoosePlan;