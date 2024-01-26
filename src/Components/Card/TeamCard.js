function TeamCard({ img, name, position }) {
  return (
    <div className="flex flex-col justify-center items-center bg-[#F9FAFB] w-[280px] mx-auto h-[256px] ">
      <img className="mb-[20px] " src={img} alt="" />
      <p>{name}</p>
      <p>{position}</p>
      <div className="flex gap-[16px] mt-[16px] ">
        <img src="assets/s-icon-1.svg" alt="" />
        <img src="assets/s-icon-2.svg" alt="" />
        <img src="assets/s-icon-3.svg" alt="" />
      </div>
    </div>
  );
}
export default TeamCard;
