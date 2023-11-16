import React from "react"


const style = {
  cardBody: `relative`,
  input: `input--onboard`,
  imgBg: `card w-[200px] h-[182px] px-2 py-[29px] bg-white rounded-2xl shadow-md shadow-slate-400 flex-col justify-center items-center gap-2 inline-flex m-2 cursor-pointer`,
  img: ` relative`,
  imgText: `text-center leading-normal mt-3 text-neutral-900 text-lg font-normal leading-normal`
}

export default function Card({display, image, text}) {

  return (
    <label className={style.cardBody}>
      <input name='name' type="radio" className={style.input} />
      <figure onClick={display} className={style.imgBg}>
        <img src={image} alt="" className={style.img} />
        <figcaption className={style.imgText}>{text}</figcaption>
      </figure>
    </label>

  )
}
