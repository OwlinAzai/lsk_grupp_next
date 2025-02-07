"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button, Link } from "@mui/material";
import { useSearch } from "../context/searchContext";
import { data } from "../utils/data";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./menu"; // Импортируем компонент Menu

const Header = () => {
  const { headerSearchQuery, setHeaderSearchQuery } = useSearch();
  const [filteredProducts, setFilteredProducts] = useState(data.products);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние меню
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [inputWidth, setInputWidth] = useState(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (headerSearchQuery) {
      setFilteredProducts(
        data.products.filter(
          (product) =>
            product.productName
              .toLowerCase()
              .includes(headerSearchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(headerSearchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  }, [headerSearchQuery]);

  useEffect(() => {
    const updateWidth = () => {
      if (searchInputRef.current) {
        setInputWidth(searchInputRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      searchInputRef.current &&
      !searchInputRef.current.contains(e.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownVisible(headerSearchQuery.length > 0);
  }, [headerSearchQuery]);

  return (
    <div className="bg-brown text-black font-sans flex flex-wrap justify-between items-center mx-auto px-4 lg:px-32 py-4 border-b border-gray-300">
      <Link component={NextLink} href="/" className="flex items-center pr-12">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={123}
          height={60}
          priority={true}
        />
      </Link>

      <div className="relative flex items-center flex-grow max-w-xl mx-12 hidden sm:flex">
        <div className="flex w-full rounded-full bg-white shadow-sm px-4 py-2">
          <input
            ref={searchInputRef}
            type="text"
            name="search"
            id="search"
            placeholder="Найти товар..."
            className="w-full min-w-48 outline-none text-black text-base"
            value={headerSearchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 bg-white shadow-lg mt-1 rounded-lg max-h-60 overflow-auto z-10"
            style={{ width: inputWidth }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <NextLink key={product.id} href={`/catalog/${product.id}`}>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 border-b last:border-b-0">
                    <Image
                      src={product.imageURL}
                      alt={product.productName}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">
                        {product.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.amount > 0
                          ? `${product.price} ${product.currency}`
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

      <div className="hidden sm:flex items-center space-x-8">
        <Link
          component={NextLink}
          href="/about"
          className="text-white text-2xl"
        >
          О нас
        </Link>
        <Link
          component={NextLink}
          href="/catalog"
          className="text-white text-2xl"
        >
          Каталог
        </Link>
        <Link component={NextLink} href="/request" passHref>
          <Button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2 rounded-lg">
            Оставить заявку
          </Button>
        </Link>
      </div>

      {/* Кнопка для открытия меню на мобильных устройствах */}
      <div className="sm:hidden">
        <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon className="text-white" />
        </Button>
      </div>

      {/* Компонент Menu */}
      <Menu isMenuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Header;
