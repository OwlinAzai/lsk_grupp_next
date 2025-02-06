"use client"; // Указываем, что это компонент клиента

import { Button } from "@mui/material";
import Menu from "./../../components/menu";
import NextLink from "next/link";
import Image from "next/image";
import { data } from "./../../utils/data"; // Подключаем данные
import { use } from "react"; // Импортируем use из React

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // Разворачиваем параметр id из Promise с использованием `use()`
  const unwrappedParams = use(params);
  const productId = Number(unwrappedParams.id); // Преобразуем id в число

  // Находим продукт по id
  const product = data.products.find((item) => item.id === productId);

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

      // Проверяем, есть ли уже такой продукт в корзине
      const existingProductIndex = existingCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Если товар уже есть, увеличиваем его количество на 1
        existingCart[existingProductIndex].quantity += 1;
      } else {
        // Если товара нет, добавляем его с quantity = 1
        existingCart.push({ ...product, quantity: 1 });
      }
      // Сохраняем обновленную корзину в localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
  };

  return (
    <div className="ml-[14rem] ">
      <div className="pt-[22px] pb-[22px] mb-4 mr-[14rem] shadow-lg rounded-lg px-4 bg-white">
        <title>{product.productName}</title>
        <h1 className="font-bold text-3xl uppercase">{product.productName}</h1>
        <p>{product.description}</p>
        <p>
          <b>Цена:</b> {product.price} {product.currency}
        </p>
        <p>
          <b>Количество:</b>{" "}
          {product.amount > 0 ? product.amount : "Нет в наличии. Под заказ."}
        </p>
        <p>
          <b>Единица измерения:</b> {product.unitOfMeasure}
        </p>
        <p>
          <b>Производитель:</b> {product.manufacturer}
        </p>
        <Image
          src={product.imageURL}
          alt={product.productName}
          width={300}
          height={300}
        />
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
    </div>
  );
}
