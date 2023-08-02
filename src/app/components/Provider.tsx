"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
