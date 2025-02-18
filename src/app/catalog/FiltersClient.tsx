"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient.js";

export default function FiltersClient({ onFilterChange }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("all");
  const [productTypes, setProductTypes] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: typesData } = await supabase.from("product_types").select("*");
      setProductTypes(typesData || []);

      const { data: manufacturersData } = await supabase.from("manufactures").select("*");
      setManufacturers(manufacturersData || []);
    };
    fetchData();
  }, []);

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

    onFilterChange({ categoryIds, manufacturers: [], minPrice, maxPrice, availability });
  };

  const handleManufacturerChange = (event) => {
    const manufacturerId = event.target.value;
    const isChecked = event.target.checked;
    const id = String(manufacturerId);

    const newManufacturers = isChecked
      ? [...selectedManufacturers, id]
      : selectedManufacturers.filter((selectedId) => selectedId !== id);

    setSelectedManufacturers(newManufacturers);
    onFilterChange({ categoryIds: selectedType ? [selectedType] : [], manufacturers: newManufacturers, minPrice, maxPrice, availability });
  };

  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    setMinPrice(value);
    onFilterChange({ categoryIds: selectedType ? [selectedType] : [], manufacturers: selectedManufacturers, minPrice: value, maxPrice, availability });
  };

  const handleMaxPriceChange = (event) => {
    const value = event.target.value;
    setMaxPrice(value);
    onFilterChange({ categoryIds: selectedType ? [selectedType] : [], manufacturers: selectedManufacturers, minPrice, maxPrice: value, availability });
  };

  const handleAvailabilityChange = (event) => {
    const value = event.target.value;
    setAvailability(value);
    onFilterChange({ categoryIds: selectedType ? [selectedType] : [], manufacturers: selectedManufacturers, minPrice, maxPrice, availability: value });
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

