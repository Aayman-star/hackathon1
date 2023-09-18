import React from "react";
import Cart from "./Cart";
import { cookies } from "next/headers";

const page = async () => {
  /*THIS IS THE SECTION WHERE I AM FETCHING DATA FROM THE DATABASE*/
  const myCookie = cookies();
  // console.log("COOKIE");
  //This is where you fetch the user_id
  const myCookieOne = myCookie.get("user_id")?.value as string;
  // console.log(`Cookie/userID from the Cart page :`, myCookieOne);

  // const cartItems = await getCartData(myCookieOne);

  // console.log(
  //   `THIS IS THE DATA I AM RECEVING IN THE PAGE.TSX FILE IN THE CART FOLDER:`,
  //   cartItems
  // );

  return (
    <div>
      <Cart userId={myCookieOne} />
    </div>
  );
};

export default page;
// const getCartData = async (userId: string) => {
//   const Data = await fetch(`http://localhost:3000/api/cart?user_id=${userId}`);
//   try {
//     if (!Data.ok) {
//       throw new Error("Failed to fetch Data");
//     } else {
//       const cartData = await Data.json();
//       return cartData;
//     }
//   } catch (error) {
//     console.log(`Error in fetching Data :`, error);
//   }
// };
