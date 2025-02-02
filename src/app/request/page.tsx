"use client";

/*
  форма
  Фамилия, имя
  Почта
  Телефон
  Комментарий от заказчика
  Список прокинутых товаров из localStorage (id, название, цена, количество)
*/

import React from "react";
import MailForm from "@/app/components/MailForm";

export default function Home() {
  // interface form {
  //   name: string;
  //   email: string;
  //   phone: string;
  //   comment: string;
  //   products: Array<{
  //     id: string;
  //     name: string;
  //     price: number;
  //     quantity: number;
  //   }>;
  // }

  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   comment: "",
  //   products: JSON.parse(localStorage.getItem("cart") || "[]") || [],
  // });

  return (
    <div className="">
      <title>Оставить заявку</title>
      <MailForm />
      {/* <Form action="">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border"
          onChange={(e) => {
            setForm({ ...form, name: e.currentTarget.value });
          }}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="border"
          onChange={(e) => {
            setForm({ ...form, email: e.currentTarget.value });
          }}
        />
        <br />
        <input
          type="tel"
          name="phone"
          placeholder="phone"
          className="border"
          onChange={(e) => {
            setForm({ ...form, phone: e.currentTarget.value });
          }}
        />
        <br />
        <input
          type="text"
          name="comment"
          placeholder="comment"
          className="border"
          onChange={(e) => {
            setForm({ ...form, comment: e.currentTarget.value });
          }}
        />
        <br />
        <Button
          onClick={() => {
            setForm({ ...form });
            console.log(form);
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify([form]));
          }}
          variant="contained"
          className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
        >
          Submit
        </Button>
      </Form> */}
    </div>
  );
}
