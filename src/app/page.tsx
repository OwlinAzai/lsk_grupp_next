"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"; // Подключаем клиент Supabase

export default function Home() {
  const [mainProducts, setMainProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMainProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products") // Таблица в БД
          .select("*")
          .eq("is_main_item", true); // Фильтр по `is_main_item`

        if (error) throw error;

        // Для каждого товара загружаем информацию о производителе, цене и типе
        const productsWithDetails = await Promise.all(
          data.map(async (product) => {
            const manufacturer = await fetchManufacturer(product.manufacturer_id);
            const product_type = await fetchProductType(product.product_type_id);
            const price = await fetchPrice(product.id);
            return {
              ...product,
              manufacturer, // Добавляем информацию о производителе
              product_type, // Добавляем инфу о типе продукта
              price, // Добавляем цену
            };
          })
        );

        setMainProducts(productsWithDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Функция для получения имени производителя
    const fetchManufacturer = async (manufacturerId) => {
      try {
        if (manufacturerId !== undefined && manufacturerId !== null) {
          const { data: manufacturerData, error: manufacturerError } = await supabase
            .from("manufactures")
            .select("full_name")
            .eq("id", manufacturerId)
            .single();

          if (manufacturerError) throw manufacturerError;

          return manufacturerData?.full_name || "Производитель не найден";
        }
        return "Не указан";
      } catch (error) {
        setError(error.message);
        return "Производитель не найден";
      }
    };

    // Функция для получения цены продукта
    const fetchPrice = async (productId) => {
      try {
        if (productId !== undefined && productId !== null) {
          const { data: priceData, error: priceError } = await supabase
            .from("price_history")
            .select("price")
            .eq("product_id", productId)
            .order("period", { ascending: false })
            .limit(1)
            .maybeSingle();

          if (priceError) throw priceError;

          return priceData?.price || "Цена не найдена";
        }
        return "Не указана";
      } catch (error) {
        setError(error.message);
        return "Цена не найдена";
      }
    };

    // Функция для получения типа продукта
    const fetchProductType = async (productTypeId) => {
      try {
        if (productTypeId !== undefined && productTypeId !== null) {
          const { data: productTypeData, error: productTypeError } = await supabase
            .from("product_types")
            .select("name")
            .eq("id", productTypeId)
            .single();

          if (productTypeError) throw productTypeError;

          return productTypeData?.name || "Тип продукта не найден";
        }
        return "Не указан";
      } catch (error) {
        setError(error.message);
        return "Тип продукта не найден";
      }
    };

    fetchMainProducts();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="pt-[22px] ml-[14rem] mr-[14rem]">
      <title>ООО "ЛСК-групп"</title>
      <h1>Главная</h1>
      <div className="products">
        {mainProducts.map((product) => (
          <NextLink href={`catalog/${product.id}`} passHref key={product.id}>
            <div key={product.id} className="product-card">
              <Image
                src={product.image_URL || "/default-image.png"} // Поддержка дефолтного изображения
                alt={product.product_name}
                width={200}
                height={200}
                className="product-image"
              />
              <h2>{product.product_name}</h2>
              <p>{product.description}</p>
              <p>
                <strong>Цена:</strong> {product.price} BYN
              </p>
              <p>
                <strong>Производитель:</strong> {product.manufacturer || "Не указан"}
              </p>
              <p>
                <strong>Тип:</strong> {product.product_type || "Не указан"}
              </p>
            </div>
          </NextLink>
        ))}
      </div>
    </div>
  );
}

