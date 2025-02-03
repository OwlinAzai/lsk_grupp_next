"use client";

import NextLink from "next/link";
import { useSearch } from "../context/searchContext";
import { useState, useEffect } from "react";
import { data } from "./../utils/data"; // Your product data
import Image from "next/image";
import { Button } from "@mui/material";
import Filters from "./filters"; // Import Filters component

export default function Catalog() {
  const { catalogSearchQuery, setCatalogSearchQuery } = useSearch(); // Getting search query from context

  const [sortedData, setSortedData] = useState(data.products);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    availability: "all", // Include availability in the filters
  });

  const [sortCriteria, setSortCriteria] = useState<"name" | "price">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("sortCriteria") as "name" | "price") || "name"
      );
    }
    return "name";
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sortOrder") as "asc" | "desc") || "asc";
    }
    return "asc";
  });

  // Restore filters and sorting from localStorage on mount
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters") || "{}");
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

  // Filtering products based on search query
  const filterProducts = (query: string) => {
    return data.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredData = filterProducts(catalogSearchQuery);

  // Applying filters (category, brand, price, availability)
  const applyFilters = () => {
    let filtered = [...filteredData];

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand === filters.brand);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.availability === "available") {
      filtered = filtered.filter((product) => product.quantity > 0); // Только доступные товары
    }

    return filtered;
  };

  // Sorting products by selected criteria
  const sortProducts = (filteredProducts: typeof data.products) => {
    const sorted = [...filteredProducts];

    if (sortCriteria === "name") {
      return sorted.sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else {
      return sorted.sort((a, b) =>
        sortOrder === "asc"
          ? Number(a.price) - Number(b.price)
          : Number(b.price) - Number(a.price)
      );
    }
  };

  // Apply filters and sorting when filters or search query changes
  useEffect(() => {
    const filteredAndSortedData = sortProducts(applyFilters());
    setSortedData(filteredAndSortedData);
  }, [catalogSearchQuery, sortCriteria, sortOrder, filters]);

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [newSortCriteria, newSortOrder] = value.split("-") as [
      "name" | "price",
      "asc" | "desc",
    ];

    setSortCriteria(newSortCriteria);
    setSortOrder(newSortOrder);

    // Save to localStorage
    localStorage.setItem("sortCriteria", newSortCriteria);
    localStorage.setItem("sortOrder", newSortOrder);
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };

      // Save to localStorage
      localStorage.setItem("filters", JSON.stringify(updatedFilters));

      return updatedFilters;
    });
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />{" "}
      {/* Add Filters component */}
      <div className="pt-[22px] pb-[20px] mb-[20px] ml-[14rem] mr-[14rem] shadow-xl rounded-lg px-4 bg-[#f7f7f7]">
        <title>Каталог</title>
        <h1 className="text-4xl font-regular">Каталог</h1>

        {/* Search bar */}
        <div className="mt-4 mb-4">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Поиск в Каталоге. Например, “шпатлевка”"
            className="w-full outline-none bg-transparent text-gray-600 text-base font-oswald border-b-2 border-zinc-500"
            value={catalogSearchQuery}
            onChange={(e) => setCatalogSearchQuery(e.target.value)}
          />
        </div>

        {/* Sorting */}
        <div className="mb-4">
          <select
            onChange={handleSortChange}
            className="bg-white p-2 rounded-lg shadow-xl font-oswald"
            value={`${sortCriteria}-${sortOrder}`}
          >
            <option value="name-asc" className="font-oswald">
              Sort by Name (A-Z)
            </option>
            <option value="name-desc" className="font-oswald">
              Sort by Name (Z-A)
            </option>
            <option value="price-asc" className="font-oswald">
              Sort by Price (Low to High)
            </option>
            <option value="price-desc" className="font-oswald">
              Sort by Price (High to Low)
            </option>
          </select>
        </div>

        {/* Display products */}
        {sortedData.length > 0 ? (
          sortedData.map((product) => (
            <NextLink href={`catalog/${product.id}`} passHref key={product.id}>
              <div
                className="w-full mt-[20px] mb-[10px] drop-shadow-2xl rounded-lg px-4 py-4 bg-white hover:bg-[#fdf3e1]"
                key={product.id}
              >
                <div className="flex justify-between">
                  <div className="flex pr-4 items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="wrapper w-[2px] bg-gradient-to-b from-[#EC4700] to-[#FCCA27] rounded-md"></div>
                  <div className="flex-1 ml-4 align-middle height-full">
                    <h1 className="text-2xl mt-4 font-regular">
                      {product.name}
                    </h1>
                    <p className="mt-2 font-light text-xl">
                      {product.quantity > 0 ? "В наличии" : "Нет в наличии"}
                    </p>
                    <Button className="text-black bg-yellow font-regular text-xl normal-case mt-4 w-24 h-16 rounded-lg leading-6">
                      {product.price ? product.price : "Уточняйте"} <br />
                      {product.price ? "руб./шт." : ""}
                    </Button>
                  </div>
                </div>
              </div>
            </NextLink>
          ))
        ) : (
          <p className="text-center mt-4 text-gray-600">Товары не найдены</p>
        )}
      </div>
    </div>
  );
}
