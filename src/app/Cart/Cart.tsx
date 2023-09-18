"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
//import { cookies } from "next/headers";
import CartDisplay from "./CartDisplay";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import cartSlice from "../store/slice/cartSlice";
import { fetchCartItems } from "../store/slice/cartSlice";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
// import { useRouter } from "next/navigation";
import CartDisplay1 from "./CartDisplay1";
import TotalPrice from "./TotalPrice";

interface CartProp {
  userId: string;
}
interface CartItem {
  productId: string;
  productQuantity: number;
  productName: string;
  pImage: string;
  iPrice: number;
}
const Cart = ({ userId }: CartProp) => {
  //const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCartItems(userId));
  }, [dispatch, userId]);

  const { CartItems, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );

  // console.log(`Here is the data from the CART ITEMS:`);
  // console.log(`FROM THE CART PAGE:`, CartItems);
  // console.log(`DETAILED INFO HERE :`);
  // console.log(CartItems.map((CartItem) => CartItem));

  return (
    <>
      <div className="min-h-screen w-full">
        <h2 className="text-3xl font-bold text-zinc-900 text-center mb-10">
          Shopping Cart
        </h2>
        <div>
          {CartItems.length ? (
            CartItems.map((item: any) => (
              <CartDisplay1
                key={item.product_id}
                productId={item.product_id}
                productQuantity={item.quantity}
                productName={item.product_name}
                pImage={item.image}
                iPrice={item.price}
                userId={userId}
              />
            ))
          ) : (
            <p className="text-center text-xl italic">Your Cart is Empty</p>
          )}
        </div>
        {CartItems.length ? (
          <div className="p-4 w-full mx-auto lg:max-w-7xl lg:mx-auto grid place-content-end">
            <TotalPrice />
          </div>
        ) : (
          ""
        )}
        <div className="mt-10 grid place-content-center">
          <Link
            href={"/"}
            className="bg-zinc-800 text-zinc-50  px-6 py-4 rounded-md shadow-lg hover:scale-110">
            Retrun to Shop
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;

/**OLD CODE WHICH IS FUNCTIONAL */
/**This is where you define it to be a cookie object*/
/**** */
// THIS IS THE SECTION WHERE I AM FETCHING DATA FROM THE DATABASE
// const myCookie = cookies();
// console.log("COOKIE");
// //This is where you fetch the user_id
// const myCookieOne = myCookie.get("user_id")?.value as string;
// console.log(myCookieOne);

// //This is where you send that cookie to the api/cart/route.ts file to get cart data
// const Data = await fetch(`/api/cart?user_id=${myCookieOne}`);
// const cartData = await Data.json();
// console.log(`Fetching Data`);
// console.log(cartData);
/**** */
// const displayData = cartData.res.map((item: any) => (
//   <p key={item.id}>
//     {item.id}--{item.user_id}--{item.product_id}
//   </p>
// ));

/**Additional code written to fetch data */
// //   const fetchData = async () => {
// //     const result = await fetch(`/api/cart?user_id=${userId}`);
// //     if (!result.ok) {
// //       console.log(`I AM HERE`);
// //       throw new Error(`Trouble fetching the data`);
// //     } else {
// //       const Result = await result.json();
// //       const { cartItems, totalPrice, totalQuantity } = Result;
// //       console.log(
// //         `RESULT FROM THE DATABASE :`,
// //         cartItems,
// //         totalQuantity,
// //         totalPrice
// //       );
// //       return Result;
// //     }
// //   };
