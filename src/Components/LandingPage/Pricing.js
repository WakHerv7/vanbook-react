import { AiOutlineCheckCircle } from "react-icons/ai";

const Pricing = () => {
  const data = [
    {
      type: "Basic plan",
      popularity: "Popular",
      figure: "N50,000",
      details: "Basic features for up to 3 users.",
      featureInfo: "Everything in starter plus...",
      feature1: "Access to basic features",
      feature2: "Basic reporting and analytics",
      feature3: "Up to 3 individuals",
      feature4: "20GB individual data for each user",
      feature5: "Basic chat and email support",
    },
    {
      type: "Business plan",
      figure: "N100,000",
      details: "Business plan for up to 5 users",
      featureInfo: "Everything in Basic plus...",
      feature1: "Access to basic features",
      feature2: "Basic reporting and analytics",
      feature3: "Up to 5 individuals",
      feature4: "20GB individual data for each user",
      feature5: "Basic chat and email support",
    },
    {
      type: "Enterprise plan",
      figure: "N150,000",
      details: "Limited to 6 users and access to technical support",
      featureInfo: "Everything in Business plus...",
      feature1: "Access to basic features",
      feature2: "Basic reporting and analytics",
      feature3: "Up to 6 individuals",
      feature4: "20GB individual data for each user",
      feature5: "Basic chat and email support",
    },
  ];
  return (
    <section>
      {/* container div */}
      <div className="w-[95%] mx-auto py-16 max-w-[1240px]">
        <div className="flex flex-col text-center justify-center gap-4 pb-8">
          <span className="text-[#2E2F5B] font-medium">Pricing</span>
          <span className="text-[#101828] font-medium text-[1.7rem]">
            Plans that fit your scale
          </span>
          <span className="text-[#475467] text-[1rem]">
            Simple, transparent pricing that grows with you. Try any plan free
            for 30 days
          </span>
        </div>
        {/* pricing plans */}
        <div className="flex justify-between my-8">
          {/* lg:w-[32%] */}
          {data.map((item) => (
            <div className="border p-6 rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="text-[#475467]">{item.type}</span>
                {item.popularity && (
                  <span className="text-[#2E2F5B] py-1 px-3 rounded-[15px] bg-[#F9F5FF] w-fit text-[.9rem]">
                    {item.popularity}
                  </span>
                )}
              </div>

              <div className="flex gap-3 justify-between items-baseline my-2">
                <span className="text-[2rem] font-medium text-[#101828]">
                  {item.figure}
                </span>
                <span className="text-[.7rem] text-[#475467]">per month</span>
              </div>

              <span className="text-[.8rem] text-[#475467]">
                {item.details}
              </span>

              <div className="mt-4 mb-8">
                <button className="w-full h-[45px] bg-[#2E2F5B] text-white rounded-lg mb-4 text-[.9rem]">
                  Get started
                </button>

                <button className="w-full h-[45px] border text-[#2E2F5B] rounded-lg text-[.9rem]">
                  Chat to sales
                </button>
              </div>

              <div>
                <h3>FEATURES</h3>
                <span className="text-[.9rem] text-[#475467]">
                  {item.featureInfo}
                </span>

                <ul className="mt-4">
                  <li className="flex gap-3 items-center py-2">
                    <AiOutlineCheckCircle className="text-[#2E2F5B] text-[20px]" />
                    <span className="text-[#475467] text-[.9rem]">
                      {item.feature1}
                    </span>
                  </li>

                  <li className="flex gap-3 items-center py-2">
                    <AiOutlineCheckCircle className="text-[#2E2F5B] text-[20px]" />
                    <span className="text-[#475467] text-[.9rem]">
                      {item.feature2}
                    </span>
                  </li>

                  <li className="flex gap-3 items-center py-2">
                    <AiOutlineCheckCircle className="text-[#2E2F5B] text-[20px]" />
                    <span className="text-[#475467] text-[.9rem]">
                      {item.feature3}
                    </span>
                  </li>

                  <li className="flex gap-3 items-center py-2">
                    <AiOutlineCheckCircle className="text-[#2E2F5B] text-[20px]" />
                    <span className="text-[#475467] text-[.9rem]">
                      {item.feature4}
                    </span>
                  </li>

                  <li className="flex gap-3 items-center py-2">
                    <AiOutlineCheckCircle className="text-[#2E2F5B] text-[20px]" />
                    <span className="text-[#475467] text-[.9rem]">
                      {item.feature5}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
