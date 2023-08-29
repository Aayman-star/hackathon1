import React from "react";
import Cart from "./Cart";
import { cookies } from "next/headers";

const page = () => {
  /*THIS IS THE SECTION WHERE I AM FETCHING DATA FROM THE DATABASE*/
  const myCookie = cookies();
  console.log("COOKIE");
  //This is where you fetch the user_id
  const myCookieOne = myCookie.get("user_id")?.value as string;
  console.log(`Cookie/userID from the Cart page :`, myCookieOne);
  return (
    <div>
      <Cart userId={myCookieOne} />
    </div>
  );
};

export default page;
