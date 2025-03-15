"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button, Link } from "@mui/material";
import { useSearch } from "../context/searchContext";
import { supabase } from "@/lib/supabaseClient";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./menu";

// Вынесенный компонент для мобильного поискового попапа
const MobileSearchPopup = ({
  isOpen,
  onClose,
  searchInputRef,
  headerSearchQuery,
  handleSearchChange,
  clearSearchInput,
  filteredProducts,
}) => {
  if (!isOpen) return null;

  return (
    <header className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full h-full rounded-tl-lg rounded-tr-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-3 z-50 text-gray-600 hover:text-gray-900 rounded-full bg-red-700 shadow-md hover:shadow-lg transition-all duration-300 text-white"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        {/* Search Bar */}
        <div className="px-4 pt-4 relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Поиск товаров..."
            className="w-full h-[50px] rounded-full bg-gray-100 ring-2 ring-slate-400 pl-4 pr-12 text-black text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={headerSearchQuery}
            onChange={handleSearchChange}
          />
          {headerSearchQuery && (
            <button
              onClick={clearSearchInput}
              className="absolute right-20 top-8 pt-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-[60vh] overflow-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <NextLink key={product.id} href={`/catalog/${product.id}`}>
                <div className="p-4 bg-white shadow-md rounded-md mb-3 ml-2 mr-2 hover:bg-[#fdf3e1] cursor-pointer flex items-center space-x-3">
                  <Image
                    src={product.image_URL}
                    alt={product.product_name}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="text-lg font-medium">
                      {product.product_name}
                    </p>
                    <p className="text-sm text-gray-500">{product.price}</p>
                  </div>
                </div>
              </NextLink>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Ничего не найдено
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const Header = () => {
  const { headerSearchQuery, setHeaderSearchQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: products, error } = await supabase
          .from("products")
          .select("*");

        if (error) {
          throw error;
        }

        const productsWithPrices = await Promise.all(
          products.map(async (product) => {
            const { data: priceData, error: priceError } = await supabase
              .from("price_history")
              .select("price")
              .eq("product_id", product.id)
              .order("period", { ascending: false })
              .limit(1)
              .maybeSingle();

            if (priceError) {
              console.error(
                "Error fetching price for product:",
                product.id,
                priceError
              );
              return { ...product, price: "Цена не найдена" };
            }

            return { ...product, price: priceData?.price || "Цена не найдена" };
          })
        );

        setProducts(productsWithPrices);
        setFilteredProducts(productsWithPrices);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setHeaderSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.product_name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const clearSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
    setHeaderSearchQuery("");
    setFilteredProducts(products);
  };

  return (
    <div className="bg-brown text-black font-regular flex justify-between items-center mx-auto px-8 lg:px-32 py-4">
      <Link component={NextLink} href="/" className="flex items-center pr-8">
        <Image
          src="/lsk-logo white.svg"
          alt="Logo"
          width={125}
          height={125}
          priority
        />
      </Link>

      {/* Desktop Search Bar */}
      <div className="hidden lg:flex items-center w-1/2 relative">
        <div className="w-full relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Найти товар..."
            className="w-full rounded-full bg-white shadow-sm px-4 py-3 text-black text-base outline-none pr-10"
            value={headerSearchQuery}
            onChange={handleSearchChange}
          />
          {headerSearchQuery && (
            <button
              onClick={clearSearchInput}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-white bg-red-500 rounded-full hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        {headerSearchQuery && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-1 rounded-lg max-h-60 overflow-auto z-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <NextLink key={product.id} href={`/catalog/${product.id}`}>
                  <div className="p-2 hover:bg-[#fdf3e1] cursor-pointer flex items-center space-x-3 border-b last:border-b-0">
                    <Image
                      src={product.image_URL}
                      alt={product.product_name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <div className="flex flex-col">
                      <p className="text-xl font-medium">
                        {product.product_name}
                      </p>
                      <p className="text-base text-gray-500">
                        {product.amount > 0
                          ? `${product.price}`
                          : "Нет в наличии"}
                      </p>
                    </div>
                  </div>
                </NextLink>
              ))
            ) : (
              <div className="p-4 text-gray-500">Ничего не найдено</div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Button onClick={() => setIsSearchPopupOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 128 128"
            className="fill-white"
          >
            <path d="M 52.349609 14.400391 C 42.624609 14.400391 32.9 18.1 25.5 25.5 C 10.7 40.3 10.7 64.399219 25.5 79.199219 C 32.9 86.599219 42.600391 90.300781 52.400391 90.300781 C 62.200391 90.300781 71.900781 86.599219 79.300781 79.199219 C 94.000781 64.399219 93.999219 40.3 79.199219 25.5 C 71.799219 18.1 62.074609 14.400391 52.349609 14.400391 z M 52.300781 20.300781 C 60.500781 20.300781 68.700391 23.399219 74.900391 29.699219 C 87.400391 42.199219 87.4 62.5 75 75 C 62.5 87.5 42.199219 87.5 29.699219 75 C 17.199219 62.5 17.199219 42.199219 29.699219 29.699219 C 35.899219 23.499219 44.100781 20.300781 52.300781 20.300781 z M 52.300781 26.300781 C 45.400781 26.300781 38.9 29 34 34 C 29.3 38.7 26.700391 44.800391 26.400391 51.400391 C 26.300391 53.100391 27.600781 54.4 29.300781 54.5 L 29.400391 54.5 C 31.000391 54.5 32.300391 53.199609 32.400391 51.599609 C 32.600391 46.499609 34.699219 41.799219 38.199219 38.199219 C 41.999219 34.399219 47.000781 32.300781 52.300781 32.300781 C 54.000781 32.300781 55.300781 31.000781 55.300781 29.300781 C 55.300781 27.600781 54.000781 26.300781 52.300781 26.300781 z M 35 64 A 3 3 0 0 0 32 67 A 3 3 0 0 0 35 70 A 3 3 0 0 0 38 67 A 3 3 0 0 0 35 64 z M 83.363281 80.5 C 82.600781 80.5 81.850781 80.800391 81.300781 81.400391 C 80.100781 82.600391 80.100781 84.499609 81.300781 85.599609 L 83.800781 88.099609 C 83.200781 89.299609 82.900391 90.6 82.900391 92 C 82.900391 94.4 83.8 96.700391 85.5 98.400391 L 98.300781 111 C 100.10078 112.8 102.39922 113.69922 104.69922 113.69922 C 106.99922 113.69922 109.29961 112.79961 111.09961 111.09961 C 114.59961 107.59961 114.59961 101.90039 111.09961 98.400391 L 98.300781 85.599609 C 96.600781 83.899609 94.300391 83 91.900391 83 C 90.500391 83 89.2 83.300391 88 83.900391 L 85.5 81.400391 C 84.9 80.800391 84.125781 80.5 83.363281 80.5 z M 91.900391 88.900391 C 92.700391 88.900391 93.5 89.200781 94 89.800781 L 106.69922 102.5 C 107.89922 103.7 107.89922 105.59922 106.69922 106.69922 C 105.49922 107.89922 103.6 107.89922 102.5 106.69922 L 89.800781 94.099609 C 89.200781 93.499609 88.900391 92.700391 88.900391 91.900391 C 88.900391 91.100391 89.200781 90.300781 89.800781 89.800781 C 90.400781 89.200781 91.100391 88.900391 91.900391 88.900391 z"></path>
          </svg>
        </Button>
        <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon className="text-white w-14 h-14" />
        </Button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link
          component={NextLink}
          href="/about"
          className="text-white text-3xl no-underline hover:underline hover:underline-offset-8 hover:decoration-orange-500"
        >
          О нас
        </Link>
        <Link
          component={NextLink}
          href="/catalog"
          className="text-white text-3xl no-underline hover:underline hover:underline-offset-8 hover:decoration-orange-500"
        >
          Каталог
        </Link>
        <Link component={NextLink} href="/request">
          <Button className="text-white text-xl font-bold px-4 py-4 rounded-lg bg-gradient-to-tr from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500">
            Оставить заявку
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Component */}
      <Menu isMenuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />

      {/* Conditionally Render Mobile Search Popup */}
      {isSearchPopupOpen && (
        <MobileSearchPopup
          isOpen={isSearchPopupOpen}
          onClose={() => setIsSearchPopupOpen(false)}
          searchInputRef={searchInputRef}
          headerSearchQuery={headerSearchQuery}
          handleSearchChange={handleSearchChange}
          clearSearchInput={clearSearchInput}
          filteredProducts={filteredProducts}
        />
      )}
    </div>
  );
};

export default Header;
