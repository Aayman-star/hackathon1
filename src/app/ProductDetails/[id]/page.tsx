"use client";
import React from "react";
import { client } from "@/lib1/sanityClient";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import { pid } from "process";
import { useSelector, useDispatch } from "react-redux";
import cartSlice, { cartActions } from "@/app/store/slice/cartSlice";
import { RootState } from "@/app/store/store";
import { useState } from "react";
import Quantity from "../Quantity";

interface ProductDetails {
  title: string;
  price: number;
  _id: string;
  image: IImage;
  category: { name: string };
  producttype: { name: string };
}

const page = async ({ params }: { params: { id: string } }) => {
  const [Q, setQ] = useState(1);
  const increaseQ = () => {
    setQ(Q + 1);
  };
  const decreaseQ = () => {
    setQ(Q - 1);
  };
  console.log(`parent:`, Q);
  const pid = params.id;
  // const itemQuantity = useSelector(
  //   (state: RootState) => state.cartSlice.item_quantity
  // );

  const dispatch = useDispatch();

  const addToCart = () => {
    //dispatch(cartActions.addToCart({ pid: pid, itemQuantity: Q }));
  };

  const query = `*[_type == 'product' && _id == $pid]{title,price,image,category->{name}, producttype ->{ name }}`;
  //This is where the data is being fetched from the api
  const data: ProductDetails[] = await client.fetch(query, { pid: params.id });
  // console.log(data);
  // Defining the sizes
  const sizes: string[] = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="min-h-screen max-w-7xl mx-auto grid place-content-center">
      <div className="w-full flex items-start justify-between">
        <div>
          <Image
            className="hover:scale-105 duration-300"
            src={urlForImage(data[0].image).url()}
            alt="product"
            width={500}
            height={600}
          />
        </div>

        {data.map((item) => (
          <div className="w-[500px] h-[600px]  flex flex-col items-start space-y-12">
            <div className="ml-20">
              <h1 className="text-3xl text-zinc-900 font-semibold">
                {item.title}
              </h1>
              <p className="font-semibold text-xl text-gray-400">
                {/* {item.category.name} */}
                {item.producttype.name}
              </p>
            </div>
            <div className="ml-20 flex flex-col space-y-4">
              <h3 className="font-semibold text-lg">Select Size</h3>
              <div className="flex items-center">
                {sizes.map((size, i) => (
                  <span
                    className="w-8 h-8 rounded-full grid place-content-center font-semibold text-center text-gray-500 p-6 mr-4 hover:shadow-lg hover:bg-slate-200"
                    key={i}>
                    {size}
                  </span>
                ))}
              </div>
              {/* <Quantity Q1={Q} increaseQ1={increaseQ} decreaseQ1={decreaseQ} /> */}
              {/*Qunatity Component written here */}

              <div className="flex items-center gap-x-10">
                <p>Quantity : </p>
                <div className="flex items-center gap-x-4">
                  <button
                    onClick={decreaseQ}
                    className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md shadow-md">
                    -
                  </button>

                  <p>{Q}</p>

                  <button
                    onClick={increaseQ}
                    className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md shadow-md">
                    +
                  </button>
                </div>
              </div>
              {/*Quantity Component ends here*/}
            </div>

            <p className="font-semibold text-xl ml-20">
              ${item.price.toFixed(2)}
            </p>
            <div>
              <button
                onClick={addToCart}
                className="px-8 py-4 ml-20 bg-zinc-900 text-zinc-50 text-sm rounded-sm hover:scale-105">
                {" "}
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
