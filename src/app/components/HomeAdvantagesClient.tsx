"use client";

import React from "react";
import Image from "next/image";

interface AdvantageItem {
    img: string;
    name: string;
    value: string;
}

interface HomeAdvantagesClientProps {
    info: AdvantageItem[] | null;
}

const HomeAdvantagesClient: React.FC<HomeAdvantagesClientProps> = ({ info }) => {
    if (!info) return null;

    return (
        <div className="bg-gray-200 pb-12 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-36">
            <h1 className="text-4xl font-bold text-center text-black mb-12 relative underline underline-offset-8 decoration-orange-500">
                Наши преимущества
            </h1>
            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-6 max-w-8xl w-full">
                    {info.map((item, index) => (
                        <div
                            key={index} // добавить ли hover:scale-105 transition-all duration-300?
                            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center w-full sm:w-[calc(50%-12px)] md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] 2xl:w-[calc(30%-16px)] "
                        >
                            <div className="w-24 h-24 mb-4 bg-yellow-400 flex items-center justify-center rounded">
                                <Image
                                    src={item.img}
                                    alt={`Преимущество ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="w-16 h-16 object-cover"
                                />
                            </div>
                            <h2 className="text-2.5xl font-semiBold">{item.name}</h2>
                            <div className="w-full h-[3px] bg-underline-gradient rounded-full mt-2 mb-4"></div>
                            <p className="text-gray-600 text-xl font-regular">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeAdvantagesClient;