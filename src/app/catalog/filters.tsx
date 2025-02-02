"use client";

import { useState, useEffect } from "react";
import { data } from "../utils/data";

// Создаем уникальные списки категорий и брендов
const category = [...new Set(data.products.map((product) => product.category))];
const brands = [...new Set(data.products.map((product) => product.brand))];

export default function Filters({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Функция для восстановления состояния фильтров из localStorage
  const loadFiltersFromStorage = () => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setSelectedCategory(savedFilters.category || "");
      setSelectedBrand(savedFilters.brand || "");
      setMinPrice(savedFilters.minPrice || "");
      setMaxPrice(savedFilters.maxPrice || "");
    }
  };

  // Восстановление фильтров при монтировании компонента
  useEffect(() => {
    loadFiltersFromStorage();
  }, []);

  // Функция для сохранения состояния фильтров в localStorage
  const saveFiltersToStorage = (filters) => {
    localStorage.setItem("filters", JSON.stringify(filters));
  };

  // Обработчик изменения категории
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    const filters = {
      category: newCategory,
      brand: selectedBrand,
      minPrice,
      maxPrice,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters); // Сохраняем фильтры
  };

  // Обработчик изменения бренда
  const handleBrandChange = (event) => {
    const newBrand = event.target.value;
    setSelectedBrand(newBrand);
    const filters = {
      category: selectedCategory,
      brand: newBrand,
      minPrice,
      maxPrice,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters); // Сохраняем фильтры
  };

  // Обработчик изменения минимальной цены
  const handleMinPriceChange = (event) => {
    const newMinPrice = event.target.value;
    setMinPrice(newMinPrice);
    const filters = {
      category: selectedCategory,
      brand: selectedBrand,
      minPrice: newMinPrice,
      maxPrice,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters); // Сохраняем фильтры
  };

  // Обработчик изменения максимальной цены
  const handleMaxPriceChange = (event) => {
    const newMaxPrice = event.target.value;
    setMaxPrice(newMaxPrice);
    const filters = {
      category: selectedCategory,
      brand: selectedBrand,
      minPrice,
      maxPrice: newMaxPrice,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters); // Сохраняем фильтры
  };

  return (
    <div className="pt-[22px] pb-[20px] mb-[20px] ml-[14rem] mr-[14rem] shadow-xl rounded-lg px-4 bg-[#f7f7f7]">
      <h2 className="text-lg font-bold mb-3">Фильтры</h2>

      {/* Фильтр по категории */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Категория</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Все</option>
          {category.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Фильтр по бренду */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Бренд</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <option value="">Все</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Фильтр по цене */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Цена</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="От"
            className="w-1/2 p-2 border rounded"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            placeholder="До"
            className="w-1/2 p-2 border rounded"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
    </div>
  );
}
