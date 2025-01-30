// context/SearchContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Типы состояния контекста
interface SearchContextType {
  headerSearchQuery: string;
  setHeaderSearchQuery: (query: string) => void;
  catalogSearchQuery: string;
  setCatalogSearchQuery: (query: string) => void;
}

// Контекст с типами
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Провайдер для оборачивания компонентов
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [headerSearchQuery, setHeaderSearchQuery] = useState<string>("");
  const [catalogSearchQuery, setCatalogSearchQuery] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{
        headerSearchQuery,
        setHeaderSearchQuery,
        catalogSearchQuery,
        setCatalogSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Хук для доступа к контексту
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
