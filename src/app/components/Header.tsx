"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "public/Logo.webp";
import Link from "next/link";
import CartButton from "./CartButton";
import { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../store/slice/cartSlice";
import { Input } from "../../../components/ui/input";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { getCookie } from "cookies-next";
import { P } from "drizzle-orm/db.d-cf0abe10";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = getCookie("user_id") as string;
  useEffect(() => {
    dispatch(fetchCartItems(userId));
  }, []);

  const { totalItems } = useSelector((state: RootState) => state.cartSlice);

  const [tItems, setTItems] = useState(totalItems);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <header className="w-full py-8 lg:hidden">
        <nav className="w-full p-2 mx-auto flex flex-wrap items-center justify-between">
          <Link href={"/"}>
            {" "}
            <Image src={Logo} alt="Logo" width={140} height={25} />
          </Link>
          {!toggle ? (
            <button onClick={() => setToggle(!toggle)}>
              <Bars3Icon className="w-5 h-5 md:w-8 md:h-8" />
            </button>
          ) : (
            <div className="w-full h-screen -mt-10 bg-zinc-50 relative">
              <button
                className="absolute top-4 right-4"
                onClick={() => setToggle(!toggle)}>
                <XMarkIcon className="w-5 h-5 md:w-8 md:h-8" />
              </button>
              <div className="mt-10 p-4 mb-10 flex flex-col gap-y-9 items-center">
                <div onClick={() => setToggle(!toggle)} className="relative">
                  <span className="absolute right-1 top-0 rounded-full bg-zinc-800 w-5 h-5 text-white text-xs text-center">
                    {!isNaN(totalItems) && totalItems}
                  </span>
                  <CartButton />
                </div>
                <ul className="flex flex-col gap-y-4 text-md font-medium">
                  <Link onClick={() => setToggle(!toggle)} href={"/"}>
                    <li className="hover:scale-110">Home</li>
                  </Link>
                  <Link
                    onClick={() => setToggle(!toggle)}
                    href={"/Products/Female"}>
                    <li className="hover:scale-110">Female</li>
                  </Link>
                  <Link
                    onClick={() => setToggle(!toggle)}
                    href={"/Products/Male"}>
                    <li className="hover:scale-110">Male</li>
                  </Link>
                  <Link
                    onClick={() => setToggle(!toggle)}
                    href={"/Products/Kids"}>
                    <li className="hover:scale-110">Kids</li>
                  </Link>

                  <Link
                    onClick={() => setToggle(!toggle)}
                    href={"/Products/All"}>
                    <li className="hover:scale-110">All Products</li>
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </nav>
      </header>
      <header className="hidden lg:block w-full py-8 bg-white">
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
              {/* {!isNaN(tItems) && tItems} */}
              {!isNaN(totalItems) && totalItems}
            </span>
            <CartButton />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

/**Code which I used to trouble shoot this component */
//console.log(`COOKIE RECEIVED IN THE HEADER FILE:${userId}`);
//const oldValue = totalItems;
// useEffect(() => {
//   dispatch(fetchCartItems(userId));
// }, [dispatch, userId]);
// const [tQty, setTQty] = useState(0);
// useEffect(() => {
//   useSelector((state: RootState) => state.cartSlice.totalItems);
//   setTQty(totalItems);
// }, []);
