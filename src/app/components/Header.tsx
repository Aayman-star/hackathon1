"use client";
import React from "react";
import Image from "next/image";
import Logo from "public/Logo.webp";
import Link from "next/link";
import CartButton from "./CartButton";
import { Input } from "../../../components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Header = () => {
  const { totalItems } = useSelector((state: RootState) => state.cartSlice);
  return (
    <header className="w-full py-8 bg-white">
      <nav className="max-w-7xl p-2 mx-auto flex items-center space-x-20">
        {/* <h1 className="text-3xl font-bold text-purple-600">Dine Market</h1> */}
        <Link href={"/"}>
          {" "}
          <Image src={Logo} alt="Logo" width={140} height={25} />
        </Link>

        <ul className="flex items-center space-x-10 text-md font-medium">
          <Link href={"/Products/Female"}>
            <li className="hover:scale-110">Female</li>
          </Link>
          <Link href={"/Products/Male"}>
            <li className="hover:scale-110">Male</li>
          </Link>
          <Link href={"/Products/Kids"}>
            <li className="hover:scale-110">Kids</li>
          </Link>

          <Link href={"/Products/All"}>
            <li className="hover:scale-110">All Products</li>
          </Link>
        </ul>
        <Input />
        <div className="relative">
          <span className="absolute right-1 top-0 rounded-full bg-zinc-800 w-5 h-5 text-white text-xs text-center">
            {totalItems}
          </span>
          <CartButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
