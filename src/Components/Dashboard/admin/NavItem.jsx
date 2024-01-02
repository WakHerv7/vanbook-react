

 const NavItem = ({ img, text, isVisible }) => {
    return (
        <div className=" h-12 p-2.5 items-center gap-2.5 inline-flex">
            <img src={img} alt="nav icon" />
            <span className={`text-white text-lg font-normal leading-7 ${isVisible}`}>
                {text}
            </span>
        </div>
    );
};

export default NavItem