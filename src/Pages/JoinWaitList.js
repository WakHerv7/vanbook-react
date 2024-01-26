import Footer from "../Components/Footer";
import TextArea from "../Components/InputAndTitle/TextArea/textArea";
import TextInput from "../Components/InputAndTitle/TextInput/textInput";
import Nav from "../Components/LandingPage/Nav";
import Trial from "../Components/LandingPage/Trial";
import Alert from "../Components/LandingPage/Alert";

function JoinWaitList() {
  return (
    <>
      <Alert />
      <Nav />
      <div className="max-w-[85%] mx-auto flex flex-col md:flex-row gap-[112px] justify-center items-center">
        <div className="flex flex-col justify-center mt-10">
          <div>
            <h1 className="font-[400] text-[36px] leading-[44px] text-[#181818] tracking-[-2%] ">
              The Smart Software made for your
              <br/>
              School Financial Management
            </h1>
            <p className="text-[#667085] font-[400] text-[18px] leading-[28px] mt-5">
              Join our waitlist now for early access when we launch later in the year.
            </p>
          </div>
          <form action="https://formsubmit.co/vtech64@yahoo.com" method="POST">
            <div className="flex flex-col gap-[24px] mt-[30px] mb-[80px] ">
              <TextInput
                noGrayBg={true}
                typeText={"hidden"}
                nameText={"subject"}
                oneValue={"Join the waiting list"}
              />
              <TextInput
                noGrayBg={true}
                title={"Name"}
                nameText={"name"}
                placeholderText={"Your name"}
              />
              <TextInput
                noGrayBg={true}
                title={"School's name"}
                nameText={"school-name"}
                placeholderText={"Your school's name"}
              />              
              <TextInput
                noGrayBg={true}
                title={"Email"}
                typeText={"email"}
                nameText={"email"}
                placeholderText={"you@company.com"}
              />
              <label
                  className="font-[400] text-[16px] leading-[24px] text-[#667085] "
                >
                  Join other schools waiting for the software.
                </label>
              <input
                type="submit"
                value={"Join the wait-list"}
                className="bg-[#2E2F5B] text-white py-[12px] px-[20px] rounded-[8px] cursor-pointer"
              />
              <label className="font-[400] text-[14px] leading-[24px] text-[#667085] ">
              We take your data seriously. Your data will be handled as detailed in our Privacy Notice. By clicking the button above you agree to receive app-related email communication from Vanbook.
              </label>
            </div>
          </form>
        </div>
        <div className="relative hidden lg:block max-w-[40%] h-[500px] object-contain ">
          <img className="h-[100%] max-w-none w-[auto]" src="assets/Rectangle.png" alt="" />
        </div>
      </div>
      {/* <Trial /> */}
      <Footer />
    </>
  );
}
export default JoinWaitList;
