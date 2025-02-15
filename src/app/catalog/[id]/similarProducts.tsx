"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { supabase } from "@/lib/supabaseClient"; // Импортируем Supabase клиент

export default function SimilarProducts({ currentProductId }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем похожие товары из базы данных
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        // Получаем текущий товар, чтобы узнать его product_type_id
        const { data: currentProduct, error: productError } = await supabase
          .from("products")
          .select("product_type_id")
          .eq("id", currentProductId)
          .single();

        if (productError) throw productError;

        // Получаем товары с таким же product_type_id, исключая текущий товар
        const { data: similarProductsData, error: similarError } =
          await supabase
            .from("products")
            .select("*, price_history(price)")
            .eq("product_type_id", currentProduct.product_type_id)
            .neq("id", currentProductId)
            .limit(4); // Ограничиваем количество похожих товаров

        if (similarError) throw similarError;

        setSimilarProducts(similarProductsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [currentProductId]);

  if (loading) return <div>Загрузка похожих товаров...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!similarProducts || similarProducts.length === 0) {
    return (
      <p className="text-center text-orange-700">Похожие товары не найдены!</p>
    );
  }

  return (
    <div className="mt-8 mb-4 pt-2 pb-8 mx-auto flex justify-center">
      <div className="w-full max-w-screen-lg px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8 text-center text-orange-900">
          Похожие товары
        </h2>
        <div className="relative w-full flex items-center">
          {/* Кнопка влево */}
          <button className="custom-swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition">
            ❮
          </button>

          {/* Контейнер слайдера */}
          <div className="w-full px-8 sm:px-12">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              spaceBetween={8}
              slidesPerView={1}
              loop={true}
              centeredSlides={true}
              breakpoints={{
                480: { slidesPerView: 1.5, spaceBetween: 8 },
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 8,
                  centeredSlides: false,
                },
                700: {
                  slidesPerView: 2.7,
                  spaceBetween: 1,
                  centeredSlides: false,
                },
                768: { slidesPerView: 3, spaceBetween: 8 },
                830: { slidesPerView: 3, spaceBetween: 8 },
                960: { slidesPerView: 4, spaceBetween: 8 },
                1024: { slidesPerView: 4, spaceBetween: 8 },
                1280: { slidesPerView: 4, spaceBetween: 8 },
              }}
              className="w-full"
            >
              {similarProducts.map((product) => (
                <SwiperSlide key={product.id} className="flex justify-center">
                  <NextLink href={`/catalog/${product.id}`} passHref>
                    <div className="rounded-lg bg-white shadow-md p-4 sm:p-5 w-full sm:w-52 hover:bg-[#fdf3e1] transition duration-300">
                      <div className="flex justify-center mb-3">
                        <Image
                          src={product.image_URL || "/default-image.png"}
                          alt={product.product_name}
                          width={90}
                          height={90}
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm font-semibold text-center text-gray-900 mt-2 mb-2">
                        {product.product_name}
                      </h3>
                      <div className="flex justify-center">
                        <span className="bg-yellow-400 text-gray-900 text-xs sm:text-sm font-bold px-2 py-1 rounded">
                          {product.price_history?.[0]?.price ||
                            "Цена не указана"}{" "}
                          BYN
                        </span>
                      </div>
                    </div>
                  </NextLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Кнопка вправо */}
          <button className="custom-swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}
