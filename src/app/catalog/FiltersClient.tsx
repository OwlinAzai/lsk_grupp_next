"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams, useRouter } from "next/navigation";

export default function FiltersClient({ categories, onFilterChange }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("all");
  const [productTypes, setProductTypes] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Инициализация фильтров из URL
  useEffect(() => {
    const categoryIds = searchParams.get("categoryIds")?.split(",") || [];
    const manufacturers = searchParams.get("manufacturers")?.split(",") || [];
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const availability = searchParams.get("availability") || "all";

    setSelectedType(categoryIds[0] || "");
    setSelectedManufacturers(manufacturers);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setAvailability(availability);

    const fetchData = async () => {
      const { data: typesData } = await supabase.from("product_types").select("*");
      setProductTypes(typesData || []);

      const { data: manufacturersData } = await supabase.from("manufactures").select("*");
      setManufacturers(manufacturersData || []);
    };
    fetchData();
  }, [searchParams]);

  // Обновление URL при изменении фильтров
  const updateFiltersInUrl = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    if (newFilters.categoryIds.length > 0) {
      params.set("categoryIds", newFilters.categoryIds.join(","));
    } else {
      params.delete("categoryIds");
    }

    if (newFilters.manufacturers.length > 0) {
      params.set("manufacturers", newFilters.manufacturers.join(","));
    } else {
      params.delete("manufacturers");
    }

    if (newFilters.minPrice) {
      params.set("minPrice", newFilters.minPrice);
    } else {
      params.delete("minPrice");
    }

    if (newFilters.maxPrice) {
      params.set("maxPrice", newFilters.maxPrice);
    } else {
      params.delete("maxPrice");
    }

    if (newFilters.availability !== "all") {
      params.set("availability", newFilters.availability);
    } else {
      params.delete("availability");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Обработчик изменения категории
  const handleTypeChange = async (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedType(selectedCategoryId);
    setSelectedManufacturers([]);

    const { data: childCategories } = await supabase
      .from("product_types")
      .select("id")
      .eq("entry_parents", selectedCategoryId);

    const categoryIds = childCategories
      ? [selectedCategoryId, ...childCategories.map((c) => c.id)]
      : [selectedCategoryId];

    const newFilters = {
      categoryIds,
      manufacturers: [],
      minPrice,
      maxPrice,
      availability,
    };

    updateFiltersInUrl(newFilters);
    onFilterChange(newFilters);
  };

  // Обработчик изменения производителей
  const handleManufacturerChange = (event) => {
    const manufacturerId = event.target.value;
    const isChecked = event.target.checked;
    const id = String(manufacturerId);

    const newManufacturers = isChecked
      ? [...selectedManufacturers, id]
      : selectedManufacturers.filter((selectedId) => selectedId !== id);

    const newFilters = {
      categoryIds: selectedType ? [selectedType] : [],
      manufacturers: newManufacturers,
      minPrice,
      maxPrice,
      availability,
    };

    setSelectedManufacturers(newManufacturers);
    updateFiltersInUrl(newFilters);
    onFilterChange(newFilters);
  };

  // Обработчик изменения минимальной цены
  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    const newFilters = {
      categoryIds: selectedType ? [selectedType] : [],
      manufacturers: selectedManufacturers,
      minPrice: value,
      maxPrice,
      availability,
    };

    setMinPrice(value);
    updateFiltersInUrl(newFilters);
    onFilterChange(newFilters);
  };

  // Обработчик изменения максимальной цены
  const handleMaxPriceChange = (event) => {
    const value = event.target.value;
    const newFilters = {
      categoryIds: selectedType ? [selectedType] : [],
      manufacturers: selectedManufacturers,
      minPrice,
      maxPrice: value,
      availability,
    };

    setMaxPrice(value);
    updateFiltersInUrl(newFilters);
    onFilterChange(newFilters);
  };

  // Обработчик изменения наличия
  const handleAvailabilityChange = (event) => {
    const value = event.target.value;
    const newFilters = {
      categoryIds: selectedType ? [selectedType] : [],
      manufacturers: selectedManufacturers,
      minPrice,
      maxPrice,
      availability: value,
    };

    setAvailability(value);
    updateFiltersInUrl(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="pt-6 pb-5 mx-auto sm:ml-4 pl-4 pr-4 sm:mr-4 lg:ml-32 lg:mr-32 mt-4 mb-4 shadow-xl rounded-lg px-4 bg-white">
      <h1 className="text-4xl font-regular mb-3">Фильтры</h1>

      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Категория</label>
        <select
          className="w-full p-2 border-2 border-zinc-500 focus:border-orange-400 rounded-lg"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Все</option>
          {productTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Цена</label>
        <div className="flex sm:space-x-2 lg:space-x-4">
          <input
            type="number"
            placeholder="От"
            className="w-full sm:w-1/2 p-2 mr-2 outline-none border-2 border-zinc-500 focus:border-orange-400 rounded-lg"
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

      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Производитель</label>
        <div className="flex flex-col space-y-2">
          {manufacturers.map((manufacturer) => (
            <div key={manufacturer.id} className="flex items-center">
              <input
                type="checkbox"
                id={manufacturer.id}
                value={manufacturer.id}
                checked={selectedManufacturers.includes(String(manufacturer.id))}
                onChange={handleManufacturerChange}
                className="mr-2"
              />
              <label htmlFor={manufacturer.id} className="font-light text-xl">
                {manufacturer.full_name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-regular text-xl mb-2">Наличие на складе</label>
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

