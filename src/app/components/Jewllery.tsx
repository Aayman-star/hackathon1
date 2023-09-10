import React from "react";
import Image from "next/image";
import Link from "next/link";
import dp from "/public/feature.webp";

const Jewllery = () => {
  return (
    <>
      {/* Master div */}
      <div className="max-w-full p-2 lg:mt-10">
        {/* Main housing div */}
        <div className="w-4/5 mx-auto flex flex-col gap-y-4 lg:flex-row items-center justify-between">
          {/* Left Div */}
          <div className="lg:flex-1">
            <h1 className="text-7xl lg:text-[7rem] leading-loose lg:leading-none tracking-wide lg:tracking-tighter font-bold text-gray-400/30">
              Different From Others
            </h1>{" "}
            <div className="w-3/4 -mt-96 md:-mt-[16rem] lg:-mt-80 grid lg:grid-cols-[repeat(2,auto)] gap-y-2 lg:gap-x-14 lg:gap-y-10">
              <div>
                <h2 className="font-bold text-lg lg:text-xl">
                  Using Good Quality Materials
                </h2>
                <p className="text-sm lg:text-base">
                  lorem ipsum doler set amet,consectetor adipicing elit.
                </p>
              </div>
              <div className="text-zinc-800">
                <h2 className="font-bold text-lg lg:text-xl">
                  100% Handmade Products
                </h2>
                <p className="text-sm lg:text-base">
                  lorem ipsum doler set amet,consectetor adipicing elit.
                </p>
              </div>
              <div>
                <h2 className="font-bold text-lg lg:text-xl">
                  Modern Fashion Design
                </h2>
                <p className="text-sm lg:text-base">
                  lorem ipsum doler set amet,consectetor adipicing elit.
                </p>
              </div>
              <div>
                <h2 className="font-bold text-lg lg:text-xl">
                  Discount for Bulk orders
                </h2>
                <p className="text-sm lg:text-base">
                  lorem ipsum doler set amet,consectetor adipicing elit.
                </p>
              </div>
            </div>
          </div>
          {/* Right Div */}
          <div className="flex-1">
            <h2 className="text-4xl text-zinc-900 font-bold  md:text-4xl mb-4">
              Unique and Authentic Vintage Designer Jewllery
            </h2>{" "}
            <div className="p-2 flex flex-col space-y-2 md:flex-row space-x-6 items-center">
              <div className="md:w-1/2">
                <Image src={dp} alt="Display Pixture" />
              </div>
              <div className=" flex flex-col space-y-4 items-center md:w-1/2 ">
                <p className="text-gray-700 font-light">
                  This piece is ethically crafted in our small family-owned
                  workshop in Peru with unmatched attention to detail and care.
                  The Natural color is the actual natural color of the fiber,
                  undyed and 100% traceable.
                </p>
                <Link
                  className="bg-zinc-800 text-zinc-100 px-10 py-2 rounded-sm hover:scale-105"
                  href={"./Products/All"}>
                  See All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jewllery;

// the code below if of the previous non-responsive design
// <div className="w-full p-2 flex flex-col md:max-w-7xl mx-auto md:flex-row items-center justify-between ">
//   {/* Left side of the design */}
//   <div className="md:w-1/2">
//     <h1 className="text-[7rem] leading-none tracking-tighter font-bold text-gray-400/20">
//       Different From Others
//     </h1>
//     <div className="w-3/4 h-full -mt-80 grid grid-cols-[repeat(2,auto)] gap-x-14 gap-y-10">
//       <div>
//         <h2 className="font-bold text-xl">Using Good Quality Materials</h2>
//         <p>lorem ipsum doler set amet,consectetor adipicing elit.</p>
//       </div>
//       <div>
//         <h2 className="font-bold text-xl">100% Handmade Products</h2>
//         <p>lorem ipsum doler set amet,consectetor adipicing elit.</p>
//       </div>
//       <div>
//         <h2 className="font-bold text-xl">Modern Fashion Design</h2>
//         <p>lorem ipsum doler set amet,consectetor adipicing elit.</p>
//       </div>
//       <div>
//         <h2 className="font-bold text-xl">Discount for Bulk orders</h2>
//         <p>lorem ipsum doler set amet,consectetor adipicing elit.</p>
//       </div>
//     </div>
//   </div>

//   {/* Right side of the design */}
//   <div className="md:w-1/2 flex flex-col">
//     {/* Adjusting the headin */}
//     <h2 className="text-4xl text-zinc-900 font-bold md:w-2/3 md:text-4xl mb-4">
//       Unique and Authentic Vintage Designer Jewllery
//     </h2>

//     <div className="p-2 flex flex-col space-y-2 md:flex-row space-x-6 items-center">
//       <div className="md:w-1/2">
//         <Image src={dp} alt="Display Pixture" />
//       </div>
//       <div className=" flex flex-col space-y-4 items-center md:w-1/2 ">
//         <p className="text-gray-700 font-light">
//           This piece is ethically crafted in our small family-owned workshop
//           in Peru with unmatched attention to detail and care. The Natural
//           color is the actual natural color of the fiber, undyed and 100%
//           traceable.
//         </p>
//         <Link
//           className="bg-zinc-800 text-zinc-100 px-10 py-2 rounded-sm hover:scale-105"
//           href={"./Products/All"}>
//           See All Products
//         </Link>
//       </div>
//     </div>
//   </div>
//</div>
