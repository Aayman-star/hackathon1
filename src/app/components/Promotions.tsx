import React from "react";
import Image from "next/image";
import img1 from "public/event1.webp";
import img2 from "public/event2.webp";
import img3 from "public/event3.webp";

const Promotions = () => {
  return (
    <>
      <div className="max-w-full p-2">
        <div className="flex flex-col items-center space-y-2 mb-10">
          <span className="text-center font-bold text-xs text-spanText leading-promoHeight">
            PROMOTIONS
          </span>
          <h2 className="text-center font-bold text-promoHeading">
            Our Promotions Events
          </h2>
        </div>
        {/* Main Housing div */}
        <div className="w-4/5 mx-auto  flex flex-col gap-y-4 lg:flex-row items-center gap-x-2">
          {/* Left Div */}
          <div className="p-2 flex flex-col gap-y-4 lg:gap-y-2 lg:flex-1">
            {/* Top Card */}
            <div className="w-full bg-cardBack flex justify-between items-center">
              <div className="ml-10">
                <h3 className="font-bold text-2xl md:text-3xl">GET UPTO 60%</h3>
                <p>For the Summer Season</p>
              </div>

              <Image src={img1} alt="event" />
            </div>
            {/* Bottom Card */}
            <div className="w-full p-12 bg-cardBack2 grid place-content-center">
              <div className="flex flex-col items-center">
                <h3 className="text-slate-50 font-extrabold text-4xl mb-4">
                  GET 30% OFF
                </h3>
                <p className="text-slate-50 mb-1">USE PROMO CODE</p>
                <button className="text-slate-50 font-bold tracking-widest bg-backButton py-2 px-10 rounded-lg">
                  DINEWEEKENDSALE
                </button>
              </div>
            </div>
          </div>
          {/* Right Div */}
          <div className="w-full flex flex-col gap-y-4 lg:flex-1 lg:flex-row gap-x-2">
            <div className="w-full lg:flex-1  bg-yellow-100 flex flex-col items-center justify-between">
              <div className="self-start p-4">
                <p>Flex SweatShirt</p>
                <p className="line-through font-semi-medium">
                  $100<span className="ml-2 font-bold text-xl">$75</span>
                </p>
              </div>

              <Image src={img2} alt="event" />
            </div>
            {/* Right Card */}
            <div className="w-full lg:flex-1 bg-gray-300 flex flex-col items-center justify-between">
              <div className="self-start p-4">
                <p>Flex Push Button Bomber</p>
                <p className="line-through font-semi-medium">
                  $225<span className="ml-2 font-bold text-xl">$190</span>
                </p>
              </div>

              <Image src={img3} alt="event" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotions;

//This code is also fucntional
// <div className="min-h-screen max-w-7xl mx-auto bg-white p-10">
//   <div className="flex flex-col items-center space-y-2">
//     <span className="text-center font-bold text-xs text-spanText leading-promoHeight">
//       PROMOTIONS
//     </span>
//     <h2 className="text-center font-bold text-promoHeading">
//       Our Promotions Events
//     </h2>
//   </div>
//   {/* Main div which will have the cards */}
//   <div className="w-full p-4 flex flex-col gap-y-2 lg:flex-row lg:space-x-6">
//     {/* Left Container */}
//     <div className="p-2 w-full flex flex-col lg:w-1/2 space-y-4">
//       {/* Top Card */}
//       <div className="w-full bg-cardBack flex justify-between items-center">
//         <div className="ml-10">
//           <h3 className="font-bold text-3xl">GET UPTO 60%</h3>
//           <p>For the Summer Season</p>
//         </div>

//         <Image src={img1} alt="event" />
//       </div>
//       {/* Bottom Card */}
//       <div className="w-full p-12 bg-cardBack2 grid place-content-center">
//         <div className="flex flex-col items-center">
//           <h3 className="text-slate-50 font-extrabold text-4xl mb-4">
//             GET 30% OFF
//           </h3>
//           <p className="text-slate-50 mb-1">USE PROMO CODE</p>
//           <button className="text-slate-50 font-bold tracking-widest bg-backButton py-2 px-10 rounded-lg">
//             DINEWEEKENDSALE
//           </button>
//         </div>
//       </div>
//     </div>
//     {/* Right Container */}
//     <div className="w-full flex flex-col gap-y-4 lg:w-1/2 lg:flex-row lg:space-x-4">
//       {/* Left Card */}
//       <div className="p-2 flex-1 lg:w-1/2 h-full bg-yellow-100 flex flex-col items-center justify-between">
//         <div className="self-start p-4">
//           <p>Flex SweatShirt</p>
//           <p className="line-through font-semi-medium">
//             $100<span className="ml-2 font-bold text-xl">$75</span>
//           </p>
//         </div>

//         <Image src={img2} alt="event" />
//       </div>
//       {/* Right Card */}
//       <div className="w-full lg:w-1/2 h-full bg-gray-300 flex flex-col items-center justify-between">
//         <div className="self-start p-4">
//           <p>Flex Push Button Bomber</p>
//           <p className="line-through font-semi-medium">
//             $225<span className="ml-2 font-bold text-xl">$190</span>
//           </p>
//         </div>

//         <Image src={img3} alt="event" />
//       </div>
//     </div>
//   </div>
// </div>
<></>;
