"use client";

import NextLink from "next/link";
import { useState, useEffect } from "react";
import { data } from "./../utils/data";
import Image from "next/image";

export default function Catalog() {
  const [sortedData, setSortedData] = useState(data.products);
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

  useEffect(() => {
    const sortProducts = () => {
      if (sortCriteria === "name") {
        const sortedByName = [...data.products].sort((a, b) =>
          sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        setSortedData(sortedByName);
      } else {
        const sortedByPrice = [...data.products].sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );
        setSortedData(sortedByPrice);
      }
    };

    sortProducts();

    // Save sorting preferences to localStorage
    localStorage.setItem("sortCriteria", sortCriteria);
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortCriteria, sortOrder]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [newSortCriteria, newSortOrder] = value.split("-") as [
      "name" | "price",
      "asc" | "desc",
    ];

    setSortCriteria(newSortCriteria);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="pt-[22px] pb-[20px] mb-[20px] ml-[14rem] mr-[14rem] shadow-xl rounded-lg px-4 bg-[#f3f3f3]">
      {/* Sorting dropdown */}
      <div className="mb-4">
        <select
          onChange={handleSortChange}
          className="bg-white p-2 rounded-lg shadow-xl"
          value={`${sortCriteria}-${sortOrder}`}
        >
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
          <option value="price-asc">Sort by Price (Low to High)</option>
          <option value="price-desc">Sort by Price (High to Low)</option>
        </select>
      </div>

      {/* Display sorted products */}
      {sortedData.map((product) => (
        <NextLink href={`catalog/${product.id}`} passHref key={product.id}>
          <div
            className="mt-[20px] mb-[10px] drop-shadow-2xl rounded-lg px-4 py-4 bg-white hover:bg-[#E7E9E4]"
            key={product.id}
          >
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
            />
            <div>
              <span className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 hover:border-orange-500 rounded">
                {product.price}
              </span>
            </div>
          </div>
        </NextLink>
      ))}
    </div>
  );
}
