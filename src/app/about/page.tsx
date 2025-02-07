"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-cols-2 font-sans align-middle">
        <title>О нас</title>
        {/* Main Content */}
        <div className="p-6 mb-[22px] shadow-xl rounded-lg px-[1rem] sm:pr-4 sm:mr-4 sm:ml-4 lg:ml-32 lg:mr-32 bg-white">
          <div>
            <h1 className="text-4xl text-center font-medium">О нас</h1>
            <div className="flex items-center bg-orange-500 h-1 w-[130px] m-auto mt-2 mb-5 font-light rounded-md" />
            <p className="align-center text-justify font-light text-xl">
              Наша организация предлагает Вам качественную продукцию от
              зарекомендовавших себя производителей по доступным ценам. Возможен
              наличный и безналичный расчёт. Опт и розница. Приглашаем к
              сотрудничеству. Всегда рады Вам!
            </p>
          </div>
          <div>
            <h1 className="text-3xl text-center font-sans mt-5 mb-5">
              Информация о компании
            </h1>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Название
              </p>
              <p className="align-center text-right font-light text-xl">
                ООО {`"`}ЛСК-групп{`"`}
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Тип компании
              </p>
              <p className="align-center text-right font-light text-xl">
                Торговая компания
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Бренды
              </p>
              <p className="align-center text-right font-light text-xl">БЦК</p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Количество сотрудников
              </p>
              <p className="align-center text-right font-light text-xl">
                5-10 человек
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-center font-sans mt-5 mb-5">
              Организационно-правовая форма
            </h1>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Год основания
              </p>
              <p className="align-center text-right font-light text-xl">2020</p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Организационно-правовая форма
              </p>
              <p className="align-center text-right font-light text-xl">
                Общество с ограниченной ответственностью
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-center font-sans mt-5 mb-5">
              Контактная информация
            </h1>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Компания
              </p>
              <p className="align-center text-right font-light text-xl">
                ООО “ЛСК-групп”
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Рабочий телефон
              </p>
              <p className="align-center text-right font-light text-xl">
                +375 (17) 243-91-59
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Василий Николаевич (МТС)
              </p>
              <p className="align-center text-right font-light text-xl">
                +375 (29) 278-23-43
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Игорь Болеславович (А1)
              </p>
              <p className="align-center text-right font-light text-xl">
                +375 (29) 173-06-54
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Контактное лицо
              </p>
              <p className="align-center text-right font-light text-xl">
                Германович Игорь Болеславович
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-center font-sans mt-5 mb-5">
              Информация для покупателя
            </h1>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl">
                ООО “ЛСК-групп”
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Адрес
              </p>
              <p className="align-center text-right font-light text-xl">
                ул. Селицкого 23, Минск, Беларусь
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Дата регистрации в Торговом реестре/Реестре бытовых услуг
              </p>
              <p className="align-center text-right font-light text-xl">
                28.02.2020
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Номер в Торговом реестре/Реестре бытовых услуг
              </p>
              <p className="align-center text-right font-light text-xl">
                0160895, Республика Беларусь
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">УНП</p>
              <p className="align-center text-right font-light text-xl">
                591033985
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Регистрационный орган
              </p>
              <p className="align-center text-right font-light text-xl">
                Гродненский горисполком
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Местонахождение книги замечаний и предложений
              </p>
              <p className="align-center text-right font-light text-xl">
                г. Гродно, ул. Озёрское шоссе, 14а
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                Режим работы
              </p>
              <p className="align-center text-right font-light text-xl">
                ПН-ПТ 08:30-17:00
              </p>
            </div>
            <div className="flex flex-row justify-between border-b-2 border-black border-opacity-30">
              <p className="align-center text-left font-light text-xl ">
                EMAIL
              </p>
              <p className="align-center font-light text-xl text-right">
                lskgruppinfo@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
