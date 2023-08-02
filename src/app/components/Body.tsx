import React from "react";
import Hero from "./Hero";
import Promotions from "./Promotions";
import Jewllery from "./Jewllery";
import { fileURLToPath } from "url";

// this is the component which will have all other components of the page and only this component will be rendered on the page file...
const Body = () => {
  return (
    <div>
      <Hero />
      <Promotions />
      <Jewllery />
    </div>
  );
};

export default Body;
