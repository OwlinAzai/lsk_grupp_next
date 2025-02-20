"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { SearchProvider } from "../context/searchContext";
import Header from "./Header";
import Breadcrumbs from "./breadcrumbs";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SearchProvider>
        <Header />
        <Breadcrumbs />
        {children}
      </SearchProvider>
    </Provider>
  );
}

