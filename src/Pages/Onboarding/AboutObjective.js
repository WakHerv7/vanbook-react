import { useState } from "react";
import { Link } from "react-router-dom";
import CardCheckbox from "../../Components/Card/CardCheckbox";

import accountant from "../../Assets/onboarding/accountant.png";
import employee from "../../Assets/onboarding/employee.png";
import research from "../../Assets/onboarding/research.png";
import invoice from "../../Assets/onboarding/invoice.png";
import payment from "../../Assets/onboarding/payment-info.png";
import spreadsheet from "../../Assets/onboarding/spreadsheet.png";
import investor from "../../Assets/onboarding/investor-presentation.png";
import './style_onboarding.css';

import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../Api/Auth/authSlice.js';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSubmitObjectiveMutation } from '../../Api/Auth/authApiSlice';
import notify from '../../Components/Notify/Notify';

const style = {
  container: ` w-full h-full px-4 pt-2`,
  header: `header mt-2`,
  logo: `absolute left-0 t-[50%] flex justify-center items-center w-11 h-11 bg-violet-900 rounded-full text-stone-50 text-6 font-medium`,
  headerText: `text-center text-neutral-900 text-3xl font-normal leading-loose`,
  hr: ` h-2.5 bg-zinc-300`,
  progress: `w-[75%] h-2.5 bg-slate-700`,
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

const objectives = [
  {
      "label": "Send and track invoices",
      "value": "OBJ101",
      "image": invoice,
  },
  {
      "label": "Organize expenses",
      "value": "OBJ102",
      "image": research,
  },
  {
      "label": "Track my sales tax",
      "value": "OBJ103",
      "image": accountant,
  },
  {
      "label": "Track my retail sales",
      "value": "OBJ104",
      "image": employee,
  },
  {
      "label": "Pay my employees",
      "value": "OBJ105",
      "image": payment,
  },
  {
      "label": "Manage inventory",
      "value": "OBJ106",
      "image": spreadsheet,
  },
  {
      "label": "Track my bills",
      "value": "OBJ107",
      "image": investor,
  },
  
];


export default function AboutObjective() {
  const [selectedObjectives, setSelectedObjectives] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const token = useSelector(selectCurrentToken);
  const decodedToken = jwtDecode(token);
  const { cc, rc } = decodedToken;

  const navigate = useNavigate()
  const [submitObjective, { isLoading }] = useSubmitObjectiveMutation()
  const dispatch = useDispatch()

  const handleObjective = (oneObjective, checked) => {
    let myObjectives = selectedObjectives
    if (checked){            
        myObjectives = [
          ...myObjectives, 
          oneObjective.value];
        setSelectedObjectives(myObjectives)
    } else {
        myObjectives = selectedObjectives.filter(elt => elt != oneObjective.value)
        setSelectedObjectives(myObjectives)
    }
    myObjectives.length == 0 ? setIsActive(false): setIsActive(true) ;
    
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(selectedObjectives);
    // return;
    try {
        const userData = await submitObjective({
             'id': rc.id,
             'objectives': selectedObjectives 
        }).unwrap();
        navigate('/dashboard');

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
      <h1 className={style.h1}>What would you like to do with Vanbook?</h1>
      <p className={style.extraInfo}>
      This is just to get started. You can always do more later.
      </p>

      <div className={`w-full flex flex-col items-center justify-center gap-5`}>
        <div className={`w-fit max-w-[800px]`}>
          <div className={` mb-10 ${style.cardContainer}`}>

            {
              objectives.map((obj, ind) => {
                return  <CardCheckbox
                          handleCheckbox = {handleObjective}
                          item = {objectives[ind]}
                          image = {objectives[ind]['image']}
                          text = {objectives[ind]['label']}
                        />
              })
            }  
            {/* <CardCheckbox
              display={display}
              image={invoice}
              text = {objectives[0]['label']}
            />
            <CardCheckbox
              display={display}
              image={research}
              text = {objectives[1]['label']}
            />
            <CardCheckbox
              display={display}
              image={accountant}
              text = {objectives[2]['label']}
            />
            <CardCheckbox
              display={display}
              image={employee}
              text = {objectives[3]['label']}
            />
            <CardCheckbox 
            display={display} 
            image={payment} 
            text = {objectives[4]['label']}
            />
            <CardCheckbox 
            display={display} 
            image={spreadsheet} 
            text = {objectives[5]['label']}
            />
            <CardCheckbox 
            display={display} 
            image={investor} 
            text = {objectives[6]['label']}
            /> */}
          </div>

          {/* <div className={style.contentContainer}>
            <Card display={display} image={payment} text="Pay your employees" />
            <Card display={display} image={spreadsheet} text="Manage inventory" />
            <Card display={display} image={investor} text="Track your bills" />
          </div> */}
          <div className={style.btnContainer}>
              <div className="flex gap-3 justify-end">
              
              <Link to="/onboarding/role">
                  <button className={style.backBtn}>
                      <span>Back</span>
                  </button>
              </Link>
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
