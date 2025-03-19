"use client";

import { useEffect, useState } from "react";
import HomeInfoClient from "./HomeInfoClient";
import BottomSwiper from "@/app/components/BottomSwiper";
import TopSwiper from "@/app/components/TopSwiper";
import HomeAdvantagesClient from "@/app/components/HomeAdvantagesClient";

interface HomeClientProps {
    products: Product[];
    homeInfo: InfoItem[] | null;
    homeAdvantage: AdvantageItem[] | null; // Определите тип для homeAdvantage
}

export default function HomeClient({ products, homeInfo, homeAdvantage }: HomeClientProps) {
    const [images, setImages] = useState<string[]>([]);
    const [isTopSwiperLoaded, setIsTopSwiperLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("/api/images");
                if (!res.ok) throw new Error("Failed to fetch images");
                const imageUrls = await res.json();
                setImages(imageUrls);
                setIsTopSwiperLoaded(true);
            } catch (error) {
                console.error("Error fetching images:", error);
                setError("Failed to load images. Please try again later.");
            }
        };
        fetchImages();
    }, []);

    console.log("Home Advantage Data:", homeAdvantage); // Проверка данных

    return (
        <div>
            <title>ООО "ЛСК-групп"</title>

            {/* Верхний Swiper */}
            <TopSwiper initialImages={images} />

            {/* Остальная часть страницы отрисовывается только после загрузки TopSwiper */}
            {isTopSwiperLoaded ? (
                <>
                    {/* HomeInfoClient, отображаемый только если есть данные */}
                    {homeInfo && (
                        <div className="home-info-container">
                            <HomeInfoClient info={homeInfo} />
                        </div>
                    )}
                    {/* HomeAdvantagesClient, отображаемый только если есть данные */}
                    {homeAdvantage && homeAdvantage.length > 0 && (
                        <div className="home-advantage-container">
                            <HomeAdvantagesClient info={homeAdvantage} />
                        </div>
                    )}
                    {/* Нижний Swiper */}
                    <BottomSwiper products={products} />
                </>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </div>
    );
}