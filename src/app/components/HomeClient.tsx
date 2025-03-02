"use client";

import { useEffect, useState, useRef } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { supabase } from "@/lib/supabaseClient";

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

export default function HomeClient({ products }: { products: Product[] }) {
  const mainProducts = products.filter((product) => product.is_main_item);
  const [images, setImages] = useState<string[]>([]);

  // Состояния для верхнего Swiper'а
  const [timeLeftTop, setTimeLeftTop] = useState<number>(6000);
  const [activeIndexTop, setActiveIndexTop] = useState<number>(0);
  const topSwiperRef = useRef<any>(null);

  // Состояния для нижнего Swiper'а
  const bottomSwiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const imageUrls = await res.json();
      setImages(imageUrls);
    };
    fetchImages();
  }, []);

  // Логика для верхнего Swiper'а
  useEffect(() => {
    if (!topSwiperRef.current) return;

    const interval = setInterval(() => {
      setTimeLeftTop((prev) => (prev > 0 ? prev - 100 : 6000));
    }, 100);

    topSwiperRef.current.on("autoplayTimeLeft", (swiper: any, time: number) => {
      setTimeLeftTop(time);
    });

    topSwiperRef.current.on("slideChange", (swiper: any) => {
      setTimeLeftTop(6000);
      setActiveIndexTop(swiper.realIndex);
    });

    return () => clearInterval(interval);
  }, [topSwiperRef.current]);

  return (
      <div className="">
        <title>ООО "ЛСК-групп"</title>

        {/* Верхний Swiper */}
        <div className="swiper-container relative">
          {/* Текст над Swiper'ом */}
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 text-center z-50 w-full px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Строительные материалы
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-4">
              Строительные материалы на <span className="font-bold">X%</span> дешевле, чем на рынке
            </p>
            <button className="bg-white text-[#330100] py-2 px-6 rounded-full font-semibold hover:bg-opacity-90 transition">
              Оставить заявку
            </button>
          </div>

          {/* Верхний Swiper */}
          <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".swiper-button-next-top",
                prevEl: ".swiper-button-prev-top",
              }}
              loop={true}
              onSwiper={(swiper) => (topSwiperRef.current = swiper)}
          >
            {images.length > 0 ? (
                images.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative bg-cover bg-center h-screen">
                        <Image
                            src={imageUrl}
                            alt={`Image ${index}`}
                            layout="fill"
                            objectFit="cover"
                            className="absolute inset-0"
                            loading={"lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#330100] to-[#4D1B00] opacity-70"></div>
                      </div>
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide>
                  <p>Нет изображений для отображения.</p>
                </SwiperSlide>
            )}
          </Swiper>
        </div>

        {/* Нижний Swiper */}
        <div className="swiper-container m-8 drop-shadow-2xl">
          <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={3}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: ".custom-pagination",  // Здесь вы указываете класс для пагинации
              }}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              onSwiper={(swiper) => (bottomSwiperRef.current = swiper)}
          >
            {mainProducts.length > 0 ? (
                mainProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <NextLink href={`/catalog/${product.id}`} passHref>
                        <div className="relative bg-white rounded-xl items-center shadow-lg p-6 cursor-pointer overflow-hidden hover:scale-105 transition-all duration-300 h-[380px]"> {/* Фиксированная высота карточки */}
                          <Image
                              src={product.image_URL || "/default-image.png"}
                              alt={product.product_name}
                              width={150}
                              height={150}
                              className="mx-auto rounded-lg"
                          />
                          <h2 className="text-xl font-semibold text-center mt-4">{product.product_name}</h2>

                          {/* Контейнер для цены и описания */}
                          <div className="flex justify-between items-center mt-2 flex-grow">
                            <div className="text-sm text-gray-600 overflow-hidden max-w-[70%] whitespace-nowrap text-ellipsis">
                              {product.description}
                            </div>
                            <div className="text-xl font-semibold text-black ml-4">
                              {product.price !== null ? `${product.price} руб.` : "Contact for price"}
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
          {/* Пагинация для нижнего Swiper'а */}
          <div className="custom-pagination flex justify-center mt-4 p-1"></div>
          {/* Кнопка перехода в каталог */}
          <div className="flex justify-center mt-6">
            <NextLink href="/catalog">
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-6 py-3 rounded-full transition">
                Перейти в каталог
              </button>
            </NextLink>
          </div>
        </div>
      </div>
  );
}