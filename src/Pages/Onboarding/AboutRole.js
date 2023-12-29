import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import InnerCard from "../../Components/Card/InnerCard";

import owner from "../../Assets/onboarding/owner.png";
import accountant from "../../Assets/onboarding/accountant.png";
import amico from "../../Assets/onboarding/amico.png";
import employee from "../../Assets/onboarding/employee.png";
import helped from "../../Assets/onboarding/helped.png";
import note from "../../Assets/onboarding/note.png";
import placard from "../../Assets/onboarding/placard.png";
import research from "../../Assets/onboarding/research.png";
import './style_onboarding.css';

import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../Api/Auth/authSlice.js';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSubmitUserRoleMutation } from '../../Api/Auth/authApiSlice';
import notify from '../../Components/Notify/Notify';

const style = {
  container: ` w-full h-full px-4 pt-2`,
  header: `header mt-2`,
  logo: `absolute left-0 t-[50%] flex justify-center items-center w-11 h-11 bg-violet-900 rounded-full text-stone-50 text-6 font-medium`,
  headerText: `text-center text-neutral-900 text-3xl font-normal leading-loose`,
  hr: ` h-2.5 bg-zinc-300`,
  progress: `w-[50%] h-2.5 bg-slate-700`,
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

export default function AboutRole() {
  const [display, setDisplay] = useState(<></>);
  const [userRole, setUserRole] = useState("");
  const [hasAccountant, setHasAccountant] = useState(false);
  const [needTips, setNeedTips] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const token = useSelector(selectCurrentToken);
  const decodedToken = jwtDecode(token);
  const { cc, rc, email } = decodedToken;

  const navigate = useNavigate()
  const [submitUserRole, { isLoading }] = useSubmitUserRoleMutation()
  const dispatch = useDispatch()

  const roleCodes = {
    "owner": "ROLE101",
    "headOfAccount": "ROLE102",
    "accountant": "ROLE103",
    "bookkeeper": "ROLE104",
    "employee": "ROLE105",
  };

  const setOwner = () => {
    setIsActive(false);
    setUserRole(roleCodes['owner']);
    setDisplay(
      <>
        <p className={style.contentText}>
          Do you have an accountant or bookkeeper right now?
        </p>
        <div className={style.cardContainer}>
          <InnerCard
            setIsActive={setIsActive}
            type={"yes"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={helped}
            text="Yes, someone helps  me"
          />
          <InnerCard
            setIsActive={setIsActive}
            type={"no"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={note}
            text="No, i do it all by myself"
          />
          <InnerCard
            setIsActive={setIsActive}
            type={"tips"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={placard}
            text="No, but i would like helpful tips"
          />
        </div>
      </>
    );
  };
  const setHeadOfAccount = () => {
    setUserRole(roleCodes['headOfAccount']);
    setDisplay(<p className={style.extraInfo}>Great, please proceed</p>);
    setIsActive(true);
  };
  const setAccountant = () => {
    setUserRole(roleCodes['accountant']);
    setDisplay(<p className={style.extraInfo}>Great, please proceed</p>);
    setIsActive(true);
  };
  const setBookkeeper = () => {
    setUserRole(roleCodes['bookkeeper']);
    setDisplay(<p className={style.extraInfo}>Great, please proceed</p>);
    setIsActive(true);
  };
  const setEmployee = () => {
    setUserRole(roleCodes['employee']);
    setIsActive(false);
    setDisplay(
      <>
        <p className={style.extraInfo}>
          Do you have an accountant or bookkeeper right now?
        </p>
        <div className={style.cardContainer}>
        <InnerCard
            setIsActive={setIsActive}
            type={"yes"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={helped}
            text="Yes, someone helps  me"
          />
          <InnerCard
            setIsActive={setIsActive}
            type={"no"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={note}
            text="No, i do it all by myself"
          />
          <InnerCard
            setIsActive={setIsActive}
            type={"tips"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={placard}
            text="No, but i would like helpful tips"
          />
        </div>
      </>
    );
  };
  const setSomething = () => {
    setIsActive(false);
    setDisplay(
      <>
        <p className={style.extraInfo}>
          Do you have an accountant or bookkeeper right now?
        </p>
        <div className={style.cardContainer}>
        <InnerCard
            setIsActive={setIsActive}
            type={"yes"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={helped}
            text="Yes, someone helps  me"
          />
          <InnerCard
            setIsActive={setIsActive}
            type={"no"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={note}
            text="No, i do it all by myself"
          />
          <InnerCard
            setIsActive={setIsActive}
            type={"tips"}
            setHasAccountant={setHasAccountant}
            setNeedTips={setNeedTips}
            image={placard}
            text="No, but i would like helpful tips"
          />
        </div>
      </>
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
        const userData = await submitUserRole({ 
            'id': rc.id,
            'user_email': email,
            'role':userRole, 
            'has_accountant_bookkeeper':hasAccountant,
            'need_tips': needTips 
        }).unwrap()
        navigate('/onboarding/objective');

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
      <h1 className={style.h1}>What’s your role at your school</h1>
      <p className={style.extraInfo}>
        We’ll use this information to help personalize your Vanbook. You can
        always change it later in settings
      </p>

      <div className={`w-full flex flex-col items-center justify-center gap-5`}>
        <div className={`w-fit`}>
            <div className={style.cardContainer}>
                <Card image={amico} text="Owner" display={setOwner} />
                <Card image={owner} text="Head of Account" display={setHeadOfAccount} />
                <Card image={accountant} text="Accountant" display={setAccountant} />
                <Card image={research} text="Bookkeeper" display={setBookkeeper} />
                <Card image={employee} text="Employee" display={setEmployee} />
                {/* <Card image={amico} text="Something else" display={setSomething} /> */}
            </div>
            <div className={style.contentContainer}>{display}</div>
            <div className={style.btnContainer}>
                <div className="flex gap-3 justify-end">
                
                <Link to="/onboarding/company">
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
