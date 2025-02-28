"use client";

import { useEffect, useState } from "react";
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
  const [timeLeft, setTimeLeft] = useState<number>(6000); // Время в миллисекундах
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0); // Текущий активный слайд

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
          .storage
          .from("image_storage")
          .list("main_page_swiper", { limit: 100 });

      if (error) {
        console.error("Ошибка при загрузке изображений:", error);
        return;
      }

      if (data && data.length > 0) {
        const imageUrls = data.map(
            (file) =>
                `https://rvanuxehhbwvmjmrgnas.supabase.co/storage/v1/object/public/image_storage/main_page_swiper/${file.name}`
        );
        setImages(imageUrls);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!swiperInstance) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 100 : 6000));
    }, 100);

    swiperInstance.on("autoplayTimeLeft", (swiper: any, time: number) => {
      setTimeLeft(time);
    });

    swiperInstance.on("slideChange", (swiper: any) => {
      setTimeLeft(6000);
      setActiveIndex(swiper.realIndex); // Обновляем активный индекс слайда
    });

    return () => clearInterval(interval);
  }, [swiperInstance]);

  return (
      <div className="">
        <title>ООО "ЛСК-групп"</title>
        <div className="swiper-container relative">
          {/* Текст над свипером */}
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
          {/* Стрелки навигации немного багнутые. Допилить
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          */}
          <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
          >
            {images.length > 0 ? (
                images.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative bg-cover bg-center h-[865px]">
                        <Image
                            src={imageUrl}
                            alt={`Image ${index}`}
                            layout="fill"
                            objectFit="cover"
                            className="absolute inset-0"
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

          {/* Кастомные индикаторы времени в виде прямоугольников */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
            {images.map((_, index) => (
                <div
                    key={index}
                    className={`rounded-full overflow-hidden transition-all duration-300 ${
                        index === activeIndex ? "h-1.5" : "h-1.5" // Высота для активного и неактивного индикатора
                    }`}
                    style={{
                      width: "50px",
                      backgroundColor: index === activeIndex ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.2)", // Цвет для активного и неактивного
                    }}
                >
                  <div
                      className="h-full bg-white"
                      style={{
                        width: index === activeIndex ? `${((6000 - timeLeft) / 6000) * 100}%` : "0%",
                        transition: "width 0.1s linear", // Плавное изменение ширины
                      }}
                  ></div>
                </div>
            ))}
          </div>

          {/* Стрелки навигации допилить
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div> */}
        </div>

        <div className="swiper-container">
          <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop={true}
          >
            {mainProducts.length > 0 ? (
                mainProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <NextLink href={`catalog/${product.id}`} passHref>
                        <div className="product-card bg-white">
                          <Image
                              src={product.image_URL || "/default-image.png"}
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
                            <strong>Производитель:</strong> {product.manufacturer}
                          </p>
                          <p>
                            <strong>Тип:</strong> {product.product_type}
                          </p>
                        </div>
                      </NextLink>
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide>
                  <p>Нет товаров для отображения.</p>
                </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
  );
}