import React, { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import "./index.css";
import group from "../../Assets/group.png";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [selected, setSelected] = useState(false);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(!selected);
    }

    setSelected(i);
  };

  const data = [
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "How does billing work?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "How do I change my account email?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
  ];

  return (
    <section className="py-4">
      <div className="w-[85%] mx-auto py-16">
        <div className="flex flex-col text-center">
          <h2 className="text-[#101828] text-[1.7rem] font-medium mb-4">
            Frequently asked questions
          </h2>
          <span className="text-[#667085] text-[1rem]">
            Everything you need to know about the product and billing.
          </span>
        </div>
        <div className="w-full md:w-[60%] mx-auto my-8 pb-4">
          {data.map((item, i) => (
            <div className="py-4 border-b" key={i}>
              <div
                className="text-[#101828] text-[.9rem] font-medium flex justify-between items-center cursor-pointer"
                onClick={() => toggle(i)}
              >
                {item.question}
                {selected === i ? (
                  <AiOutlineMinusCircle />
                ) : (
                  <AiOutlinePlusCircle />
                )}
              </div>
              <div className={selected === i ? "content show" : "content"}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#F9FAFB] w-full h-[300px] rounded-xl text-center flex flex-col justify-center items-center gap-6">
          <img src={group} alt="" width={120} height={150} />

          <h3 className="text-[#101828] font-medium text-[1.2rem]">
            Still have questions?
          </h3>

          <p className="text-[#667085] text-[1.1rem]">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>

          <button className="bg-[#2E2F5B] text-white py-3 px-5 rounded-lg text-[.9rem] font-medium">
            <Link to="/contact-us">Get in touch</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
