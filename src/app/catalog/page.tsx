"use client";

import NextLink from "next/link";
import { useSearch } from "../context/searchContext";
import { useState, useEffect } from "react";
import { data } from "./../utils/data"; // Your product data
import Image from "next/image";
import { Button } from "@mui/material";
import Filters from "./filters"; // Import Filters component
import { manufacturers, productTypes } from "@/db/schema/products";

// Компонент для отображения звезд
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating); // Количество полных звезд
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Полузвезда, если дробная часть >= 0.5
  const emptyStars = 5 - fullStars - halfStar; // Пустые звезды

  return (
    <div className="flex">
      {/* Полные звезды */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={`full-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="text-yellow-500"
            viewBox="0 0 16 16"
          >
            <path d="M8 12.146l-3.6 2.4 1.2-4.4-3.6-2.8h4.4l1.2-4.4 1.2 4.4h4.4l-3.6 2.8 1.2 4.4-3.6-2.4z" />
          </svg>
        ))}
      {/* Полузвезда */}
      {halfStar === 1 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="text-yellow-500"
          viewBox="0 0 16 16"
        >
          <path d="M8 12.146l-3.6 2.4 1.2-4.4-3.6-2.8h4.4l1.2-4.4 1.2 4.4h4.4l-3.6 2.8 1.2 4.4-3.6-2.4z" />
        </svg>
      )}
      {/* Пустые звезды */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={`empty-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="text-gray-400"
            viewBox="0 0 16 16"
          >
            <path d="M8 12.146l-3.6 2.4 1.2-4.4-3.6-2.8h4.4l1.2-4.4 1.2 4.4h4.4l-3.6 2.8 1.2 4.4-3.6-2.4z" />
          </svg>
        ))}
    </div>
  );
};

export default function Catalog() {
  const { catalogSearchQuery, setCatalogSearchQuery } = useSearch(); // Getting search query from context

  const [sortedData, setSortedData] = useState(data.products);
  const [filters, setFilters] = useState({
    productTypes: "",
    manufacturers: [],
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

  // Apply filters
  const applyFilters = () => {
    let filtered = [...data.products];

    if (filters.productTypes) {
      filtered = filtered.filter(
        (product) => product.productType === filters.productTypes
      );
    }

    if (filters.manufacturers.length > 0) {
      filtered = filtered.filter((product) =>
        filters.manufacturers.includes(product.manufacturer)
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
      filtered = filtered.filter((product) => product.amount > 0); // Только доступные товары
    }

    return filtered;
  };

  // Function to filter products based on search query
  const searchProducts = (filteredProducts) => {
    if (!catalogSearchQuery) return filteredProducts; // If no search query, return all filtered products

    return filteredProducts.filter((product) => {
      const searchQueryLower = catalogSearchQuery.toLowerCase();
      const productNameLower = product.productName.toLowerCase();
      const productTypeLower = product.productType.toLowerCase();
      const manufacturerLower = product.manufacturer.toLowerCase();

      // Search across product name, type, and manufacturer
      return (
        productNameLower.includes(searchQueryLower) ||
        productTypeLower.includes(searchQueryLower) ||
        manufacturerLower.includes(searchQueryLower)
      );
    });
  };

  // Sorting
  const sortProducts = (filteredProducts: typeof data.products) => {
    const sorted = [...filteredProducts];

    if (sortCriteria === "productName") {
      return sorted.sort((a, b) =>
        sortOrder === "asc"
          ? a.productName.localeCompare(b.productName)
          : b.productName.localeCompare(a.productName)
      );
    } else {
      return sorted.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilters = {}) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      localStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  // Handle sort criteria change
  const handleSortChange = (event) => {
    const [newSortCriteria, newSortOrder] = event.target.value.split("-");
    setSortCriteria(newSortCriteria);
    setSortOrder(newSortOrder);

    // Save in localStorage
    localStorage.setItem("sortCriteria", newSortCriteria);
    localStorage.setItem("sortOrder", newSortOrder);
  };

  useEffect(() => {
    const filteredData = applyFilters();
    const searchedData = searchProducts(filteredData); // Apply search query
    const sortedData = sortProducts(searchedData);
    setSortedData(sortedData);
  }, [filters, catalogSearchQuery, sortCriteria, sortOrder]);

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <div className="pt-6 pb-2 mb-4 mx-auto pl-4 pr-4 sm:mr-4 sm:ml-4 lg:ml-32 lg:mr-32 mt-4 shadow-xl rounded-lg px-4 bg-white">
        <title>Каталог</title>
        <h1 className="text-4xl font-regular">Каталог</h1>
        <div className="mt-4 mb-4">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Поиск в Каталоге. Например, “шпатлевка”"
            className="w-full outline-none bg-white text-gray-600 text-base font-oswald border-2 h-10 pl-2 pr-2 rounded-lg border-zinc-500 focus:border-orange-400"
            value={catalogSearchQuery}
            onChange={(e) => setCatalogSearchQuery(e.target.value)}
          />
        </div>

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

        {sortedData.length > 0 ? (
          sortedData.map((product) => (
            <NextLink href={`catalog/${product.id}`} passHref key={product.id}>
              <div
                className="w-full mt-5 mb-3 drop-shadow-2xl rounded-lg px-4 py-4 bg-white hover:bg-[#fdf3e1] sm:flex sm:justify-between sm:items-center sm:z-20"
                key={product.id}
              >
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="flex pr-4 items-center">
                    <Image
                      src={product.imageURL}
                      alt={product.productName}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="wrapper w-[2px] bg-gradient-to-b from-[#EC4700] to-[#FCCA27] rounded-md sm:h-full sm:my-auto"></div>
                  <div className="flex-1 ml-4 align-middle height-full">
                    <h1 className="text-2xl mt-4 font-regular">
                      {product.productName}
                    </h1>
                    <p className="mt-2 font-light text-xl">
                      {product.amount > 0 ? "В наличии" : "Нет в наличии"}
                    </p>

                    {/* Отображаем рейтинг в виде звезд */}
                    <RatingStars rating={product.rating || 0} />

                    <Button className="text-black bg-yellow font-regular text-xl normal-case mt-4 w-24 h-16 rounded-lg leading-6">
                      {product.price ? product.price : "Уточняйте"} <br />
                      {product.price ? "руб./" + product.unitOfMeasure : ""}
                    </Button>
                  </div>
                </div>
              </div>
            </NextLink>
          ))
        ) : (
          <p className="text-center mt-4">Нет продуктов по вашему запросу.</p>
        )}
      </div>
    </div>
  );
}
