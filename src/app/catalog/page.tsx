"use client";

import React from "react";
import NextLink from "next/link";
import { useSearch } from "../context/searchContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import Filters from "./filters";
import { supabase } from "../../lib/supabaseClient.js";

export default function Catalog() {
  const { catalogSearchQuery, setCatalogSearchQuery } = useSearch();

  const [allProducts, setAllProducts] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [categories, setCategories] = useState([]); // Состояние для категорий
  const [filters, setFilters] = useState({
    categoryIds: [], // Используем массив ID категорий
    manufacturers: [],
    minPrice: "",
    maxPrice: "",
    availability: "all",
  });

  const [sortCriteria, setSortCriteria] = useState<"name" | "price">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Загрузка продуктов
  const fetchProducts = async () => {
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select(
        "*, price_history(price), product_types(id, name, entry_parent_id)"
      )
      .order("id", { ascending: true });

    if (productsError) {
      console.error("Error fetching products: ", productsError.message);
      return [];
    }

    const productsWithPrices = productsData.map((product) => ({
      ...product,
      productName: product.product_name,
      imageURL: product.image_URL,
      price:
        product.price_history.length > 0
          ? product.price_history[0].price
          : null,
    }));

    setAllProducts(productsWithPrices);
    setSortedData(productsWithPrices);
  };

  // Загрузка категорий
  const fetchCategories = async () => {
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("product_types")
      .select("id, name, entry_parent_id") // Убедитесь, что entry_parent_id включен в выборку
      .order("id", { ascending: true });

    if (categoriesError) {
      console.error("Error fetching categories: ", categoriesError.message);
      return [];
    }

    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Применение фильтров
  const applyFilters = (products) => {
    let filtered = [...products];

    // Удаляем пустые значения из фильтров
    const validCategoryIds = filters.categoryIds.filter((id) => id !== "");

    // Фильтрация по категориям, если выбран фильтр (categoryIds не пуст)
    if (validCategoryIds.length > 0) {
      filtered = filtered.filter(
        (product) => validCategoryIds.includes(String(product.product_types.id)) // Преобразуем id в строку для сравнения
      );
    }

    // Остальные фильтры
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

    return filtered;
  };
  // Для отладки
  useEffect(() => {
    console.log("Filters:", filters);
    const filteredData = applyFilters(allProducts);
    console.log("Filtered Data:", filteredData);
    const searchedData = searchProducts(filteredData);
    console.log("Searched Data:", searchedData);
    const sorted = sortProducts(searchedData);
    console.log("Sorted Data:", sorted);
    setSortedData(sorted);
  }, [filters, catalogSearchQuery, sortCriteria, sortOrder, allProducts]);
  // Поиск и сортировка
  const searchProducts = (filteredProducts) => {
    if (!catalogSearchQuery) return filteredProducts;

    return filteredProducts.filter((product) => {
      const searchQueryLower = catalogSearchQuery.toLowerCase();
      const productNameLower = product.productName.toLowerCase();
      const descriptionLower = product.description.toLowerCase();

      return (
        productNameLower.includes(searchQueryLower) ||
        descriptionLower.includes(searchQueryLower)
      );
    });
  };

  const sortProducts = (filteredProducts) => {
    const sorted = [...filteredProducts];

    if (sortCriteria === "name") {
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

  // Обработчик изменения фильтров
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  // Обработчик изменения сортировки
  const handleSortChange = (event) => {
    const [newSortCriteria, newSortOrder] = event.target.value.split("-");
    setSortCriteria(newSortCriteria);
    setSortOrder(newSortOrder);
  };

  // Применение фильтров, поиска и сортировки
  useEffect(() => {
    const filteredData = applyFilters(allProducts);
    const searchedData = searchProducts(filteredData);
    const sorted = sortProducts(searchedData);
    setSortedData(sorted);
  }, [filters, catalogSearchQuery, sortCriteria, sortOrder, allProducts]);

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} categories={categories} />
      <div className="pt-6 pb-2 mb-4 mx-auto pl-4 pr-4 sm:mr-4 sm:ml-4 lg:ml-32 lg:mr-32 mt-4 shadow-xl rounded-lg px-4 bg-white">
        <title>Catalog</title>
        <h1 className="text-4xl font-regular">Catalog</h1>
        <div className="mt-4 mb-4">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search the catalog. For example, 'paint'"
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
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="price-asc">Sort by Price (Low to High)</option>
            <option value="price-desc">Sort by Price (High to Low)</option>
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
                      src={product.imageURL || "/default-image.png"}
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
                      {product.amount > 0 ? "In stock" : "Out of stock"}
                    </p>
                    <Button className="text-black bg-yellow font-regular text-xl normal-case mt-4 w-24 h-16 rounded-lg leading-6">
                      {product.price !== null
                        ? product.price
                        : "Contact for price"}{" "}
                      <br />
                      {product.price !== null ? "rub./" + product.uom_id : ""}
                    </Button>
                  </div>
                </div>
              </div>
            </NextLink>
          ))
        ) : (
          <p className="text-center mt-4">No products found for your query.</p>
        )}{" "}
      </div>
    </div>
  );
}
