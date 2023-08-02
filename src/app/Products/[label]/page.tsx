import { client } from "@/lib1/sanityClient";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import DisplayProducts from "./DisplayProducts";

const getProductData = async () => {
  // const res = await client.fetch(`*[_type=='product' && Category == category]{
  //   title
  // }`);
  const res = await client.fetch(`*[_type == 'product']{
    _id,
    title,
    image,
    price
  }`);
  return res;
};

const getFemaleProducts = async () => {
  const res =
    await client.fetch(`*[_type == 'product' && category->name == 'Female']{
      _id,
    title,
    image,
    price
  }`);
  return res;
};
const getMaleProducts = async () => {
  const res =
    await client.fetch(`*[_type == 'product' && category->name == 'Male']{
      _id,
    title,
    image,
    price
  }`);
  return res;
};

const getKidsProducts = async () => {
  const res =
    await client.fetch(`*[_type == 'product' && category->name == 'Kids']{
      _id,
    title,
    image,
    price
  }`);
  return res;
};

const page = async ({ params }: { params: { label: string } }) => {
  interface IProducts {
    _id: string;
    title: "string";
    // description: "string";
    image: IImage;
    price: number;
  }
  const imgWidth = 250;
  const imgHeight = 350;
  const Category = params.label;
  const data: IProducts[] = await getProductData();
  const dataM: IProducts[] = await getMaleProducts();
  const dataF: IProducts[] = await getFemaleProducts();
  const dataK: IProducts[] = await getKidsProducts();

  return (
    <div className="bg-white min-h-screen w-full p-2 grid place-content-center">
      {/* <p className="text-2xl font-bold text-zinc-950">{params.label}</p> */}
      <div className="max-w-7xl min-h-screen mx-auto p-2 grid lg:grid-cols-4 gap-6 md:grid-cols-2 xs:grid-cols-1 place-content-center">
        {Category === "Female"
          ? data.fill.length
            ? dataF.map((item, i) => (
                <div
                  key={i}
                  className="p-2 mb-10 mr-4 flex flex-col items-center space-y-2">
                  <DisplayProducts
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    index={i}
                    _id={item._id}
                  />
                </div>
              ))
            : "No Products to show"
          : Category === "Male"
          ? dataM.length
            ? dataM.map((item, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <DisplayProducts
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    index={i}
                    _id={item._id}
                  />
                </div>
              ))
            : "No Products to show"
          : Category === "All"
          ? data.length
            ? data.map((item, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <DisplayProducts
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    index={i}
                    _id={item._id}
                  />
                </div>
              ))
            : "No Products to show"
          : dataK.length
          ? dataK.map((item, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <DisplayProducts
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  index={i}
                  _id={item._id}
                />
              </div>
            ))
          : "No Products to Show"}
      </div>
    </div>
  );
};

export default page;
