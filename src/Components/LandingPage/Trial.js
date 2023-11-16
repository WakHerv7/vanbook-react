import { Link } from "react-router-dom";
import TextInput from "../../Components/InputAndTitle/TextInput/textInput";

const Trial = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="bg-[#F9FAFB] h-[50vh] max-h-[500px]">
      <div className="flex flex-col text-center justify-center items-center w-full h-full">
        <span className="text-[#101828] text-[2.1rem] font-medium mb-4">
          Sign up for a trial version
        </span>
        <span className="text-[#667085] text-[1.3rem] font-light">
          Be among the first to try out our product
        </span>

        <div className="mt-8 w-[95%] ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[16px] md:flex-row md:justify-center"
          >
            <div className="min-w-[360px]">
              <TextInput
                typeText="email"
                placeholderText="Enter your email"
                noGrayBg
                outlineNone
              />
            </div>
            <button
              type="submit"
              className="bg-[#2E2F5B] py-[10px] px-[20px] rounded-[8px] text-white "
            >
              Sign up
            </button>
          </form>
          <p className="mt-[24px] text-[#475467]">
            We care about your data in our{" "}
            <span className="underline">
              <Link to="#">privacy policy</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trial;
