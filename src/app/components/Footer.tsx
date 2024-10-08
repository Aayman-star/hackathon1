import React from "react";
import Image from "next/image";
import logo from "/public/Logo.webp";
//import { link } from "fs";

const Footer = () => {
  const Company: string[] = [
    "About",
    "Terms of Use",
    "Privacy Policy",
    "How it works",
    "Contact Us",
  ];
  const Contact: string[] = ["WhatsApp", "support 24h"];
  const Support: string[] = ["Support Center", "24 hour service", "Quick Chat"];
  return (
    <>
      <div className="w-full h-100 sm:mt-8 grid place-content-center">
        <div className="grid grid-cols-1 justify-items-center p-4 sm:grid-cols-2  md:max-w-6xl md:mx-auto lg:grid-cols-4">
          <div className="w-3/4 p-2 sm:justify-self-end md:justify-self-start">
            <Image className="mb-7" src={logo} alt="logo" />
            <p className="text-gray-500">
              Small, artisan label that offers a thoughtfully curated collection
              of high quality everyday essentials made.
            </p>
          </div>
          <div className="mb-2 ml-14 justify-self-start  md:justify-self-center flex flex-col gap-y-2">
            <h3 className="font-semibold text-gray-700 text-lg">Company</h3>
            <ul className="space-y-2 text-gray-500">
              {Company.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2 ml-14 md:ml-28 justify-self-start md:justify-self-start flex flex-col gap-y-2">
            <h3 className="font-semibold text-gray-700 text-lg">Support</h3>
            <ul className="space-y-4 text-gray-500">
              {Support.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2 ml-14 justify-self-start md:justify-self-center flex flex-col gap-y-2">
            <h3 className="font-semibold text-gray-700 text-lg">Contact</h3>
            <ul className="space-y-4 text-gray-500">
              {Contact.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full md:max-w-6xl md:mx-auto mt-24 sm:mt-10 h-10 p-4 border-t-[1px] border-t-gray-500">
        <div className="w-full  md:max-w-6xl md:mx-auto p-4">
          <p className="text-zinc-500 text-center">
            Copyright © 2023 Dine Market
          </p>
          {/* <p className="text-lg font-normal text-gray-400">
            Design by : the m@dcoder
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
