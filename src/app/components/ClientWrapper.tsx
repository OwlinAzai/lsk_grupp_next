"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { SearchProvider } from "../context/searchContext";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./breadcrumbs";

type ClientWrapperProps = {
  children: React.ReactNode;
  params: { slug?: string[] }; // Добавьте params в пропсы
};

export default function ClientWrapper({ children, params }: ClientWrapperProps) {
  const pathname = `/${params?.slug?.join("/") || ""}`;
  return (
    <Provider store={store}>
      <SearchProvider>
        <Header />
        <Breadcrumbs /> {/* Передайте params в Breadcrumbs */}
        {children}
        <Footer />
      </SearchProvider>
    </Provider>
  );
}
