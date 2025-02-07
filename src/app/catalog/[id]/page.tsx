"use client";

import { Button } from "@mui/material";
import Menu from "./../../components/menu";
import NextLink from "next/link";
import Image from "next/image";
import { data } from "./../../utils/data";
import { use } from "react";
import SimilarProducts from "./similarProducts";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const productId = Number(unwrappedParams.id);

  const product = data.products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="pt-[22px] pb-[22px] mx-4 sm:mx-[14rem] shadow-xl rounded-lg px-4 bg-white">
        <h1>Продукт не найден</h1>
        <p>Извините, этот продукт не существует.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (typeof window !== "undefined") {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProductIndex = existingCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
  };

  return (
    <div className="">
      <div className="pt-6 pb-5 mx-auto sm:ml-4 pl-4 pr-4 sm:mr-4 lg:ml-32 lg:mr-32 mt-4 mb-4 shadow-xl rounded-lg px-4 bg-white">
        <h1 className="font-bold text-3xl uppercase mb-4">
          {product.productName}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="w-full h-auto mb-4">
              <Image
                src={product.imageURL}
                alt={product.productName}
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="mb-4">
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p>
                <b>Цена:</b> {product.price} {product.currency}
              </p>
              <p>
                <b>Количество:</b>{" "}
                {product.amount > 0
                  ? product.amount
                  : "Нет в наличии. Под заказ."}
              </p>
              <p>
                <b>Единица измерения:</b> {product.unitOfMeasure}
              </p>
              <p>
                <b>Производитель:</b> {product.manufacturer}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Характеристики:</h2>
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">
                      Параметр
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      Значение
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.otherAttributes &&
                    product.otherAttributes.map((attribute, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">
                          {attribute.name !== "string"
                            ? attribute.name
                            : "Не указано"}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {attribute.value !== "string"
                            ? attribute.value
                            : "Не указано"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Контакты:</h2>
              <p>
                <b>Компания:</b> ООО "ЛСК-Групп"
              </p>
              <p>
                <b>Телефоны:</b>
              </p>
              <ul>
                <li>-375 (29) 278-23-43 МГС Восхилий Николаевич</li>
                <li>-375 (17) 243-91-59 Рабочий телефон</li>
                <li>-375 (29) 173-05-54 А1 Игорь Болеславович</li>
              </ul>
              <p>
                <b>Контактное лицо:</b> Германский Игорь Болеславович
              </p>
              <p>
                <b>Адрес:</b> г. Минск, ул. Селицкого 23, Минск, Беларусь
              </p>
              <p>
                <b>Email:</b> lskgruponlin@gmail.com
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 hover:border-orange-500 rounded mt-2"
                onClick={handleAddToCart}
              >
                Добавить в корзину
              </Button>
              <NextLink href="/catalog">
                <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 hover:border-orange-500 rounded mt-2">
                  Вернуться
                </Button>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts
        key={product.id}
        products={data.products}
        currentProductId={product.id}
      />
    </div>
  );
}
