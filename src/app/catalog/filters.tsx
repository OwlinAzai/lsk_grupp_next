"use client";

import { useState, useEffect } from "react";
import { data } from "../utils/data";

// Создаем уникальные списки категорий и брендов
const category = [...new Set(data.products.map((product) => product.category))];

// Функция для получения количества товаров по каждому бренду
const getBrandCounts = () => {
  const counts = {};
  data.products.forEach((product) => {
    counts[product.brand] = (counts[product.brand] || 0) + 1;
  });
  return counts;
};

const brandCounts = getBrandCounts();

export default function Filters({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]); // Массив для нескольких брендов
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("all");

  // Функция для восстановления состояния фильтров из localStorage
  const loadFiltersFromStorage = () => {
    const savedFilters = JSON.parse(localStorage.getItem("filters") as string);
    if (savedFilters) {
      setSelectedCategory(savedFilters.category || "");
      setSelectedBrands(savedFilters.brands || []); // Восстанавливаем выбранные бренды
      setMinPrice(savedFilters.minPrice || "");
      setMaxPrice(savedFilters.maxPrice || "");
      setAvailability(savedFilters.availability || "all");
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
      brands: selectedBrands, // Теперь массив брендов
      minPrice,
      maxPrice,
      availability,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters);
  };

  // Обработчик изменения выбранных брендов
  const handleBrandChange = (event) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;

    let newSelectedBrands;
    if (isChecked) {
      newSelectedBrands = [...selectedBrands, brand];
    } else {
      newSelectedBrands = selectedBrands.filter(
        (selectedBrand) => selectedBrand !== brand
      );
    }

    setSelectedBrands(newSelectedBrands);
    const filters = {
      category: selectedCategory,
      brands: newSelectedBrands, // Обновляем массив брендов
      minPrice,
      maxPrice,
      availability,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters);
  };

  // Обработчик изменения минимальной цены
  const handleMinPriceChange = (event) => {
    const newMinPrice = event.target.value;
    setMinPrice(newMinPrice);
    const filters = {
      category: selectedCategory,
      brands: selectedBrands,
      minPrice: newMinPrice,
      maxPrice,
      availability,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters);
  };

  // Обработчик изменения максимальной цены
  const handleMaxPriceChange = (event) => {
    const newMaxPrice = event.target.value;
    setMaxPrice(newMaxPrice);
    const filters = {
      category: selectedCategory,
      brands: selectedBrands,
      minPrice,
      maxPrice: newMaxPrice,
      availability,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters);
  };

  // Обработчик изменения наличия
  const handleAvailabilityChange = (event) => {
    const newAvailability = event.target.value;
    setAvailability(newAvailability);
    const filters = {
      category: selectedCategory,
      brands: selectedBrands,
      minPrice,
      maxPrice,
      availability: newAvailability,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters);
  };

  return (
    <div className="pt-[22px] pb-[20px] mb-[20px] ml-[14rem] mr-[14rem] shadow-xl rounded-lg px-4 bg-[#f7f7f7]">
      <h1 className="text-4xl font-regular mb-3">Фильтры</h1>

      {/* Фильтр по категории */}
      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Категория</label>
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

      {/* Фильтр по цене */}
      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Цена</label>
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

      {/* Фильтр по бренду (несколько чекбоксов) */}
      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Бренд</label>
        <div className="flex flex-col space-y-2">
          {Object.keys(brandCounts).map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={brand}
                value={brand}
                checked={selectedBrands.includes(brand)} // Проверка, выбран ли бренд
                onChange={handleBrandChange}
                className="mr-2"
              />
              <label htmlFor={brand} className="font-light text-xl">
                {brand} ({brandCounts[brand]}) {/* Отображаем количество */}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Фильтр по наличию */}
      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">
          Наличие на складе
        </label>
        <div className="flex space-x-2">
          <input
            type="radio"
            name="availability"
            id="all"
            value="all"
            checked={availability === "all"}
            onChange={handleAvailabilityChange}
          />
          <label className="block font-light text-xl" htmlFor="all">
            Все
          </label>
        </div>
        <div className="flex space-x-2">
          <input
            type="radio"
            name="availability"
            id="available"
            value="available"
            checked={availability === "available"}
            onChange={handleAvailabilityChange}
          />
          <label className="block font-light text-xl" htmlFor="available">
            В наличии
          </label>
        </div>
      </div>
    </div>
  );
}
