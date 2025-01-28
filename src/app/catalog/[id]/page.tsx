"use client"; // Указываем, что это компонент клиента

import { Button } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import { data } from "./../../utils/data";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using `use()`
  const unwrappedParams = use(params);
  const product = data.products[Number(unwrappedParams.id)];

  // Проверка на существование продукта
  if (!product) {
    return (
      <div className="pt-[22px] pb-[22px] ml-[14rem] mr-[14rem] shadow-xl rounded-lg px-4 bg-white">
        <h1>Продукт не найден</h1>
        <p>Извините, этот продукт не существует.</p>
      </div>
    );
  }

  // Функция для добавления товара в localStorage
  const handleAddToCart = () => {
    if (typeof window !== "undefined") {
      // Получаем текущую корзину из localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Добавляем новый продукт в корзину
      existingCart.push(product);

      // Сохраняем обновленную корзину в localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
  };

  return (
    <div className="pt-[22px] pb-[22px] ml-[14rem] mr-[14rem] shadow-lg rounded-lg px-4 bg-white">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Цена: {product.price}</p>
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <Button
        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 hover:border-orange-500 rounded mt-2"
        onClick={handleAddToCart}
      >
        Добавить в корзину
      </Button>
      <br />
      {/* Avoid nested <a> tags by using only NextLink */}
      <NextLink href="/catalog">
        <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 hover:border-orange-500 rounded mt-2">
          Вернуться
        </Button>
      </NextLink>
    </div>
  );
}
