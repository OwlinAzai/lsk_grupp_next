"use client";

import { Button } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SimilarProducts({ products, currentProductId }) {
  const currentProduct = products.find(
    (product) => product.id === currentProductId
  );
  if (!currentProduct) return <div>Товар не найден</div>;

  const filteredProducts = products.filter(
    (product) =>
      product.id !== currentProductId &&
      product.productType === currentProduct.productType
  );

  return (
    <div className="mt-2 pt-2 pb-8 flex justify-center">
      <div className="w-full max-w-screen-lg px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-orange-900">
          Похожие товары
        </h2>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-orange-700">
            Похожие товары не найдены!
          </p>
        ) : (
          <div className="relative w-full">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              spaceBetween={16} // Увеличиваем отступы для лучшего отображения на маленьких экранах
              slidesPerView={1} // По умолчанию 1 слайд на мобильных устройствах
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 16 },
                480: { slidesPerView: 1.5, spaceBetween: 24 }, // 1.5 слайда с большим отступом
                640: { slidesPerView: 2, spaceBetween: 24 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                960: { slidesPerView: 4, spaceBetween: 32 },
              }}
              className="w-full relative"
              slideToClickedSlide={true}
            >
              {filteredProducts.map((product) => (
                <SwiperSlide key={product.id} className="flex justify-center">
                  <NextLink href={`/catalog/${product.id}`} passHref>
                    <div className="rounded-lg bg-white shadow-lg p-2 sm:p-4 w-48 sm:w-60 hover:bg-gray-100 transition duration-300">
                      <div className="flex justify-center">
                        <Image
                          src={product.imageURL}
                          alt={product.productName}
                          width={60}
                          height={60}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm font-semibold text-center text-gray-900 mt-2">
                        {product.productName}
                      </h3>
                      <div className="flex justify-center mt-2">
                        <span className="bg-yellow-400 text-gray-900 text-xs sm:text-sm font-bold px-2 py-1 rounded">
                          {product.price} {product.currency} / шт.
                        </span>
                      </div>
                    </div>
                  </NextLink>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Кнопки управления вынесены за пределы слайдера */}
            <div className="custom-swiper-button-prev absolute top-1/2 left-[-15px] sm:left-[-30px] transform -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition">
              ❮
            </div>
            <div className="custom-swiper-button-next absolute top-1/2 right-[-15px] sm:right-[-30px] transform -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition">
              ❯
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
