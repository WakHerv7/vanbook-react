import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from '../../Components/GoogleAuth'
import logo from "../../Assets/Tech64-logo.svg";
import CustomInput from '../../Components/CustomInput/CustomInput';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../Api/Auth/authSlice';
import { useLoginMutation } from '../../Api/Auth/authApiSlice';
import notify from '../../Components/Notify/Notify';
import { ToastContainer } from 'react-toastify';
import {jwtDecode} from "jwt-decode";

const initFormData = {
  'email': {value:'', required:true},
  'password': {value:'', required:true},
}

const Login = () => {
  const [formData, setFormData] = useState(initFormData);
  const [formErrors, setFormErrors] = useState({});
  // const emailRef = useRef()
  // const errRef = useRef()
  // const [email, setEmail] = useState('')
  // const [pwd, setPwd] = useState('')
  // const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  // useEffect(() => {
  //     emailRef.current.focus()
  // }, [])

  // useEffect(() => {
  //     setErrMsg('')
  // }, [email, pwd])


  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let required = e.target.required;

    if (name === 'email') {
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

  const validateForm = () => {
    let errors = {};
    for (let key in formData) {
      if (formData[key].required && !formData[key].value) {
        errors[key] = `${key} is required`;
      } else {
        if (key === "email" && formErrors["email"]) {
          errors["email"] = formErrors["email"];
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      notify("error", "Invalid entries");
      return false;
    }

    return true
  }

  const stageRoute = {
    'company': '/onboarding/company',
    'role': '/onboarding/role',
    'objective': '/onboarding/objective',
    'settings': '/dashboard',
    'dashboard': '/dashboard',
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      if(!validateForm()) {
        return;
      }

      console.log("formData :", formData)
      try {
          const userData = await login({ email:formData['email'].value, password:formData['password'].value }).unwrap()
          const { access_token } = userData;
          dispatch(setCredentials({ ...userData}))
          const decodedToken = jwtDecode(access_token);
          const { stage } = decodedToken;
          navigate(stageRoute[stage]);
          notify("success", "Welcome to Vanbook");
      } catch (err) {
        notify("error", "Invalid Email or Password")
        // console.log("err: ", err);
        //   if (err.status === 400) {
        //       // setErrMsg('Missing Username or Password');
        //       notify("error", "Missing Username or Password")
        //   } else if (err.status === 401) {
        //       // setErrMsg('Unauthorized');
        //       notify("error", "Unauthorized")
        //   } else {
        //       // setErrMsg('Login Failed');
        //       notify("error", "Login Failed")
        //   }
          // errRef.current.focus();
      }
  }

  // const handleEmailInput = (e) => setEmail(e.target.value)

  // const handlePwdInput = (e) => setPwd(e.target.value)

  const formShadow = {
    boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.12)",
  }

  return (
    <section>
      <nav className='flex items-center py-6 pl-12'>
        <img src={logo} width="120px" alt="" />
      </nav>
      <form
        action=""
        className='w-[33%] mx-auto p-6 pt-4 pb-4 border my-auto rounded-lg bg-white'
        style={formShadow}
      >
        <div className='flex flex-col text-center'>
          <span className='text-[1.6rem] font-medium text-[#151515]'>Sign in</span>
          <span className='text-[.9rem]'>One account for everything</span>
        </div>

        {/* <GoogleAuth /> */}

        <div className='w-[45%] h-[10px]'></div>

        <div className='my-4 flex items-center justify-between'>
          <span className='w-[45%] h-[1px] bg-[#D7D7D7]'></span>
          <span>or</span>
          <span className='w-[45%] h-[1px] bg-[#D7D7D7]'></span>
        </div>

        <div>
          <CustomInput 
          type="email" 
          label="Email" 
          name="email" 
          value={formData['email'].value} 
          onChange={handleInputChange} 
          required={formData['email'].required}
          err={formErrors}
          className={'mb-5'}
          />
          <CustomInput 
          type={"password"}
          label={"Password"} 
          name="password"
          value={formData['password'].value} 
          onChange={handleInputChange} 
          required={formData['password'].required}
          err={formErrors}
          className={'mb-8'}
          />
          {/*======= Email InputField =======*/}
          {/* <div className='mb-4'>
            <label className='text-[.9rem]'>Email</label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={handleEmailInput}
              className='w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
            />
          </div> */}

          {/*======= Password InputField =======*/}
          {/* <div className='mb-4'>
            <label className='text-[.9rem]'>Password</label>
            <input
              type="password"
              value={pwd}
              onChange={handlePwdInput}
              className='w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
              autoComplete='on'
              required={true}
            />
          </div> */}

          {/*======= CheckBox =======*/}
          {/* <div className='flex items-center gap-3 mb-6'>
            <input type="checkbox" />
            <label className='text-[.9rem]'>Remember me</label>
          </div>
          */}

        </div> 

        {/*====== Login Button ========*/}
        <button
          type='submit'
          className='w-full h-[2.5rem] bg-[#41436a] rounded-lg text-white'
          onClick={handleSubmit}
        >
          Sign in
        </button>
        {/* <Link
          to="/dashboard"
          className='flex items-center justify-center h-[2.5rem] bg-[#41436a] rounded-lg text-white'
        >
          Sign in
        </Link> */}

        <p className='text-[.75rem] my-4 text-[#151515]'>By selecting sign in or sign with google, you agree with our terms and have read our and acknowledged our Global privacy statement.</p>

        <hr className='w-[95%] bg-[#D7D7D7] mx-auto' />

        <div className='flex items-end justify-center pt-4'>
          <span className='text-[.9rem]'>
            New to Vanbook?
            <Link
              to="/signup"
              className='text-[#41436a] font-semibold ml-1'
            >
              Create an account
            </Link>
          </span>
        </div>
      </form>


      <footer className='absolute bottom-0 left-0 w-full bg-[#2e2f5b] h-fit text-white'>
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

export default Login