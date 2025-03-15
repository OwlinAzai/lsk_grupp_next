"use client";

import NextLink from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Product {
  id: number;
  product_name: string;
  description: string;
  image_URL?: string;
  price: string;
  manufacturer: string;
  product_type: string;
  is_main_item: boolean;
}

export default function BottomSwiper({ products }: { products: Product[] }) {
  const mainProducts = products.filter((product) => product.is_main_item);

  return (
    <div className="swiper-container m-8 drop-shadow-2xl">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {mainProducts.length > 0 ? (
          mainProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <NextLink href={`/catalog/${product.id}`} passHref>
                <div className="relative bg-white rounded-xl items-center shadow-lg p-6 cursor-pointer overflow-hidden hover:scale-105 transition-all duration-300 h-[380px]">
                  <Image
                    src={product.image_URL || "/default-image.png"}
                    alt={product.product_name}
                    width={150}
                    height={150}
                    className="mx-auto rounded-lg"
                    loading={"lazy"}
                  />
                  <h2 className="text-xl font-semibold text-center mt-4">
                    {product.product_name}
                  </h2>
                  <div className="flex justify-between items-center mt-2 flex-grow">
                    <div className="text-sm text-gray-600 overflow-hidden max-w-[70%] whitespace-nowrap text-ellipsis">
                      {product.description}
                    </div>
                    <div className="text-xl font-semibold text-black ml-4">
                      {product.price !== null
                        ? `${product.price} руб.`
                        : "Contact for price"}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 hover:opacity-10 transition-all"></div>
                </div>
              </NextLink>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-center">Нет товаров для отображения.</p>
          </SwiperSlide>
        )}
      </Swiper>
      <div className="custom-pagination flex justify-center mt-4 p-1"></div>
      <div className="flex justify-center mt-6">
        <NextLink href="/catalog">
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-6 py-3 rounded-full transition">
            Перейти в каталог
          </button>
        </NextLink>
      </div>
    </div>
  );
}
