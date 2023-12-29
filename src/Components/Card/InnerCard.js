import CustomImage from "../CustomImage/CustomImage"

const style = {
  cardBody: `relative`,
  imgBg: `card w-[160px] h-[160px] p-[29px] bg-white rounded-2xl shadow-md shadow-slate-400 flex-col justify-center items-center gap-2 inline-flex m-2 cursor-pointer`,
  img: ` relative`,
  imgText: `text-center text-neutral-900 text-md font-normal leading-normal`
}

export default function InnerCard({ 
  image, text, setIsActive,
  type,
  setHasAccountant,
  setNeedTips
}) {

  const types = {
    'yes': {hasAccountant:true, needTips:false},
    'no': {hasAccountant:false, needTips:false},
    'tips': {hasAccountant:false, needTips:true},
  }
  const handleClick = () => {
    setIsActive(true);
    setHasAccountant(types[type]['hasAccountant']);
    setNeedTips(types[type]['needTips']);
  } 

  return (
    <label className={style.cardBody}>
      <input name='subrole' type="radio" className={'onboarding-radio'} />
      <figure onClick={handleClick} className={style.imgBg}>
        <CustomImage 
        src={image} 
        alt={text} 
        className={style.img}
        width={'auto'}
        height={'auto'}
         />
        <figcaption className={style.imgText}>{text}</figcaption>
      </figure>
    </label>

  )
}
