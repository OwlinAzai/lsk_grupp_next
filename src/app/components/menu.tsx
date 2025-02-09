import { useRef, useEffect } from "react";
import NextLink from "next/link";
import { Button, Link } from "@mui/material";
import { usePathname } from "next/navigation"; // Импортируем usePathname
import CloseIcon from "@mui/icons-material/Close"; // Импортируем иконку крестика

interface MenuProps {
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}

export default function Menu({ isMenuOpen, setMenuOpen }: MenuProps) {
  const menuRef = useRef(null);
  const pathname = usePathname(); // Получаем текущий путь

  // Закрытие меню при клике вне его области
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setMenuOpen]);

  return (
    <>
      {/* Затемнение фона и меню */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 999 }} // Устанавливаем z-index меньше, чем у кнопки
      >
        <div
          ref={menuRef}
          className={`fixed inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Кнопка закрытия меню */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900 rounded-full bg-red-500 shadow-md hover:shadow-lg transition-all duration-200"
            aria-label="Закрыть меню"
          >
            <CloseIcon className="text-2xl text-white" />{" "}
            {/* Иконка крестика */}
          </button>

          {/* Контент меню */}
          <div className="p-6 overflow-y-auto h-full">
            {/* Кнопка "Оставить заявку" */}
            <Link
              component={NextLink}
              href="/request"
              className={`text-4xl font-medium decoration-orange-500 hover:text-orange-400 block mt-8 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/request"
                  ? "bg-orange-100 text-orange-500"
                  : "bg-orange-100 text-orange-500"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Оставить заявку
            </Link>

            {/* Ссылки на страницы */}
            <div className="mt-4">
              <Link
                component={NextLink}
                href="/"
                className={`text-4xl font-medium decoration-none hover:text-orange-400 block pt-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/"
                    ? "bg-orange-100 text-orange-500 decoration-transparent"
                    : "text-black hover:bg-gray-100 decoration-transparent"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Главная
              </Link>
              <Link
                component={NextLink}
                href="/catalog"
                className={`text-4xl font-medium decoration-none hover:text-orange-400 block pt-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/catalog"
                    ? "bg-orange-100 text-orange-500 decoration-transparent"
                    : "text-black hover:bg-gray-100 decoration-transparent"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Каталог
              </Link>
              <Link
                component={NextLink}
                href="/about"
                className={`text-4xl font-medium decoration-none hover:text-orange-400 block pt-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/about"
                    ? "bg-orange-100 text-orange-500 decoration-transparent"
                    : "text-black hover:bg-gray-100 decoration-transparent"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                О нас
              </Link>
            </div>

            {/* Контакты */}
            <h2 className="text-2xl font-sans bg-[#278904] text-white rounded-lg text-center mt-2 pt-[2px] pb-[2px]">
              Наличие документов
            </h2>
            <h2 className="text-2xl font-medium">Компания:</h2>
            <p className="text-black font-light text-xl leading-tight">
              ООО “ЛСК-групп”
            </p>
            <h2 className="text-2xl font-medium">Телефоны:</h2>
            <p className="text-black font-light text-xl leading-tight">
              Рабочий телефон
            </p>
            <p className="text-black font-light text-xl leading-tight">
              +375 (17) 243-91-59
            </p>
            <p className="text-black font-light text-xl leading-tight">
              Василий Николаевич (МТС)
            </p>
            <p className="text-black font-light text-xl leading-tight">
              +375 (29) 278-23-43
            </p>
            <p className="text-black font-light text-xl leading-tight">
              Игорь Болеславович(А1)
            </p>
            <p className="text-black font-light text-xl leading-tight">
              +375 (29) 173-06-54
            </p>
            <h2 className="text-2xl font-medium">Контактное лицо:</h2>
            <p className="text-black font-light text-xl leading-tight">
              Германович Игорь Болеславович
            </p>
            <h2 className="text-2xl font-medium">Адрес:</h2>
            <p className="text-black font-light text-xl leading-tight">
              г. Минск, ул. Селицкого 23, Минск, Беларусь
            </p>
            <h2 className="text-2xl font-medium">Email:</h2>
            <p className="text-black font-light text-xl leading-tight">
              lskgruppinfo@gmail.com
            </p>
            <Link
              component={NextLink}
              href="/about"
              className={`text-4xl font-medium decoration-orange-500 hover:text-orange-400 block px-4 mt-2 pt-0 py-2 rounded-lg transition-colors ${
                pathname === "/about"
                  ? "bg-orange-100 text-orange-500"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <h1 className="text-4xl font-medium pt-2 pb-1">Покупателю</h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
