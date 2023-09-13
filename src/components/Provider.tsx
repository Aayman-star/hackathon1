"use client";
import { ReactNode } from "react";
import { store } from "@/app/store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

interface ProProps {
  children: ReactNode;
}

const Providers = ({ children }: ProProps) => {
  return (
    <>
      <Provider store={store}>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </Provider>
    </>
  );
};

export default Providers;
