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

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalItems } = useSelector((state: RootState) => state.cartSlice);
  const oldValue = totalItems;
  const [tItems, setTItems] = useState(totalItems);
  useEffect(() => {
    setTItems(totalItems);
  }, [totalItems]);

  // useEffect(() => {
  //   dispatch(fetchCartItems(userId));
  // }, [dispatch, userId]);
  // const [tQty, setTQty] = useState(0);
  // useEffect(() => {
  //   useSelector((state: RootState) => state.cartSlice.totalItems);
  //   setTQty(totalItems);
  // }, []);
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
            {/* {!isNaN(tItems) && tItems} */}
            {!isNaN(tItems) && tItems}
          </span>
          <CartButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
