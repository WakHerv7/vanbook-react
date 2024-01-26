import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Card from "./Card";

const style = {
    container: ` w-full h-full p-2 md:p-10 `,
    header: `header mt-2 `,
    logo: `flex justify-center items-center w-11 h-11 bg-violet-900 rounded-full text-stone-50 text-6 font-medium`,
    headerText: `-mt-8 mb-4 text-center text-neutral-900 text-3xl font-normal leading-loose`,
    hr: ` h-2.5 bg-zinc-300`,
    progress: `w-[30%] h-2.5 bg-slate-700`,
    h1: ` text-center text-neutral-900 text-5xl font-normal leading-loose mt-8`,
    extraInfo: `text-center text-neutral-900 text-xl font-normal leading-loose`,
    cardContainer: ` mt-10 flex flex-wrap justify-center  items-center `,
    btnContainer: ` py-5 flex justify-around `,
    backBtn: `w-[140px] h-14 px-2.5 py-4 rounded-lg border border border border border-slate-700 justify-center items-center  inline-flex`,
    backBtnText: `text-slate-700 text-lg font-normal`,
    nextBtn: `w-[140px] h-14 px-2 py-4 bg-slate-700 rounded-lg justify-center items-center  inline-flex`,
    nextBtnText: `text-white text-lg font-normal`,
    contentContainer: `flex justify-center items-center -mt-8 mb-8 h-72 text-center`,
    contentText: `text-center text-neutral-900 text-xl font-normal leading-loose`,
    nextBtnDisable: `w-[140px] h-14 px-2 py-4 bg-slate-700 rounded-lg justify-center items-center me-2 inline-flex disabled:opacity-25`
}


export default function OnBoardHome() {
  const [isActive, setIsActive] = useState(false)
  const display = () => setIsActive(true)

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.logo}>VB</span>
        <p className={style.headerText}>Get Started</p>
        <div className={style.hr}>
          <div className={style.progress}/></div>
        </div>
        <h1 className={style.h1}>What would you like to do with Vanbook?</h1>
        <p className={style.extraInfo}>This is just to get started. You can always do more later.</p>
        <div className={style.cardContainer}>
          <Card display={display} image="assets/invoice.png" text='Send and track invoices' />
          <Card display={display} image="assets/research.png" text='Organize your expenses' />
          <Card display={display} image="assets/accountant.png" text='Track your sales tax' />
          <Card display={display} image="assets/employee.png" text="Track your retail sales" />
        </div>

        <div className={style.contentContainer}>
          <Card display={display} image="assets/payment-info.png" text='Pay your employees' />
          <Card display={display} image="assets/spreadsheet.png" text='Manage inventory' />
          <Card display={display} image="assets/investor-presentation.png" text='Track your bills' />
        </div>
        <div className={style.btnContainer}>
          <div className="flex gap-8 ml-8" >
          <button className={style.backBtn}><span className={style.backBtnText}>Back</span></button>
          <Link to="/dashboard" ><button className={isActive ? style.nextBtn : style.nextBtnDisable} disabled={!isActive}  ><span className={style.nextBtnText}>Finish</span></button></Link>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
