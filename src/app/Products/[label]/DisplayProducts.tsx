"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";

interface DisplayData {
  _id: string;
  index: number;
  price: number;
  title: string;
  image: IImage;
}

const DisplayProducts = ({ _id, title, image, index, price }: DisplayData) => {
  const imgWidth = 300;
  const imgHeight = 400;

  return (
    <div className="mx-4">
      <Link href={`/ProductDetails/${_id}`}>
        <Image
          className="transform transition-all hover:scale-105 duration-300"
          src={urlForImage(image).url()}
          alt="product"
          width={imgWidth}
          height={imgHeight}
        />
      </Link>

      <div className="w-[300px] flex flex-col justify-center items-start my-2">
        <Link href={`/ProductDetails/${_id}`}>
          <h3 className="font-regular text-md" key={index}>
            {title}
          </h3>
        </Link>
        <p className="font-bold text-lg text-gray-800">${price}</p>
      </div>
      {/* <button
        // onClick={() => addToCart(_id)}
        className="px-2 py-1 bg-zinc-900 text-zinc-50 text-sm rounded-sm hover:scale-105">
        {" "}
        Add to Cart
      </button> */}
    </div>
  );
};

export default DisplayProducts;
