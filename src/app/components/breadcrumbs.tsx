"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // Добавляем useState и useEffect
import { supabase } from "@/lib/supabaseClient"; // Импортируем Supabase

export default function Breadcrumbs() {
  const pathname = usePathname();
  const BreadcrumbsArray = pathname.split("/").filter(Boolean); // Убираем пустые элементы

  const [productName, setProductName] = useState<string | null>(null); // Состояние для названия продукта
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки

  // Определяем пользовательские названия для конкретных страниц
  const customTitles: Record<string, string> = {
    about: "О нас",
    catalog: "Каталог",
    request: "Заявка",
  };

  // Получаем последний элемент (ID продукта, если есть)
  const lastItem = BreadcrumbsArray[BreadcrumbsArray.length - 1];

  // Запрос к Supabase для получения названия продукта
  useEffect(() => {
    const fetchProductName = async () => {
      if (!lastItem || isNaN(Number(lastItem))) return; // Проверяем, что lastItem — это число (ID продукта)

      setLoading(true);
      try {
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("product_name")
          .eq("id", Number(lastItem))
          .single();

        if (productError) {
          throw productError;
        }

        setProductName(productData.product_name); // Устанавливаем название продукта
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductName();
  }, [lastItem]); // Зависимость от lastItem

  if (pathname === "/") {
    return null; // Ранний возврат после всех хуков
  }

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="pt-6 pb-5 mx-auto sm:ml-4 pl-4 pr-4 sm:mr-4 lg:ml-32 lg:mr-32 mt-4 mb-4 shadow-xl rounded-lg px-4 bg-white">
      <ul className="breadcrumbs flex items-center text-base md:text-xl">
        <Link className="hover:fill-orange-400" href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 64 64"
          >
            <path d="M 32 8 C 31.08875 8 30.178047 8.3091875 29.435547 8.9296875 L 8.8007812 26.171875 C 8.0357812 26.810875 7.7634844 27.925203 8.2714844 28.783203 C 8.9184844 29.875203 10.35025 30.088547 11.28125 29.310547 L 12 28.710938 L 12 47 C 12 49.761 14.239 52 17 52 L 47 52 C 49.761 52 52 49.761 52 47 L 52 28.712891 L 52.71875 29.3125 C 53.09275 29.6255 53.546047 29.777344 53.998047 29.777344 C 54.693047 29.777344 55.382672 29.416656 55.763672 28.722656 C 56.228672 27.874656 55.954891 26.803594 55.212891 26.183594 L 52 23.498047 L 52 15 C 52 13.895 51.105 13 50 13 L 48 13 C 46.895 13 46 13.895 46 15 L 46 18.484375 L 34.564453 8.9296875 C 33.821953 8.3091875 32.91125 8 32 8 z M 32 12.152344 C 32.11475 12.152344 32.228766 12.191531 32.322266 12.269531 L 48 25.369141 L 48 46 C 48 47.105 47.105 48 46 48 L 38 48 L 38 34 C 38 32.895 37.105 32 36 32 L 28 32 C 26.895 32 26 32.895 26 34 L 26 48 L 18 48 C 16.895 48 16 47.105 16 46 L 16 25.367188 L 31.677734 12.269531 C 31.771234 12.191531 31.88525 12.152344 32 12.152344 z"></path>
          </svg>
        </Link>
        <span className="breadcrumb-separator text-lg md:text-xl pl-1 md:pl-1 pr-1 md:pr-1 flex items-center">
          {"▶"}
        </span>

        {BreadcrumbsArray.map((item, index) => {
          // Проверяем, если элемент — специальная страница (например, "about" или "catalog")
          const displayName =
            customTitles[item] ||
            (index === BreadcrumbsArray.length - 1 && productName
              ? productName // Используем название продукта, если оно есть
              : item);

          return (
            <li key={index} className="mr relative flex items-center">
              <Link
                className="hover:text-orange-400 font-regular text-xl md:text-xl truncate max-w-[100px] md:max-w-none"
                href={"/" + BreadcrumbsArray.slice(0, index + 1).join("/")}
              >
                {displayName}
              </Link>
              {index < BreadcrumbsArray.length - 1 && (
                <span className="breadcrumb-separator pl-3 md:pl-4 text-lg md:text-xl flex items-center">
                  {"▶"}
                </span>
              )}
              <div className="breadcrumb-background absolute bottom-0 left-0 w-full h-1"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
