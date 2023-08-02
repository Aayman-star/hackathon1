import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import CartDisplay from "./CartDisplay";
// interface cartProps {
//   id: number;
//   user_id: string;
//   product_id: string;
//   quantity: number;
// }

const page = async () => {
  //This is where you define it to be a cookie object
  const myCookie = cookies();
  console.log("COOKIE");
  //This is where you fetch the user_id
  const myCookieOne = myCookie.get("user_id")?.value as string;
  console.log(myCookieOne);

  //This is where you send that cookie to the api/cart/route.ts file to get cart data
  const Data = await fetch(
    `http://localhost:3000/api/cart?user_id=${myCookieOne}`
  );
  const cartData = await Data.json();
  console.log(`Fetching Data`);
  console.log(cartData);
  // const displayData = cartData.res.map((item: any) => (
  //   <p key={item.id}>
  //     {item.id}--{item.user_id}--{item.product_id}
  //   </p>
  // ));

  // flex flex-col space-y-10 items-center

  return (
    <div className="min-h-screen w-full">
      <h2 className="text-3xl font-bold text-zinc-900 text-center mb-10">
        Shopping Cart
      </h2>
      <div>
        {cartData.res.length ? (
          cartData.res.map((item: any) => (
            <CartDisplay
              productId={item.product_id}
              productQuantity={item.quantity}
            />
          ))
        ) : (
          <p className="text-center text-xl italic">Your Cart is Empty</p>
        )}
      </div>
      <div className="mt-10 grid place-content-center">
        <Link
          href={"/"}
          className="bg-zinc-800 text-zinc-50  px-6 py-4 rounded-md shadow-lg hover:scale-110">
          Retrun to Shop
        </Link>
      </div>
    </div>
  );
};

export default page;
