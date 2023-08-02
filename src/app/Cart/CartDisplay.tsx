import React from "react";
import { client } from "@/lib1/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import Quantity from "../ProductDetails/displayQuantity";

interface CartProps {
  productId: string;
  productQuantity: number;
}
const CartDisplay = async ({ productId, productQuantity }: CartProps) => {
  interface ProductData {
    title: string;
    price: number;
    _id: string;
    image: IImage;
    category: { name: string };
    producttype: { name: string };
  }
  const query = `*[_type == 'product' && _id == $pid]{title,price,image,category->{name}, producttype ->{ name }}`;
  const cartItem: ProductData[] = await client.fetch(query, { pid: productId });
  console.log("Here is the data", typeof cartItem);
  console.log(cartItem);
  return (
    <div className="max-w-7xl mx-auto p-2 border-2 border-t-black">
      <div className="flex justify-center items-center gap-x-2 md:justify-between">
        {/* Image */}
        <div className="w-1/4 flex items-center gap-x-4">
          <Image
            className="hover:scale-105 duration-300"
            src={urlForImage(cartItem[0].image).url()}
            alt="product"
            width={150}
            height={100}
          />
          <div>
            <h2 className="text-xl text-zinc-900 font-medium">
              {cartItem[0].title}
            </h2>
          </div>
        </div>
        {/* Other Product Data */}
        <div className="w-3/4 flex flex-col gap-y-5 md:flex-row grow justify-around">
          <div>
            <h3 className="text-zinc-900 font-medium text-lg">
              ${cartItem[0].price.toFixed(2)}
            </h3>
          </div>
          <div className="text-zinc-900 font-medium text-lg">
            {/* <Quantity _id={productId} /> */}
          </div>
          <div>
            <h3 className="text-zinc-900 font-medium text-lg">
              ${(cartItem[0].price * productQuantity).toFixed(2)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
