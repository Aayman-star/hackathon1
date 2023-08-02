import React from "react";
import Image from "next/image";
import logo from "/public/Logo.webp";
import { link } from "fs";

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
      <div className="w-full h-80 grid place-content-center">
        <div className="max-w-7xl mx-auto p-4 flex flex-wrap items-start justify-between">
          <div className="w-1/3 -ml-4 flex flex-col items-start space-y-6 justify-self-start ">
            <Image src={logo} alt="logo" />
            <p className="text-gray-500">
              Small, artisan label that offers a thoughtfully curated collection
              of high quality everyday essentials made.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-600 text-lg">Company</h3>
            <ul className="space-y-4 text-gray-500">
              {Company.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-600 text-lg">Support</h3>
            <ul className="space-y-4 text-gray-500">
              {Support.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-600 text-lg">Contact</h3>
            <ul className="space-y-4 text-gray-500">
              {Contact.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-10 p-4 border-t-2 border-t-gray-500">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <p className="text-lg font-normal text-gray-400">
            Copyright © 2023 Dine Market
          </p>
          <p className="text-lg font-normal text-gray-400">
            Design by : the m@dcoder
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
