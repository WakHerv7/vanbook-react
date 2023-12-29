import icon1 from "@/app/_assets/s-icon-1.svg";
import icon2 from "@/app/_assets/s-icon-2.svg";
import icon3 from "@/app/_assets/s-icon-3.svg";
import CustomImage from "../CustomImage/CustomImage";

function TeamCard({ img, name, position }) {
  return (
    <div className="flex flex-col justify-center items-center bg-[#F9FAFB] w-[280px] mx-auto h-[256px] ">
      <CustomImage className="mb-[20px] " src={img} alt={name} width={'auto'} height={'auto'} priority />
      <p>{name}</p>
      <p>{position}</p>
      <div className="flex gap-[16px] mt-[16px] ">
        <CustomImage src={icon1} alt={`${name}-icon`} width={'auto'} height={'auto'} priority />
        <CustomImage src={icon2} alt={`${name}-icon`} width={'auto'} height={'auto'} priority />
        <CustomImage src={icon3} alt={`${name}-icon`} width={'auto'} height={'auto'} priority />
      </div>
    </div>
  );
}
export default TeamCard;
