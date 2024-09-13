//?? Backend functions used throughout the code base

import { client } from "@/lib1/sanityClient";
export const getProducts = async (category: string = "") => {
  const res = await client.fetch(
    `*[_type == 'product' ${category ? "&& category->name == $category" : ""}]{
    _id,
    title,
    image,
    price
  }`,
    { category }
  );
  return res;
};
