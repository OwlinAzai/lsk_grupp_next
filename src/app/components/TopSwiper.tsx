"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface TopSwiperProps {
  initialImages?: string[];
}

export default function TopSwiper({ initialImages }: TopSwiperProps) {
  const [images, setImages] = useState<string[]>([]);
  const topSwiperRef = useRef<any>(null);
  const [timeLeftTop, setTimeLeftTop] = useState<number>(6000);
  const [activeIndexTop, setActiveIndexTop] = useState<number>(0);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const imageUrls = await res.json();
      setImages(imageUrls);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (!topSwiperRef.current) return;

    const interval = setInterval(() => {
      setTimeLeftTop((prev) => (prev > 0 ? prev - 100 : 6000));
    }, 100);

    topSwiperRef.current.on("autoplayTimeLeft", (_: any, time: number) => {
      setTimeLeftTop(time);
    });

    topSwiperRef.current.on("slideChange", (swiper: any) => {
      setTimeLeftTop(6000);
      setActiveIndexTop(swiper.realIndex);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="swiper-container relative">
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 text-center z-50 w-full px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Строительные материалы
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-4">
          Строительные материалы на <span className="font-bold">X%</span>{" "}
          дешевле, чем на рынке
        </p>
        <button className="bg-white text-[#330100] py-2 px-6 rounded-full font-semibold hover:bg-opacity-90 transition">
          Оставить заявку
        </button>
      </div>

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
                  loading="lazy"
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
  );
}
