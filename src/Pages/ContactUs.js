import Footer from "../Components/Footer";
import TextArea from "../Components/InputAndTitle/TextArea/textArea";
import TextInput from "../Components/InputAndTitle/TextInput/textInput";
import Nav from "../Components/LandingPage/Nav";
import Trial from "../Components/LandingPage/Trial";
import Alert from "../Components/LandingPage/Alert";

function ContactUs() {
  return (
    <>
      <Alert />
      <Nav />
      <div className=" lg:py-24 px-8 lg:px-24 mx-auto flex gap-8 items-stretch ">
        <div className="flex flex-col justify-between mt-10 lg:mt-0 flex-1 ">
          <div>
            <h1 className="font-[400] text-[36px] leading-[44px] text-[#181818] tracking-[-2%] ">
              Get in touch
            </h1>
            <p className="text-[#667085] font-[400] text-[18px] leading-[28px] mt-1">
              Our friendly team would love to hear from you.
            </p>
          </div>


          <form action="https://formsubmit.co/vtech64@yahoo.com" method="POST">
            <div className="flex flex-col justify-between gap-[30px] mt-[48px] mb-[80px] lg:mb-0 ">
              <TextInput
                noGrayBg={true}
                typeText={"hidden"}
                nameText={"subject"}
                oneValue={"Get in touch"}
              />
              {/* <TextInput
                noGrayBg={true}
                nameText={"first-name"}
                title={"First name"}
                placeholderText={"First name"}
              /> */}
              {/* <TextInput
                noGrayBg={true}
                nameText={"last-name"}
                title={"Last name"}
                placeholderText={"Last name"}
              /> */}
              <TextInput
                noGrayBg={true}
                nameText={"name"}
                title={"Name"}
                placeholderText={"Your name"}
              />
              <TextInput
                noGrayBg={true}
                nameText={"email"}
                title={"Email"}
                placeholderText={"you@company.com"}
              />
              <TextInput
                noGrayBg={true}
                typeText={"tel"}
                nameText={"phone"}
                title={"Phone number"}
                placeholderText={"+ (234) 000-000-0000"}
              />
              <TextArea title={"Message"} nameText={"message"} rowsValue={8} />
              {/* <div className="flex items-center gap-[12px] ">
                <input type="checkbox" name="agree-to-privacy-policy" id="" />
                <label
                  htmlFor=""
                  className="font-[400] text-[16px] leading-[24px] text-[#667085] "
                >
                  You agree to our friendly privacy policy.
                </label>
              </div> */}
              <input
                type="submit"
                value={"Send message"}
                className="bg-[#2E2F5B] text-white py-[12px] px-[20px] rounded-[8px] cursor-pointer"
              />
            </div>
          </form>
        </div>


        <div className="hidden lg:flex flex-[1.2] ">
          <img 
            className="h-full w-full object-cover " 
            src="assets/contactImg.png"
            alt="" 
          />
        </div>
      </div>
      {/* <Trial /> */}
      <Footer />
    </>
  );
}
export default ContactUs;
