import React from "react";
import { client } from "@/lib1/sanityClient";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import { cookies } from "next/headers";

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
  //const [Q, setQ] = useState(1);

  //console.log(`parent:`, Q);
  const pid = params.id;

  const addToCart = () => {
    //   dispatch(cartActions.addToCart({ pid: pid, itemQuantity: Q }));
  };

  /*THIS IS THE SECTION WHERE I AM FETCHING DATA FROM THE DATABASE*/
  const myCookie = cookies();
  // console.log("COOKIE");
  //This is where you fetch the user_id
  const myCookieOne = myCookie.get("user_id")?.value as string;
  // console.log(myCookieOne);

  const query = `*[_type == 'product' && _id == $pid]{title,price,image,category->{name}, producttype ->{ name }}`;
  //This is where the data is being fetched from the api
  const data: ProductDetails[] = await client.fetch(query, { pid: params.id });
  //console.log(`IMAGE FROM THE PRODUCTS PAGE : `, data[0].image);
  // Defining the sizes
  const sizes: string[] = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="min-h-screen max-w-7xl mx-auto grid place-content-center">
      <div className="w-full flex flex-col items-start gap-y-4 lg:flex-row lg:items-start justify-between">
        <div className="self-center lg:self-start">
          {/* Image for mobile screen */}
          <Image
            className=" hover:scale-105 duration-300 object-cover md:hidden"
            src={urlForImage(data[0].image).url()}
            sizes="100vw"
            width={300}
            height={350}
            alt="product"
          />
          {/* Image for medium screen */}
          <Image
            className="hidden md:block hover:scale-105 duration-300 object-cover lg:hidden"
            src={urlForImage(data[0].image).url()}
            sizes="100vw"
            width={450}
            height={500}
            alt="product"
          />
          {/* Image for large screen */}
          <Image
            className="hidden lg:block hover:scale-105 duration-300 object-cover"
            src={urlForImage(data[0].image).url()}
            sizes="100vw"
            width={500}
            height={550}
            alt="product"
          />
        </div>

        {data.map((item) => (
          <div
            key={item._id}
            className="w-[500px] h-[600px]   flex flex-col items-center gap-y-6 md:items-start md:space-y-12">
            <div className="ml-10 p-2">
              <h1 className="text-2xl font-bold md:text-3xl text-zinc-900 md:font-semibold">
                {item.title}
              </h1>
              <p className="font-semibold text-xl text-gray-400">
                {/* {item.category.name} */}
                {item.producttype.name}
              </p>
            </div>
            <div className="ml-14 lg:ml-16 lg:flex flex-col space-y-4">
              <h3 className="hidden lg:block lg:font-semibold text-lg">
                Select Size
              </h3>
              <div className="hidden lg:flex items-center">
                {sizes.map((size, i) => (
                  <span
                    className="w-8 h-8 rounded-full grid place-content-center font-semibold text-center text-gray-500 p-6 mr-4 hover:shadow-lg hover:bg-slate-200"
                    key={i}>
                    {size}
                  </span>
                ))}
              </div>
              <Quantity
                pid={params.id}
                iPrice={item.price}
                productName={item.title}
                image={urlForImage(item.image).url()}
                userId={myCookieOne}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
