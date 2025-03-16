"use client";

import React from "react";
import Image from "next/image";

interface InfoItem {
  img: string;
  value: string;
}

interface HomeInfoClientProps {
  info: InfoItem[] | null;
}

const HomeInfoClient: React.FC<HomeInfoClientProps> = ({ info }) => {
  if (!info) return null;

  return (
    <div className="bg-gray-200 py-12 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-36">
      {/* Заголовок */}
      <h1 className="text-4xl font-bold text-center text-black mb-12 relative underline underline-offset-8 decoration-orange-500">
        Кто мы и что предлагаем?
      </h1>

      {/* Контент */}
      <div className="flex flex-col space-y-12">
        {info.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-6 md:gap-12`}
          >
            {/* Изображение */}
            {item.img ? (
              <div className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0">
                <Image
                  src={item.img}
                  alt="Company Info"
                  width={534}
                  height={356}
                  className="w-full h-auto object-cover rounded-3xl drop-shadow-black drop-shadow-2xl"
                />
              </div>
            ) : (
              <div className="w-full md:w-1/2 lg:w-2/5 h-64 bg-gray-300 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            {/* Текст */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              <h1 className="font-regular lg:text-3xl text-black leading-relaxed md:text-2xl sm:text-xl text-justify">
                {item.value}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeInfoClient;
