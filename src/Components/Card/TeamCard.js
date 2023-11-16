import icon1 from "../../Assets/s-icon-1.svg";
import icon2 from "../../Assets/s-icon-2.svg";
import icon3 from "../../Assets/s-icon-3.svg";

function TeamCard({ img, name, position }) {
  return (
    <div className="flex flex-col justify-center items-center bg-[#F9FAFB] w-[280px] mx-auto h-[256px] ">
      <img className="mb-[20px] " src={img} alt="" />
      <p>{name}</p>
      <p>{position}</p>
      <div className="flex gap-[16px] mt-[16px] ">
        <img src={icon1} alt="" />
        <img src={icon2} alt="" />
        <img src={icon3} alt="" />
      </div>
    </div>
  );
}
export default TeamCard;
