import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from '../../Components/GoogleAuth'


const Login = () => {
  const formShadow = {
    boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.12)",
  }

  return (
    <section>
      <form
        action=""
        className='w-[33%] mx-auto p-6 border my-10 rounded-lg bg-white'
        style={formShadow}
      >
        <div className='flex flex-col text-center'>
          <span className='text-[1.6rem] font-medium text-[#151515]'>Sign in</span>
          <span className='text-[.9rem]'>One account for everything</span>
        </div>

        <GoogleAuth />

        <div className='my-4 flex items-center justify-between'>
          <span className='w-[45%] h-[1px] bg-[#D7D7D7]'></span>
          <span>or</span>
          <span className='w-[45%] h-[1px] bg-[#D7D7D7]'></span>
        </div>

        <div>
          {/*======= Email InputField =======*/}
          <div className='mb-4'>
            <label className='text-[.9rem]'>Email Address/Phone number</label>
            <input
              type="email"
              className='w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
            />
          </div>

          {/*======= Password InputField =======*/}
          <div className='mb-4'>
            <label className='text-[.9rem]'>Password</label>
            <input
              type="password"
              className='w-full h-[2.5rem] border outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
              autoComplete='on'
              required={true}
            />
          </div>

          {/*======= CheckBox =======*/}
          <div className='flex items-center gap-3 mb-6'>
            <input type="checkbox" />
            <label className='text-[.9rem]'>Remember me</label>
          </div>
        </div>

        {/*====== Login Button ========*/}
        {/* <button
          type='submit'
          className='w-full h-[2.5rem] bg-[#41436a] rounded-lg text-white'
        >
          <Link to="/dashboard">
          Sign in
        </button> */}
        <Link
          to="/dashboard"
          className='flex items-center justify-center h-[2.5rem] bg-[#41436a] rounded-lg text-white'
        >
          Sign in
        </Link>

        <p className='text-[.75rem] my-4 text-[#151515]'>By selecting sign in or sign with google, you agree with our terms and have read our and acknowledged our Global privacy statement.</p>

        <hr className='w-[95%] bg-[#D7D7D7] mx-auto' />

        <div className='flex items-center justify-center pt-6'>
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


      <footer className='absolute bottom-0 left-0 w-full bg-[#2e2f5b] h-[15vh] max-h-[250px] min-h-fit text-white'>
        <div className='h-full flex flex-col items-center justify-center text-[.9rem]'>
          <h3>Tech 64</h3>
          <span><Link to="/">Support</Link> | <Link to="/">Privacy</Link></span>
          <span>Copyright 2023 Tech 64 Inc. All rights reserved.</span>
        </div>
      </footer>
    </section>
  )
}

export default Login