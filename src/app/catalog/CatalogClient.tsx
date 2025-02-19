"use client";

import NextLink from "next/link";
import { useSearch } from "../context/searchContext";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import FiltersClient from "./FiltersClient";
import { debounce } from "lodash";

export default function CatalogClient({ initialProducts, categories }) {
  const { catalogSearchQuery, setCatalogSearchQuery } = useSearch();
  const [filters, setFilters] = useState({
    categoryIds: [],
    manufacturers: [],
    minPrice: "",
    maxPrice: "",
    availability: "all",
  });
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Мемоизация данных продуктов
  const filteredData = useMemo(() => {
    let filtered = [...initialProducts];
    const validCategoryIds = filters.categoryIds.filter((id) => id !== "");

    if (validCategoryIds.length > 0) {
      filtered = filtered.filter((product) =>
        validCategoryIds.includes(String(product.product_types.id))
      );
    }

    if (filters.manufacturers.length > 0) {
      filtered = filtered.filter((product) =>
        filters.manufacturers.includes(String(product.manufacturer_id))
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.availability === "available") {
      filtered = filtered.filter((product) => product.amount > 0);
    }

    if (catalogSearchQuery) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(catalogSearchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [initialProducts, filters, catalogSearchQuery]);

  // Сортировка данных с мемоизацией
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortCriteria === "name") {
        return sortOrder === "asc"
          ? a.productName.localeCompare(b.productName)
          : b.productName.localeCompare(a.productName);
      }
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
  }, [filteredData, sortCriteria, sortOrder]);

  // Отсрочка (debounce) для поиска
  const debounceSearch = useMemo(() => {
    return debounce((query) => setCatalogSearchQuery(query), 500);
  }, [setCatalogSearchQuery]);

  useEffect(() => {
    return () => {
      // Очистка debounced функции при размонтировании компонента
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  return (
    <div>
      <FiltersClient onFilterChange={setFilters} categories={categories} />
      <div className="pt-6 pb-2 mb-4 mx-auto pl-4 pr-4 sm:mr-4 sm:ml-4 lg:ml-32 lg:mr-32 mt-4 shadow-xl rounded-lg px-4 bg-white">
        <title>Catalog</title>
        <h1 className="text-4xl font-regular">Catalog</h1>
        <div className="mt-4 mb-4">
          <input
            type="text"
            placeholder="Search the catalog"
            className="w-full outline-none bg-white text-gray-600 text-base border-2 h-10 pl-2 pr-2 rounded-lg focus:border-orange-400"
            value={catalogSearchQuery}
            onChange={(e) => debounceSearch(e.target.value)} // Использование debounced функции
          />
        </div>
        <div className="mb-4">
          <select onChange={(e) => {
            const [newSortCriteria, newSortOrder] = e.target.value.split("-");
            setSortCriteria(newSortCriteria);
            setSortOrder(newSortOrder);
          }} className="bg-white p-2 rounded-lg shadow-xl">
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="price-asc">Sort by Price (Low to High)</option>
            <option value="price-desc">Sort by Price (High to Low)</option>
          </select>
        </div>
        {sortedData.length > 0 ? (
          sortedData.map((product) => (
            <NextLink href={`catalog/${product.id}`} key={product.id} passHref prefetch={true}>
              <div className="w-full mt-5 mb-3 drop-shadow-2xl rounded-lg px-4 py-4 bg-white hover:bg-[#fdf3e1] sm:flex sm:justify-between">
                <div className="flex pr-3 items-center">
                  <Image src={product.imageURL || "/default-image.png"} alt={product.productName} width={100} height={100} />
                </div>
                <div className="wrapper w-1 bg-gradient-to-b from-[#EC4700] to-[#FCCA27] rounded-full sm:h-[170px]"></div>
                <div className="flex-1 ml-4 mt-2">
                  <h1 className="text-2xl font-regular">{product.productName}</h1>
                  <p className="mt-2 font-light text-xl">
                    {product.amount > 0 ? "In stock" : "Out of stock"}
                  </p>
                  <button className="text-black bg-yellow text-xl font-regular normal-case mt-4 w-24 h-16 rounded-lg">
                    {product.price !== null ? `${product.price} rub.` : "Contact for price"}
                  </button>
                </div>
              </div>
            </NextLink>
          ))
        ) : (
          <p className="text-center mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
}

