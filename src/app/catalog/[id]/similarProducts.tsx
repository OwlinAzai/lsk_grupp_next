"use client";

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
    <div className="mt-8 mb-4 pt-2 pb-8 mx-auto flex justify-center">
      <div className="w-full max-w-screen-lg px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8 text-center text-orange-900">
          Похожие товары
        </h2>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-orange-700">Похожие товары не найдены!</p>
        ) : (
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
                spaceBetween={8} // Уменьшенные отступы между карточками
                slidesPerView={1} // Начальное значение для мобильных устройств
                loop={true}
                centeredSlides={true} // Центрирование карточек
                breakpoints={{
                // Хуй знает как, но я настроил. НЕ ТРОГАТЬ!!!
                  480: { slidesPerView: 1.5, spaceBetween: 8 }, // Телефоны
                  640: { slidesPerView: 2.2, spaceBetween: 8, centeredSlides: false },
                  700: { slidesPerView: 2.7, spaceBetween: 1, centeredSlides: false },
                  768: { slidesPerView: 3, spaceBetween: 8 },
                  830: { slidesPerView: 3, spaceBetween: 8 },
                  960: { slidesPerView: 4, spaceBetween: 8 },
                  // Для экранов больше 640px
                  1024: { slidesPerView: 4, spaceBetween: 8 }, // Ноутбуки
                  1280: { slidesPerView: 4, spaceBetween: 8 }, // Десктопы
                }}
                className="w-full"
              >
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id} className="flex justify-center">
                    <NextLink href={`/catalog/${product.id}`} passHref>
                      <div className="rounded-lg bg-white shadow-md p-4 sm:p-5 w-full sm:w-52 hover:bg-[#fdf3e1] transition duration-300">
                        <div className="flex justify-center mb-3">
                          <Image
                            src={product.imageURL}
                            alt={product.productName}
                            width={90}
                            height={90}
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <h3 className="text-xs sm:text-sm font-semibold text-center text-gray-900 mt-2 mb-2">
                          {product.productName}
                        </h3>
                        <div className="flex justify-center">
                          <span className="bg-yellow-400 text-gray-900 text-xs sm:text-sm font-bold px-2 py-1 rounded">
                            {product.price} {product.currency} / шт.
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
        )}
      </div>
    </div>
  );
}

