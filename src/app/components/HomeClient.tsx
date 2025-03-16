"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import HomeInfoClient from "./HomeInfoClient";
import BottomSwiper from "@/app/components/BottomSwiper";
import TopSwiper from "@/app/components/TopSwiper";

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

export default function HomeClient({
                                       products,
                                       homeInfo,
                                   }: {
    products: Product[];
    homeInfo: any;
}) {
    const [images, setImages] = useState<string[]>([]);
    const [isTopSwiperLoaded, setIsTopSwiperLoaded] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            const res = await fetch("/api/images");
            const imageUrls = await res.json();
            setImages(imageUrls);
            setIsTopSwiperLoaded(true); // Устанавливаем флаг загрузки
        };
        fetchImages();
    }, []);

    return (
        <div>
            <title>ООО "ЛСК-групп"</title>

            {/* Верхний Swiper */}
            <TopSwiper initialImages={images} />

            {/* Остальная часть страницы отрисовывается только после загрузки TopSwiper */}
            {isTopSwiperLoaded && (
                <>
                    {/* HomeInfoClient, отображаемый только если есть данные */}
                    {homeInfo && (
                        <div className="home-info-container">
                            <HomeInfoClient info={homeInfo} />
                        </div>
                    )}

                    {/* Нижний Swiper */}
                    <BottomSwiper products={products} />
                </>
            )}
        </div>
    );
}