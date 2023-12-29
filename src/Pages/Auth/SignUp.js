import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../Assets/Tech64-logo.svg";
import GoogleAuth from '../../Components/GoogleAuth';
import ChoosePlan from '../../Components/ChoosePlan/ChoosePlan';
import PhoneInput from 'react-phone-number-input';
import CustomInput from '../../Components/CustomInput/CustomInput';
import 'react-phone-number-input/style.css';
import { current } from '@reduxjs/toolkit';
import zxcvbn from 'zxcvbn';    // Password Strength checker
import { ToastContainer } from 'react-toastify';   // Notification
import notify from '../../Components/Notify/Notify';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../Api/Auth/authApiSlice';

const currentlyUseOptions = [
  {
    value: 'excel',
    label:'Excel',
  },
  {
    value: 'manual',
    label:'Manual',
  },
  {
    value: 'quickbooks',
    label:'Quickbooks',
  },
  {
    value: 'sage',
    label:'Sage',
  },
  {
    value: 'outsourced',
    label:'Outsourced to my accountant',
  },
  {
    value: 'turbocash',
    label:'Turbocash',
  },
  {
    value: 'pastel',
    label:'Pastel',
  },
  {
    value: 'none',
    label:'No accounting application',
  },
];

const yearsInBusinessOptions = [
  {
    value: 'more',
    label:'More than 4 years',
  },
  {
    value: '4',
    label:'4th year',
  },
  {
    value: '3',
    label:'3rd year',
  },
  {
    value: '2',
    label:'2nd year',
  },
  {
    value: '1',
    label:'This is my 1st year',
  },
]
const initFormData = {
  'company_name': {value:'', required:true},
  'first_name': {value:'', required:true},
  'last_name': {value:'', required:true},
  'phone_number': {value:'', required:true},
  'email': {value:'', required:true},
  'password': {value:'', required:true},
  'confirm_password': {value:'', required:true},
  // 'country': {value:'', required:true},
  // 'region': {value:'', required:true},
  // 'currently_use': {value:'', required:true},
  // 'years_in_business': {value:'', required:true},
  'referral_code': {value:'', required:false},
  'payment_plan': {value:'', required:true},
}
const SignUp = () => {
  const [paymentPlan, setPaymentPlan] = useState('trial');
  const [formData, setFormData] = useState(initFormData);
  const [formErrors, setFormErrors] = useState({});
  const [score, setScore] = useState(0);
  const [errMsg, setErrMsg] = useState('')
  const userRef = useRef()
  const errRef = useRef()  
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()

  useEffect(() => {
      setFormData({ ...formData, ['payment_plan']: {value:'trial', required:true} });
      userRef.current.focus()
  }, [])
  

  const handlePaymentPlan = (plan) => {
    setPaymentPlan(plan);
    setFormData({ ...formData, ['payment_plan']: {value:plan, required:true} });
  };

  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    setScore(result.score);
  };

  function PasswordStrengthIndicator() {
    const getDotColor = (index) => {
      if (index <= score) {
        if(score < 2) {
          return 'bg-red-500'
        } else if(score < 3) {
          return 'bg-orange-500'
        } else {
          return 'bg-green-500'
        }
        // return 'bg-green-500'; // On color
      } else {
        return 'bg-gray-100'; // Off color
      }
    };
    const getTextColor = () => {
      if(score < 2) {
        return 'text-red-500'
      } else if(score < 3) {
        return 'text-orange-500'
      } else {
        return 'text-green-500'
      }
    };
  
    return (
      <div className='flex gap-4 items-center'>
        Password

        {formData['password'].value ?
      <div className='flex gap-2 items-center'>
      
      <div className="flex items-center space-x-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${getDotColor(index)}`}
          ></div>
        ))}
      </div>
      <div className={`text-xs ${getTextColor}`}>
      {
        score < 2 ?
           'Weak'
        : score < 3 ?
           'Moderate'
          :
           'Strong'
      }
      </div>
      
      </div>
      :
      <></>  
      }
      
      </div>
    );
  };

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let required = e.target.required;

    if (name === 'email') {
      // console.log('email', e.target.value);
      validateEmail(e.target.value);
    }
    setFormData({ ...formData, [name]: {value:value, required:required} });
  };

  const validateEmail = (email) => {
    // const email = e.target.value
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const testResult = re.test(String(email).toLowerCase());
    
    let errors = { ...formErrors };
    if (!testResult) {
      errors['email'] = 'Insert a valid email.';
    } else {
      delete errors['email'];
    }
    setFormErrors(errors);
  }

  const handlePasswordChange = (e) => {
    const name = e.target.name;
    let password;
    let confirmPassword;
    if (name === "password") {
      password = e.target.value;
      confirmPassword = formData['confirm_password'].value;
    } else if (name === "confirm_password") {
      confirmPassword = e.target.value;
      password = formData['password'].value;
    }
    
    let errors = { ...formErrors };
    if (password.length < 8) {
      errors['password'] = 'Password must be at least 8 characters long';
    } else if (password.length > 8){
      delete errors['password'];
    }
    if (confirmPassword && password !== confirmPassword) {
      errors['confirm_password'] = 'Passwords do not match';
    } else if (confirmPassword && password === confirmPassword) {
      delete errors['confirm_password'];
    }

    console.log(checkPasswordStrength(password));
  
    setFormData({ ...formData, [e.target.name]: {value:e.target.value, required:e.target.required} });
    setFormErrors(errors);
  };

  const validateForm = () => {
    let errors = {};
    for (let key in formData) {
      if (formData[key].required && !formData[key].value) {
        errors[key] = `${key} is required`;
      } else {
        if (key === "password" && formErrors["password"]) {
          errors["password"] = formErrors["password"];
        } else if(key === "confirm_password" && formErrors["confirm_password"]) {
          errors["confirm_password"] = formErrors["confirm_password"];
        } 
      }
    }

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      setFormErrors(errors);
      notify("error", "Invalid entries");
      return false;
    }
    return true;
  }
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if(!validateForm()) {
      return;
    }

    let toSubmit = {
      'company_name': formData['company_name'].value,
      'firstname': formData['first_name'].value,
      'lastname': formData['last_name'].value,
      'phone': formData['phone_number'].value,
      'email': formData['email'].value,
      'password': formData['password'].value,
      // 'confirm_password': formData['confirm_password'].value,
      'referral_code': formData['referral_code'].value,
      'payment_plan': formData['payment_plan'].value,
    }

    // console.log("toSubmit :", toSubmit)
    
    try {
      // console.log("toSubmit :", toSubmit)

      const userData = await register(toSubmit).unwrap()
      // console.log("response :", userData)
      navigate('/login')
    } catch (err) {
      if (!err?.status) {
          // isLoading: true until timeout occurs
          setErrMsg('No Server Response');
      } else if (err.status === 400) {
          setErrMsg('Some informations are incorrect');
      } else if (err.status === 401) {
          setErrMsg('Unauthorized');
      } else if (err.status === 409) {
          setErrMsg('This email is already registered');
          notify("error", "This email is already registered");
      } else {
          setErrMsg('Something went wrong!');
          notify("error", "Something went wrong!");
      }
      // errRef.current.focus();
    }
      // console.log("submit the form");
  }

  return (
    <section>
      <nav className='h-[70px] flex items-center pl-12'>
        <img src={logo} width="130px" alt="" />
      </nav>


      <div className='w-[65%] border mx-auto flex my-8 mb-[100px] rounded'>

        {/*====== Left-Side ========*/}
        <div className='flex-1 p-8 bg-white'>
          <form >
            <div className='w-[80%]'>
              <div className='flex flex-col'>
                <span className='text-[1.15rem] font-semibold text-[#2C2C2C]'>Sign up for Vanbook account</span>
                <span className='text-[.75rem] text-[#2C2C2C] mt-2 mb-[-0.5rem] font-light'>
                  Already have an account?
                  <Link
                    to="/login"
                    className='text-vanbook-primary font-semibold ml-1'
                  >
                    Sign in
                  </Link>
                </span>
              </div>

              {/* <GoogleAuth /> */}

              {/* <div className='my-4 flex items-center justify-between'>
                <span className='w-[45%] h-[1px] bg-[#D7D7D7]'></span>
                <span>or</span>
                <span className='w-[45%] h-[1px] bg-[#D7D7D7]'></span>
              </div> */}

              <div className='my-4 w-full h-[1px] bg-vanbook-100'></div>

              <div className='flex flex-col gap-4'>
                <CustomInput 
                type="text" 
                label="School Name" 
                name="company_name" 
                value={formData['company_name'].value} 
                onChange={handleInputChange}
                err={formErrors}
                required={formData['company_name'].required}
                inputRef={userRef}
                />
                <CustomInput 
                type="text" 
                label="First Name" 
                name="first_name" 
                value={formData['first_name'].value} 
                onChange={handleInputChange} 
                required={formData['first_name'].required}                
                err={formErrors}
                />
                <CustomInput 
                type="text" 
                label="Last Name" 
                name="last_name" 
                value={formData['last_name'].value} 
                onChange={handleInputChange} 
                required={formData['last_name'].required}
                err={formErrors}                
                />
                <CustomInput 
                type="phone" 
                label="Phone number" 
                name="phone_number" 
                value={formData['phone_number'].value} 
                onChange={handleInputChange} 
                required={formData['phone_number'].required}
                err={formErrors}                
                />
                <CustomInput 
                type="email" 
                label="Email" 
                name="email" 
                value={formData['email'].value} 
                onChange={handleInputChange} 
                required={formData['email'].required}
                err={formErrors}                
                />
                <CustomInput 
                type={"password"}
                label={<PasswordStrengthIndicator/>} 
                name="password"
                note="Minimum of 8 characters"
                value={formData['password'].value} 
                onChange={handlePasswordChange} 
                required={formData['password'].required}
                err={formErrors}                
                />
                <CustomInput 
                type="password" 
                label="Confirm password" 
                name="confirm_password" 
                value={formData['confirm_password'].value} 
                onChange={handlePasswordChange} 
                required={formData['confirm_password'].required}
                err={formErrors}                
                />
                {/* <CustomInput 
                type="country" 
                label="Country" 
                name="country" 
                country={formData['country'].value} 
                onChange={handleInputChange} 
                required={formData['country'].required}
                err={formErrors}                
                />
                <CustomInput 
                type="region" 
                label="Region" 
                name="region"
                country={formData['country'].value} 
                region={formData['region'].value} 
                onChange={handleInputChange} 
                required={formData['region'].required}
                err={formErrors}                
                />
                +
                <CustomInput 
                type="select" 
                label="Years In Business" 
                name="years_in_business" 
                value={formData['years_in_business'].value} 
                onChange={handleInputChange}
                required={formData['years_in_business'].required}
                err={formErrors}                
                options={yearsInBusinessOptions}
                /> */}
                <CustomInput 
                type="text" 
                label="Referral Code (optional)" 
                name="referral_code" 
                value={formData['referral_code'].value} 
                onChange={handleInputChange} 
                required={formData['referral_code'].required}
                err={formErrors}                
                />
                <button
                type='submit'
                onClick={handleSubmit}
                className='w-full h-[2.5rem] bg-[#41436a] rounded-lg text-white text-[.9rem]'
              >
                Create account
              </button>           
              </div>

              

              <p className='text-[.6rem] my-4 text-[#151515]'>By selecting create account or sign up google, you agree with our terms and have read our and acknowledged our Global privacy statement.</p>

            </div>
          </form>
        </div>

        {/*====== Right-Side ========*/}
        <div className='flex-1 bg-[#FAF0CA] p-8 text-vanbook-primary'>
          <div className='pt-[4rem]'>
            <h2 className='text-[2rem] mb-4 font-semibold'>Your Vanbook Online Plan</h2>
            <ChoosePlan
            selectedOption={paymentPlan}
            setSelectedOption={setPaymentPlan}/>            
          </div>

        </div>
      </div>
      
      <footer className='w-full bg-[#2e2f5b] h-fit text-white'>
        <div className='h-full py-3 flex flex-col items-center justify-center text-xs'>
          <h3 className='text-sm'>Tech 64 Africa</h3>
          <span className='text-xs'><Link className='text-xs' to="/">Support</Link> | <Link className='text-xs' to="/">Privacy</Link></span>
          <span className='text-xs'>Copyright 2023 Tech 64 Inc. All rights reserved.</span>
        </div>
      </footer>

      {/* <ToastContainer/> */}

    </section>
  )
}

export default SignUp