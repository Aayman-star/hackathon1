"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/Logo.webp";
import CartButton from "./CartButton";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchCartItems } from "../store/slice/cartSlice";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const dispatch = useDispatch<AppDispatch>();
  const userId = getCookie("user_id") as string;
  useEffect(() => {
    dispatch(fetchCartItems(userId));
  }, [dispatch, userId]);
  const { totalItems } = useSelector((state: RootState) => state.cartSlice);
  //const { totalItems } = useSelector((state: RootState) => state.cartSlice);
  const [tItems, setTItems] = useState(totalItems);
  const [toggle, setToggle] = useState(false);
  const navLinksLarge = [
    { id: 1, title: "Female", link: "/Products/Female" },
    { id: 2, title: "Male", link: "/Products/Male" },
    { id: 3, title: "All Products", link: "/Products/All" },
  ];
  const navLinksMobile = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "Female", link: "/Products/Female" },
    { id: 3, title: "Male", link: "/Products/Male" },
    { id: 4, title: "All Products", link: "/Products/All" },
  ];
  const inActiveLink = ``;
  const activeLink = `bg-zinc-800 text-zinc-100 px-2 py-1 rounded-md`;
  return (
    <>
      {/* Mobile Nav Bar */}
      <header className="w-full py-8 px-4 lg:hidden">
        <nav className="w-full p-2 mx-auto flex flex-wrap items-center justify-between">
          <Link href={"/"}>
            {" "}
            <Image src={Logo} alt="Logo" width={140} height={25} />
          </Link>
          {!toggle ? (
            <button onClick={() => setToggle(!toggle)}>
              <Bars3Icon className="w-7 h-7 text-zinc-700" />
            </button>
          ) : (
            <div className="w-full h-screen -mt-10 bg-white relative">
              <button
                className="absolute top-4 right-4"
                onClick={() => setToggle(!toggle)}>
                <XMarkIcon className="w-7 h-7 text-zinc-700" />
              </button>
              <div className="mt-10 p-4 mb-10 flex flex-col gap-y-9 items-center">
                <div onClick={() => setToggle(!toggle)} className="relative">
                  <span className="absolute right-1 top-0 rounded-full bg-zinc-800 w-5 h-5 text-white text-xs text-center grid place-content-center">
                    {!isNaN(totalItems) && totalItems}
                  </span>
                  <CartButton />
                </div>
                <ul className="flex flex-col gap-y-4 text-md font-medium">
                  {navLinksMobile.map((link, i) => (
                    <Link
                      key={link.id}
                      href={link.link}
                      onClick={() => setToggle(!toggle)}
                      className="text-zinc-800">
                      {link.title}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </nav>
      </header>
      {/* Desktop NavBar */}
      <header className="hidden lg:block w-full py-8 bg-white">
        <nav className="max-w-6xl p-2 mx-auto flex items-center space-x-20">
          {/* <h1 className="text-3xl font-bold text-purple-600">Dine Market</h1> */}
          <Link href={"/"}>
            {" "}
            <Image src={Logo} alt="Logo" width={140} height={25} />
          </Link>

          <ul className="flex items-center space-x-10 text-md font-medium">
            {navLinksLarge.map((link, i) => (
              <Link
                className={`transform transition-all hover:scale-105 duration-300  ${
                  pathname === link.link
                    ? "bg-zinc-800 text-zinc-100 px-2 py-1 rounded-md font-light"
                    : "text-zinc-800"
                }`}
                key={link.id}
                href={link.link}>
                {link.title}
              </Link>
            ))}
          </ul>
          <Input />
          <div className="relative transform transition-all hover:scale-110 duration-200 ">
            <span>
              <span className="absolute right-1 top-0 rounded-full bg-zinc-800 w-5 h-5 text-white text-xs grid place-content-center">
                {/* {!isNaN(tItems) && tItems} */}
                {!isNaN(totalItems) && totalItems}
              </span>
              <CartButton />
            </span>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
