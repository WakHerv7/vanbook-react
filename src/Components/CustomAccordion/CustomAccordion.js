import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import "./index.css";
import group from "../../Assets/group.png";
import { Link } from "react-router-dom";

const CustomAccordion = (data) => {
  const [selected, setSelected] = useState(false);
  const [loadedData, setLoadedData] = useState([]);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(!selected);
    }

    setSelected(i);
  };

  useEffect(() => {
    console.log("Data : ")
    console.log(data)
    setLoadedData(data)
}, [data])

  // const data = [
  //   {
  //     title: "Is there a free trial available?",
  //     content:
  //       "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  //   },
  //   {
  //     title: "Can I change my plan later?",
  //     content:
  //       "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  //   },
  //   {
  //     title: "What is your cancellation policy?",
  //     content:
  //       "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  //   },
  //   {
  //     title: "Can other info be added to an invoice?",
  //     content:
  //       "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  //   },
  //   {
  //     title: "How does billing work?",
  //     content:
  //       "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  //   },
  //   {
  //     title: "How do I change my account email?",
  //     content:
  //       "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  //   },
  // ];

  return (
    <section className="py-4">
        <div className="w-full md:w-[60%] mx-auto my-8 pb-4">
          
          {data?.map((item, i) => (
            <div className="py-4 border-b">
              <div
                className="text-[#101828] text-[.9rem] font-medium flex justify-between items-center cursor-pointer"
                onClick={() => toggle(i)}
              >
                
                <React.Fragment key={"title-"+i}>{item.title}</React.Fragment>
                {selected === i ? (
                  <AiOutlineMinusCircle />
                ) : (
                  <AiOutlinePlusCircle />
                )}
              </div>
              <div className={selected === i ? "content show" : "content"}>
                <React.Fragment key={"content-"+i}>{item.content}</React.Fragment>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default CustomAccordion;
