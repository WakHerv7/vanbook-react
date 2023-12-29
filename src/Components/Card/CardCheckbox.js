// import Image from "next/image";
import CustomImage from "../CustomImage/CustomImage";

const style = {
  imgBg: `card w-[160px] h-[160px] px-2 py-[29px] bg-white rounded-2xl shadow-md shadow-slate-400 flex-col justify-center items-center gap-2 inline-flex m-2 cursor-pointer`,
  img: ` relative`,
  imgText: `text-center leading-normal mt-3 text-neutral-900 text-md font-normal leading-normal`,
};

export default function CardCheckbox({ handleCheckbox, item, image, text }) {
  return (
    <label className="relative">
      <input name="objective" onChange={(e)=>handleCheckbox(item, e.target.checked)} type="checkbox" className="onboarding-radio" />
      <figure  className={style.imgBg}>
        <CustomImage
        src={image} 
        alt={text} 
        className={style.img}
        height={'auto'}
        width={'auto'}
        />
        <figcaption className={style.imgText}>{text}</figcaption>
      </figure>
    </label>
  );
}
