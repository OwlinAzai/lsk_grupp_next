"use client";

import { useState, useEffect } from "react";
import { data } from "../utils/data"; // Импорт данных

// Создаем уникальные списки категорий
const productTypes = [
  ...new Set(data.products.map((product) => product.productType)),
];

// Функция для получения количества товаров по каждому бренду
const getBrandCounts = (products) => {
  const counts = {};
  products.forEach((product) => {
    counts[product.manufacturer] = (counts[product.manufacturer] || 0) + 1;
  });
  return counts;
};

// Функция для получения брендов, которые есть в наличии
const getAvailableBrands = (products) => {
  const availableBrands = new Set();
  products.forEach((product) => {
    if (product.amount > 0) {
      // Проверяем, что товар есть в наличии
      availableBrands.add(product.manufacturer);
    }
  });
  return availableBrands;
};

export default function Filters({ onFilterChange }) {
  const [selectedType, setSelectedType] = useState(""); // Категория
  const [selectedManufacturers, setSelectedManufacturers] = useState([]); // Массив для нескольких брендов
  const [minPrice, setMinPrice] = useState(""); // Минимальная цена
  const [maxPrice, setMaxPrice] = useState(""); // Максимальная цена
  const [availability, setAvailability] = useState("all"); // Наличие на складе

  // Функция для получения товаров, относящихся к выбранной категории
  const getProductsByCategory = (productType) => {
    if (!productType) return data.products; // Если категория не выбрана, возвращаем все товары
    return data.products.filter(
      (product) => product.productType === productType
    );
  };

  // Получаем список товаров по выбранной категории
  const filteredProducts = getProductsByCategory(selectedType);

  // Получаем бренды, которые есть в наличии, если выбран параметр "В наличии"
  const availableBrands =
    availability === "available"
      ? getAvailableBrands(filteredProducts)
      : new Set(Object.keys(getBrandCounts(filteredProducts)));

  // Получаем количество товаров по брендам
  const brandCounts = getBrandCounts(filteredProducts);

  // Функция для восстановления состояния фильтров из localStorage
  const loadFiltersFromStorage = () => {
    const savedFilters = JSON.parse(localStorage.getItem("filters") || "{}");
    if (savedFilters) {
      setSelectedType(savedFilters.type || "");
      setSelectedManufacturers(savedFilters.manufacturers || []); // Восстанавливаем выбранные бренды
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
  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    setSelectedManufacturers([]); // Сбрасываем выбранные бренды при изменении категории
    const filters = {
      productTypes: newType,
      manufacturers: [], // Сбрасываем бренды
      minPrice,
      maxPrice,
      availability,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters);
  };

  // Обработчик изменения выбранных брендов
  const handleManufacturerChange = (event) => {
    const manufacturer = event.target.value;
    const isChecked = event.target.checked;

    let newSelectedManufacturers;
    if (isChecked) {
      newSelectedManufacturers = [...selectedManufacturers, manufacturer];
    } else {
      newSelectedManufacturers = selectedManufacturers.filter(
        (selectedManufacturer) => selectedManufacturer !== manufacturer
      );
    }

    setSelectedManufacturers(newSelectedManufacturers);
    const filters = {
      productTypes: selectedType,
      manufacturers: newSelectedManufacturers, // Обновляем массив брендов
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
      productTypes: selectedType,
      manufacturers: selectedManufacturers,
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
      productTypes: selectedType,
      manufacturers: selectedManufacturers,
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
      productTypes: selectedType,
      manufacturers: selectedManufacturers,
      minPrice,
      maxPrice,
      availability: newAvailability,
    };
    onFilterChange(filters);
    saveFiltersToStorage(filters);
  };

  return (
    <div className="pt-6 pb-5 mx-auto sm:ml-4 pl-4 pr-4 sm:mr-4 lg:ml-32 lg:mr-32 mt-4 mb-4 shadow-xl rounded-lg px-4 bg-white">
      <h1 className="text-4xl font-regular mb-3">Фильтры</h1>

      {/* Фильтр по категории */}
      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Категория</label>
        <select
          className="w-full p-2 border-2 border-zinc-500 focus:border-orange-400 rounded-lg"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Все</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Фильтр по цене */}
      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Цена</label>
        <div className="flex sm:space-x-2 lg:space-x-4">
          <input
            type="number"
            placeholder="От"
            className="w-full sm:w-1/2 p-2 outline-none border-2 border-zinc-500 focus:border-orange-400 rounded-lg"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            placeholder="До"
            className="w-full sm:w-1/2 p-2 outline-none border-2 border-zinc-500 focus:border-orange-400 rounded-lg"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      {/* Фильтр по бренду (несколько чекбоксов) */}
      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Бренд</label>
        <div className="flex flex-col space-y-2">
          {Object.keys(brandCounts)
            .filter(
              (manufacturer) =>
                availability === "all" || availableBrands.has(manufacturer)
            ) // Фильтруем бренды, если "В наличии"
            .map((manufacturer) => (
              <div key={manufacturer} className="flex items-center">
                <input
                  type="checkbox"
                  id={manufacturer}
                  value={manufacturer}
                  checked={selectedManufacturers.includes(manufacturer)} // Проверка, выбран ли бренд
                  onChange={handleManufacturerChange}
                  className="mr-2"
                />
                <label htmlFor={manufacturer} className="font-light text-xl">
                  {manufacturer} ({brandCounts[manufacturer]}){" "}
                  {/* Отображаем количество */}
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
            className="mr-2"
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
            className="mr-2"
          />
          <label className="block font-light text-xl" htmlFor="available">
            В наличии
          </label>
        </div>
      </div>
    </div>
  );
}
