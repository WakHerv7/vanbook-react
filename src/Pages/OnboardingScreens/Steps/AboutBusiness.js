import TextInput from "../../../Components/InputAndTitle/TextInput/textInput";

const AboutBusiness = () => {
  return (
    <>
      {/* AboutBusiness */}
      <div className="flex items-center">
        <div>
          <img src="asets/VBlogo.svg" alt="" />
        </div>
        <p className="text-[20px] py-4 justify-self-center">Get Started</p>
      </div>

      <div className="">
        <h1 className="text-[30px] md:text-[40px]">
          Tell Us About Your Business.
        </h1>
        <p>
          We would like to know what your business is about so we can help make
          your experience a wonderful one
        </p>
      </div>

      {/* form container */}
      <div className="mt-12 w-100% md:max-w-[50%]">
        <form action="">
          <div className="flex flex-col gap-4">
            <TextInput title={"Business Email Address"} noGrayBg={true} />

            <TextInput title={"Legal business name"} noGrayBg={true} />

            <TextInput
              title={"What type of business do you have?"}
              noGrayBg={true}
            />

            <TextInput
              title={"How long have you been in the business"}
              noGrayBg={true}
            />

            <TextInput title={"Industry"} noGrayBg={true} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AboutBusiness;
