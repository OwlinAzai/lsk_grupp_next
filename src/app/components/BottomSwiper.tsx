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
      <div className="swiper-container mr-8 ml-8 mb-8 drop-shadow-2xl">
          <h1 className="text-4xl font-bold text-center text-black mb-8 relative underline underline-offset-8 decoration-orange-500">
              Что можно у нас приобрести
          </h1>
          <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={3}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
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
                              <div className="relative scale-95 bg-white rounded-xl items-center drop-shadow-xl p-6 mb-4 cursor-pointer overflow-hidden hover:scale-100 transition-all duration-300 h-[380px]">
                                  <Image
                                      src={product.image_URL || "/default-image.png"}
                                      alt={product.product_name}
                                      width={150}
                                      height={150}
                                      className="mx-auto rounded-lg"
                                  />
                                  <h2 className="text-xl font-semiBold text-center mt-4">
                                      {product.product_name}
                                  </h2>
                                  <div className="flex justify-between items-center mt-2 flex-grow">
                                      <div className="text-sm font-regular text-gray-600 overflow-hidden max-w-[70%] whitespace-nowrap text-ellipsis">
                                          {product.description}
                                      </div>
                                      <div className="text-xl font-semiBold text-black ml-4">
                                          {product.price !== null
                                              ? `${product.price} руб.`
                                              : "Цена не указана"}
                                      </div>
                                  </div>
                              </div>
                          </NextLink>
                      </SwiperSlide>
                  ))
              ) : (
                  <SwiperSlide>
                      <p className="text-center font-regular">Нет товаров для отображения.</p>
                  </SwiperSlide>
              )}
          </Swiper>

          <div className="flex justify-center">
              <NextLink href="/catalog">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-semiBold px-6 py-3 rounded-full transition">
                      Перейти в каталог
                  </button>
              </NextLink>
          </div>
      </div>
  );
}
