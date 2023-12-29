import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from '../../Components/CustomInput/CustomInput';
// import './style_onboarding.css';
import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../Api/Auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSubmitCompanyDataMutation } from '../../Api/Auth/authApiSlice';
import notify from '../../Components/Notify/Notify';

const style = {
  container: ` w-full h-full px-4 pt-2`,
  header: `header mt-2`,
  logo: `absolute left-0 t-[50%] flex justify-center items-center w-11 h-11 bg-violet-900 rounded-full text-stone-50 text-6 font-medium`,
  headerText: `text-center text-neutral-900 text-3xl font-normal leading-loose`,
  hr: ` h-2.5 bg-zinc-300`,
  progress: `w-[25%] h-2.5 bg-slate-700`,
  h1: ` text-center text-neutral-900 text-4xl font-[500] leading-loose mt-5`,
  extraInfo: `text-center text-neutral-900 text-lg font-normal leading-loose`,
  cardContainer: `gap-3 mt-4 flex flex-wrap justify-center  items-center`,
  btnContainer: `flex justify-end w-full`,
  backBtn: "py-2 px-10 text-vanbook-primary text-[.9rem] rounded-lg font-medium border border-vanbook-primary",
  nextBtn:'py-2 px-10 bg-vanbook-primary text-white rounded-lg text-[.9rem] font-medium',
  contentContainer: `flex justify-center items-center flex-col mb-4 h-72 text-center`,
  contentText: `text-center text-neutral-900 text-lg font-normal leading-loose`,
  nextBtnDisable: `py-2 px-10 bg-slate-700 text-white rounded-lg text-[.9rem] font-medium disabled:opacity-25`,
};

const initFormData = {
  'ein': {value:'', required:false},
  'company_type': {value:'', required:true},
  'financial_year_start': {value:'', required:true},
  'address': {value:'', required:false},
  'email': {value:'', required:false},
  'phone_number': {value:'', required:false},
  'website': {value:'', required:false},
  'country': {value:'', required:false},
  'region': {value:'', required:false},
  'city': {value:'', required:false},
  'currently_use': {value:'', required:true},
  'years_in_business': {value:'', required:true},
}

export default function AboutCompany() {
  const [display, setDisplay] = useState(<></>);
  const [formData, setFormData] = useState(initFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isActive, setIsActive] = useState(true);

  const token = useSelector(selectCurrentToken);
  const decodedToken = jwtDecode(token);
  const { rc } = decodedToken;
  
  const navigate = useNavigate()
  const [submitCompanyData, { isLoading }] = useSubmitCompanyDataMutation()
  const dispatch = useDispatch()

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

  const companyTypeOptions = [
    {
        "label": "Early Childhood",
        "value": "COMTYP101",
    },
    {
        "label": "Elementary School",
        "value": "COMTYP102",
    },
    {
        "label": "Middle School or Junior High",
        "value": "COMTYP103",
    },
    {
        "label": "High School",
        "value": "COMTYP104",
    },
    {
        "label": "College or University",
        "value": "COMTYP105",
    },
  ];

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let required = e.target.required;

    if (name === 'email') {
      console.log('email', e.target.value);
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
      'id': rc.id,
      'ein': formData['ein'].value,
      'company_type': formData['company_type'].value,
      'financial_year_start': formData['financial_year_start'].value,
      'address': formData['address'].value,
      'phone': formData['phone_number'].value,
      'email': formData['email'].value,
      'website': formData['website'].value,
      'country': formData['country'].value,
      'region': formData['region'].value,
      'city': formData['city'].value,
      'currently_use': formData['currently_use'].value,
      'years_in_business': formData['years_in_business'].value,
    }

    console.log("toSubmit :", toSubmit)
    // return;

    try {
        const userData = await submitCompanyData(toSubmit).unwrap()
        navigate('/onboarding/role');

    } catch (err) {
      notify("error", "Something went wrong")
    }
}

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className="relative flex justify-center align-center w-full ">
            <span className={style.logo}>VB</span>
            <p className={style.headerText}>Get Started</p>
        </div>
        <div className={style.hr}>
          <div className={style.progress} />
        </div>
      </div>
      <h1 className={style.h1}>Tell Us About Your school</h1>
      <p className={style.extraInfo}>
        We would like to know what your school is about so we can help make your experience a wonderful one
        <br/>
        <span className="text-sm">(*) means mandatory</span>
      </p>

      <div className={`w-full flex flex-col items-center justify-center gap-5`}>
        <div className={`w-fit max-w-[1000px]`}>
          {/* <div className='flex flex-col gap-4'> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-7">
            <CustomInput 
            type="select" 
            label={`What type of school do you have? (*)`}
            name="company_type" 
            value={formData['company_type'].value} 
            onChange={handleInputChange}
            required={formData['company_type'].required}
            err={formErrors}                
            options={companyTypeOptions}
            />
            <CustomInput 
            type="date" 
            label="Financial Year Start (*)" 
            name="financial_year_start" 
            value={formData['financial_year_start'].value} 
            onChange={handleInputChange}
            err={formErrors}
            required={formData['financial_year_start'].required}
            />
            <CustomInput 
            type="text" 
            label="Address" 
            name="address" 
            value={formData['address'].value} 
            onChange={handleInputChange}
            err={formErrors}
            required={formData['address'].required}
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
            type="phone" 
            label="Phone number" 
            name="phone_number" 
            value={formData['phone_number'].value} 
            onChange={handleInputChange} 
            required={formData['phone_number'].required}
            err={formErrors}                
            />
            <CustomInput 
            type="text" 
            label="Website" 
            name="website" 
            value={formData['website'].value} 
            onChange={handleInputChange}
            err={formErrors}
            required={formData['website'].required}
            />
            <CustomInput 
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
            label="Region / State" 
            name="region"
            country={formData['country'].value} 
            region={formData['region'].value} 
            onChange={handleInputChange} 
            required={formData['region'].required}
            err={formErrors}                
            />
            <CustomInput 
            type="text" 
            label="City" 
            name="city" 
            value={formData['city'].value} 
            onChange={handleInputChange}
            err={formErrors}
            required={formData['city'].required}
            />
            <CustomInput 
            type="select" 
            label="What software do you currently use ? (*)" 
            name="currently_use" 
            value={formData['currently_use'].value} 
            onChange={handleInputChange}
            required={formData['currently_use'].required}
            err={formErrors}                
            options={currentlyUseOptions}
            />
            <CustomInput 
            type="select" 
            label="How long have you been in the business ? (*)" 
            name="years_in_business" 
            value={formData['years_in_business'].value} 
            onChange={handleInputChange}
            required={formData['years_in_business'].required}
            err={formErrors}                
            options={yearsInBusinessOptions}
            />
          </div>

          <div className={`mt-10 mb-10 ${style.btnContainer}`}>
                <div className="flex gap-3 justify-end">
                
                {/* <Link to="#" onClick={(e)=>e.preventDefault()}>
                    <button className={style.backBtn}>
                        <span>Back</span>
                    </button>
                </Link> */}
                <Link to="#" onClick={handleSubmit}>
                    <button
                    className={isActive ? style.nextBtn : style.nextBtnDisable}
                    disabled={!isActive}
                    >
                    <span>Next</span>
                    </button>
                </Link>
                </div>
                <div></div>
                <div></div>
                <div></div>
          </div>
        </div> 
      </div>
      
    </div>
  );
}
