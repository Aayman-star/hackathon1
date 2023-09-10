import React from "react";
import Image from "next/image";
import heroImage from "public/header.webp";
import fOne from "public/Featured1.webp";
import fTwo from "public/Featured2.webp";
import fThree from "public/Featured3.webp";
import fFour from "public/Featured4.webp";
import Link from "next/link";

const Hero = () => {
  return (
    // <div className="w-full min-h-screen p-4">
    //   <div className="w-full  min-h-screen lg:max-w-7xl mx-auto bg-white lg:flex justify-between items-center">
    //     {/* left Portion of the Hero Section */}
    //     <div className=" w-full p-2 flex-auto flex flex-col space-y-8  lg:flex-none lg:w-1/2 ml-0 lg:p-8  lg:space-y-12">
    //       <button className="self-start px-2 md:px-4 py-1 font-semibold text-lg bg-blue-200 text-blue-600 rounded-md">
    //         Sale 70%
    //       </button>
    //       {/* This div is added to make the heading responsive */}
    //       <div className="p-2 flex-auto md:flex-none">
    //         <h1 className="text-4xl font-bold  md:text-heroHeading md:leading-heroHeight">
    //           An Industrial Take on Streetwear
    //         </h1>
    //       </div>
    //       <h3 className="text-gray-600 font-regular">
    //         Anyone can beat you but no one can beat your outfit as long as you
    //         wear Dine outfits.
    //       </h3>
    //       <Link href={"/Products/All"}>
    //         <button className="self-start flex items-center justify-center bg-zinc-900 text-white px-8 py-4 font-semibold border-2 shadow-sm">
    //           <svg
    //             className="w-5 h-5 font-bold"
    //             aria-hidden="true"
    //             fill="none"
    //             stroke="currentColor"
    //             stroke-width="1.5"
    //             viewBox="0 0 24 24"
    //             xmlns="http://www.w3.org/2000/svg">
    //             <path
    //               d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"></path>
    //           </svg>
    //           Start Shopping
    //         </button>
    //       </Link>
    //       <div className="flex justify-between">
    //         <Image src={fOne} alt="Featured Image" />
    //         <Image src={fTwo} alt="Featured Image" />
    //         <Image src={fThree} alt="Featured Image" />
    //         <Image src={fFour} alt="Featured Image" />
    //       </div>
    //     </div>
    //     {/* Right Portion of the hero image containing the image */}
    //     {/* <div className="hidden lg:w-1/2  lg:block">
    //       <Image
    //         className=" bg-heroBg rounded-full"
    //         src={heroImage}
    //         alt="hero-image"
    //         width={650}
    //         height={650}
    //       />
    //     </div> */}
    //   </div>
    // </div>
    <>
      <div className="max-w-full p-2">
        <div className="w-4/5  mx-auto p-4 bg-zinc-50 lg:flex items-center justify-between">
          {/* Left Div */}
          <div className="flex flex-col items-start gap-y-4 lg:flex-1">
            <p className="bg-blue-300 px-4 py-2 rounded-md text-blue-800 font-semibold">
              SALE 70%
            </p>

            <h1 className="text-5xl text-zinc-800 font-bold">
              {" "}
              An Industrial Take on Streetwear
            </h1>
            <p className="text-zinc-600">
              Anyone can beat you but no one can beat your outfit as long as you
              wear Dine outfits.
            </p>
            <Link href={"/Products/All"}>
              <button className="flex items-center justify-center bg-zinc-900 text-white px-8 py-4 font-semibold rounded-md border-2 shadow-sm">
                <svg
                  className="w-5 h-5 font-bold"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"></path>
                </svg>
                Start Shopping
              </button>
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Image src={fOne} alt="Featured Image" />
              <Image src={fTwo} alt="Featured Image" />
              <Image src={fThree} alt="Featured Image" />
              <Image src={fFour} alt="Featured Image" />
            </div>
          </div>
          {/* Right Div which has the image */}
          <div className="hidden lg:block flex-1">
            <Image
              className=" bg-heroBg rounded-full"
              src={heroImage}
              alt="hero-image"
              width={650}
              height={650}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
