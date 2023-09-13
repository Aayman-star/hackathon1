"use client";
import React, { useState } from "react";

const Page = () => {
  const [testVar, setTestVar] = useState(1);
  console.log(`hello here I am : ${testVar}`);
  return (
    <div className="flex justify-around mx-auto">
      <button
        className="bg-amber-500 text-zinc-50 px-2 py-2 rounded-md shadow-md"
        onClick={() => setTestVar((prev) => prev - 1)}>
        -
      </button>
      <p>{testVar}</p>
      <button
        className="bg-amber-500 text-zinc-50 px-2 py-2 rounded-md shadow-md"
        onClick={() => setTestVar((prev) => prev + 1)}>
        +
      </button>
    </div>
  );
};

export default Page;
