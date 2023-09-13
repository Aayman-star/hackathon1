"use client";
import { ReactNode } from "react";
import { store } from "@/app/store/store";
import { Provider } from "react-redux";

interface ProProps {
  children: ReactNode;
}

const Providers = ({ children }: ProProps) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default Providers;
