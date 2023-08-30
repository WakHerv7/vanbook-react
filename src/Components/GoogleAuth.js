import React from 'react'
import GoogleLogin from 'react-google-login'
import { FcGoogle } from "react-icons/fc"

const GoogleAuth = () => {
    const googleResponse = (response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.profileObj))
    }

    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                    <button
                        type='button'
                        className='flex items-center justify-center w-full h-[2.5rem] outline-none gap-3 rounded-lg my-6 cursor-pointer text-[.9rem]'
                        style={{
                            border: "1.5px solid #41436a"
                        }}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <FcGoogle className='text-[1.6rem]' />
                        Sign in with Google
                    </button>
                )}
                onSuccess={googleResponse}
                onFailure={googleResponse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleAuth