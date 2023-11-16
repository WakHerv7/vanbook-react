import React from "react"


const style = {
  cardBody: `relative`,
  input: `input--onboard`,
  imgBg: `card w-[200px] h-[182px] p-[29px] bg-white rounded-2xl shadow-md shadow-slate-400 flex-col justify-center items-center gap-2 inline-flex m-2 cursor-pointer`,
  img: ` relative`,
  imgText: `text-center text-neutral-900 text-lg font-normal leading-normal`
}

export default function InnerCard({ image, text, setIsActive}) {

  return (
    <label className={style.cardBody}>
      <input name='inner' type="radio" className={style.input} />
      <figure onClick={() => setIsActive(true)} className={style.imgBg}>
        <img src={image} alt="" className={style.img} />
        <figcaption className={style.imgText}>{text}</figcaption>
      </figure>
    </label>

  )
}
