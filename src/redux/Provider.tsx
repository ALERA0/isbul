"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
