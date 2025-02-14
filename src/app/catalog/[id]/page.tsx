"use client";
import React from "react";
import { Button } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SimilarProducts from "./similarProducts";
import { supabase } from "@/lib/supabaseClient";

export default function Page({ params }: { params: { id: string } }) {
  // Unwrap the params with React.use()
  const { id } = React.use(params);

  const productId = Number(id);

  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const [uom, setUOM] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const fetchUOM = async () => {
    try {
      if (product && product.uom_id) {
        const { data: uomData, error: uomError } = await supabase
          .from("unit_of_measures")
          .select("full_name")
          .eq("id", product.uom_id)
          .single();

        if (uomError) throw uomError;
        setUOM(uomData?.full_name || "Не найдены единицы измерения товара");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchManufacturer = async () => {
    try {
      if (product && product.manufacturer_id) {
        const { data: manufacturerData, error: manufacturerError } =
          await supabase
            .from("manufactures")
            .select("full_name")
            .eq("id", product.manufacturer_id)
            .single();

        if (manufacturerError) throw manufacturerError;
        setManufacturer(
          manufacturerData?.full_name || "Производитель не найден"
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      if (product && product.product_type_id) {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("product_type_id", product.product_type_id)
          .neq("id", product.id)
          .limit(4);

        if (error) throw error;
        setSimilarProducts(data);
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*, other_attributes")
          .eq("id", productId)
          .single();

        if (productError) throw productError;

        // Parse other_attributes if needed
        if (
          productData?.other_attributes &&
          typeof productData.other_attributes === "string"
        ) {
          try {
            productData.other_attributes = JSON.parse(
              productData.other_attributes
            );
          } catch (error) {
            console.error("Error parsing other_attributes:", error);
            productData.other_attributes = []; // Default to empty array if parsing fails
          }
        }
        setProduct(productData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPrice = async () => {
      try {
        const { data: priceData, error: priceError } = await supabase
          .from("price_history")
          .select("price")
          .eq("product_id", productId)
          .order("period", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (priceError) throw priceError;
        setPrice(priceData?.price || "Цена не найдена");
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
    fetchPrice();
  }, [productId]);

  useEffect(() => {
    if (product) {
      fetchUOM();
      fetchManufacturer();
      fetchSimilarProducts();
    }
  }, [product]);

  const handleAddToCart = () => {
    if (typeof window !== "undefined" && product) {
      try {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingProductIndex = existingCart.findIndex(
          (item) => item.id === product.id
        );

        if (existingProductIndex !== -1) {
          existingCart[existingProductIndex].quantity += 1;
        } else {
          existingCart.push({
            id: product.id,
            productName: product.product_name, // Ensure this field is included
            description: product.description, // Ensure this field is included
            imageURL: product.image_URL, // Ensure this field is included
            price: price, // Ensure this field is included
            currency: "BYN", // Add currency if applicable
            quantity: 1,
          });
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        alert("Товар добавлен в корзину!"); // Optional: Add a confirmation message
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Продукт не найден</div>;

  return (
    <div className="">
      <div className="pt-6 pb-5 mx-auto sm:ml-4 pl-4 pr-4 sm:mr-4 lg:ml-32 lg:mr-32 mt-4 mb-4 shadow-xl rounded-lg px-4 bg-white">
        <h1 className="font-bold text-3xl uppercase mb-4">
          {product.product_name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="w-full h-auto mb-4">
              <Image
                src={product.image_URL || "/default-image.png"}
                alt={product.product_name || "Product image"}
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
                <b>Цена:</b> {price !== null ? `${price}` : "Загрузка..."}
              </p>
              <p>
                <b>Количество:</b>{" "}
                {product.amount > 0
                  ? product.amount
                  : "Нет в наличии. Под заказ."}
              </p>
              <p>
                <b>Единица измерения:</b> {uom || "Загрузка..."}
              </p>
              <p>
                <b>Производитель:</b> {manufacturer || "Загрузка..."}
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
                  {Array.isArray(product.other_attributes) &&
                  product.other_attributes.length > 0 ? (
                    product.other_attributes.map((attribute, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">
                          {attribute.name || "Не указано"}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {attribute.value || "Не указано"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-2 border border-gray-300"
                      >
                        Характеристики не найдены
                      </td>
                    </tr>
                  )}
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
        products={similarProducts}
        currentProductId={product.id}
      />
    </div>
  );
}
