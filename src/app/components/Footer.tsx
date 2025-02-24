import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <footer className="w-full bg-brown text-white font-regular px-4 sm:px-8 lg:px-32 pb-4 mt-8">
      <div className="border-t-2 border-orange-500 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:pl-18 lg:pr-18">
          {/* Логотип и копирайт */}
          <div className="flex flex-col justify-center items-center sm:items-center">
            <Link component={NextLink} href="/" className="text-white no-underline">
              <Image
                src="/lsk-logo white.svg"
                alt="Logo"
                width={150}
                height={75}
                priority
              />
            </Link>
            <p className="text-sm text-center sm:text-left mt-4">
              © 2024 ООО «ЛСК – Групп»
            </p>
          </div>

          {/* Секции ссылок - Для клиентов */}
          <div className="flex flex-col items-center sm:items-center">
            <h4 className="text-lg font-semibold text-orange-500 mb-4">Для клиентов</h4>
            <Link
              component={NextLink}
              href="/about#about-section"
              passHref
              className="text-white no-underline hover:text-orange-500 mb-2"
            >
              О нас
            </Link>
            <Link
              component={NextLink}
              href="/about#contacts-section"
              passHref
              className="text-white no-underline hover:text-orange-500 mb-2"
            >
              Контакты
            </Link>
            <Link
              component={NextLink}
              href="/about#legal-section"
              passHref
              className="text-white no-underline hover:text-orange-500"
            >
              Юридическая информация
            </Link>
          </div>

          {/* Каталог */}
          <div className="flex flex-col items-center sm:items-center">
            <h4 className="text-lg font-semibold text-orange-500 mb-4">Каталог</h4>
            <Link
              component={NextLink}
              href="/catalog"
              className="text-white no-underline hover:text-orange-500"
            >
              Весь каталог
            </Link>
          </div>

          {/* Время работы */}
          <div className="flex flex-col items-center sm:items-center">
            <h4 className="text-lg font-semibold text-orange-500 mb-4">Время работы</h4>
            <p className="text-white">ПН-ПТ: с 8:30 до 17:00</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

