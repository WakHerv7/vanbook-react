import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Card from "./Card";
import InnerCard from "./InnerCard";

import owner from '../../../Assets/owner.png'
import accountant from '../../../Assets/accountant.png'
import amico from '../../../Assets/amico.png'
import employee from '../../../Assets/employee.png'
import helped from '../../../Assets/helped.png'
import note from '../../../Assets/note.png'
import placard from '../../../Assets/placard.png'
import research from '../../../Assets/research.png'


const style = {
  container: ` w-full h-full p-2 md:p-10 `,
  header: `header mt-2 `,
  logo: `flex justify-center items-center w-11 h-11 bg-violet-900 rounded-full text-stone-50 text-6 font-medium`,
  headerText: `-mt-8 mb-4 text-center text-neutral-900 text-3xl font-normal leading-loose`,
  hr: ` h-2.5 bg-zinc-300`,
  progress: `w-[30%] h-2.5 bg-slate-700`,
  h1: ` text-center text-neutral-900 text-5xl font-normal leading-loose mt-8`,
  extraInfo: `text-center text-neutral-900 text-xl font-normal leading-loose`,
  cardContainer: ` mt-10 flex flex-wrap justify-center  items-center  `,
  btnContainer: ` py-5 flex justify-around`,
  backBtn: `w-[140px] h-14 px-2.5 py-4 rounded-lg border border border border border-slate-700 justify-center items-center  inline-flex`,
  backBtnText: `text-slate-700 text-lg font-normal`,
  nextBtn: `w-[140px] h-14 px-2 py-4 bg-slate-700 rounded-lg justify-center items-center  inline-flex`,
  nextBtnText: `text-white text-lg font-normal`,
  contentContainer: `flex justify-center items-center flex-col my-8 h-72 text-center`,
  contentText: `text-center text-neutral-900 text-xl font-normal leading-loose`,
  nextBtnDisable: `w-[140px] h-14 px-2 py-4 bg-slate-700 rounded-lg justify-center items-center me-2 inline-flex disabled:opacity-25`
}


export default function OnBoardHome() {
  const [display, setDisplay] = useState(<></>)
  const [isActive, setIsActive] = useState(false)
 
  const setOwner = () => {
    setDisplay(
      <>
        <p className={style.contentText}>Do you have an accountant or bookkeeper right now?</p>
        <div className={style.cardContainer}>
          <InnerCard setIsActive={setIsActive} image={helped} text="Yes, someone helps  me" />
          <InnerCard setIsActive={setIsActive} image={note} text="No, i do it all by myself" />
          <InnerCard setIsActive={setIsActive} image={placard} text="No, but i would like helpful tips" />
        </div>

      </>
    )
  }
  const setAccountant = () => {
    setDisplay(<p className={style.extraInfo}>Great, please proceed</p>)
    setIsActive(true)
    }
  const setBookkeeper = () => {
    setDisplay(<p className={style.extraInfo}>Great, please proceed</p>)
    setIsActive(true)
  }
  const setEmployee = () => {
    setDisplay(
      <>
        <p className={style.extraInfo}>Do you have an accountant or bookkeeper right now?</p>
        <div className={style.cardContainer}>
          <InnerCard setIsActive={setIsActive} image={helped} text="Yes, someone helps  me" />
          <InnerCard setIsActive={setIsActive} image={note} text="No, i do it all by myself" />
          <InnerCard setIsActive={setIsActive} image={placard} text="No, but i would like helpful tips" />
        </div>
      </>
    )
  }
  const setSomething = () => {
    setDisplay(
      <>
        <p className={style.extraInfo}>Do you have an accountant or bookkeeper right now?</p>
        <div className={style.cardContainer}>
          <InnerCard setIsActive={setIsActive} image={helped} text="Yes, someone helps  me" />
          <InnerCard setIsActive={setIsActive} image={note} text="No, i do it all by myself" />
          <InnerCard setIsActive={setIsActive} image={placard} text="No, but i would like helpful tips" />
        </div>
      </>
    )
  }
  


  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.logo}>VB</span>
        <p className={style.headerText}>Get Started</p>
        <div className={style.hr}>
          <div className={style.progress} />
        </div>
      </div>
      <h1 className={style.h1}>What’s your role at your business</h1>
      <p className={style.extraInfo}>We’ll use this information to help personalize your Vanbook. You can always change it later in settings</p>
      <div className={style.cardContainer}>
        <Card image={owner} text='Owner' display={setOwner} />
        <Card image={research} text='Bookkeeper' display={setBookkeeper} />
        <Card image={accountant} text='Accountant' display={setAccountant} />
        <Card image={employee} text="Employee" display={setEmployee} />
        <Card image={amico} text="Something else" display={setSomething} />
      </div>
      <div className={style.contentContainer}>{display}</div>
      <div className={style.btnContainer}>
        <div className="flex gap-8 ml-8">
          <button className={style.backBtn}><span className={style.backBtnText}>Back</span></button>
          <Link to="/onboarding3" ><button className={isActive ? style.nextBtn : style.nextBtnDisable} disabled={!isActive} ><span  className={style.nextBtnText}>Next</span></button></Link>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
