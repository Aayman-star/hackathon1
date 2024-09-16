import { getProducts } from "@/lib/Logic";
import { Image as IImage } from "sanity";
import DisplayProducts from "./DisplayProducts";

const Page = async ({ params }: { params: { label: string } }) => {
  interface IProducts {
    _id: string;
    title: "string";
    image: IImage;
    price: number;
  }
  const Category = params.label;
  const productsList: IProducts[] =
    Category === "All" ? await getProducts() : await getProducts(Category);
  /*console.log("From the products page", productsList);*/

  return (
    <div className="bg-white min-h-screen w-full p-2 grid place-content-center">
      <div className="w-full md:max-w-6xl md:mx-auto min-h-screen p-8 flex flex-wrap justify-start gap-8">
        {productsList?.map((product, i) => (
          <div key={i}>
            <DisplayProducts {...product} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
