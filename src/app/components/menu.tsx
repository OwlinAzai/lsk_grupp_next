import { Link } from "@mui/material";
import NextLink from "next/link";

export default function Menu() {
  return (
    <>
      <div className="items-center min-w-[243px] pt-[22px] pb-[22px] ml-[14rem] mr-[20px] mb-[22px] shadow-xl rounded-lg px-4 bg-white">
        <h1 className="text-4xl font-medium">Меню</h1>
        <ul className="text-black font-light text-xl">
          <Link
            component={NextLink}
            className="decoration-transparent text-black hover: hover:text-orange-400 hover:decoration-transparent"
            href={"/"}
          >
            Домой
          </Link>
          <br />
          <Link
            component={NextLink}
            className="decoration-transparent text-black hover:text-orange-400 hover:decoration-transparent"
            href={"/catalog"}
          >
            Каталог
          </Link>
          <br />
          <Link
            component={NextLink}
            className="decoration-transparent text-black hover:text-orange-400 hover:decoration-transparent"
            href={""}
          >
            Отзывы
          </Link>
        </ul>
        <h1 className="text-4xl font-medium pt-2 pb-1">Контакты</h1>
        <h2 className="text-2xl font-sans bg-[#278904] text-white rounded-lg text-center pt-[2px] pb-[2px]">
          Наличие документов
        </h2>
        <h2 className="text-2xl font-medium">Компания:</h2>
        <p className="text-black font-light text-xl">ООО “ЛСК-групп”</p>
        <h2 className="text-2xl font-medium">Телефоны:</h2>
        <p className="text-black font-light text-xl">Рабочий телефон</p>
        <p className="text-black font-light text-xl">+375 (17) 243-91-59</p>
        <p className="text-black font-light text-xl">
          Василий Николаевич (МТС)
        </p>
        <p className="text-black font-light text-xl">+375 (29) 278-23-43</p>
        <p className="text-black font-light text-xl">Игорь Болеславович(А1)</p>
        <p className="text-black font-light text-xl">+375 (29) 173-06-54</p>
        <h2 className="text-2xl font-medium">Контактное лицо:</h2>
        <p className="text-black font-light text-xl">
          Германович Игорь Болеславович
        </p>
        <h2 className="text-2xl font-medium">Адрес:</h2>
        <p className="text-black font-light text-xl">
          г. Минск, ул. Селицкого 23, Минск, Беларусь
        </p>
        <h2 className="text-2xl font-medium">Email:</h2>
        <p className="text-black font-light text-xl">lskgruppinfo@gmail.com</p>
        <Link
          href=""
          className="text-black decoration-black hover:text-orange-400"
        >
          <h1 className="text-4xl font-medium pt-2 pb-1">Покупателю</h1>
        </Link>
      </div>
    </>
  );
}
