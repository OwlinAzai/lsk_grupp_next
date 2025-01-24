"use client";

/*
  форма
  Фамилия, имя
  Почта
  Телефон
  Комментарий от заказчика
  Список прокинутых товаров из localStorage (id, название, цена, количество)
*/

import React, { useState } from "react";
import { Button } from "@mui/material";
import Form from "next/form";

export default function Home() {
  interface form {
    name: string;
    email: string;
    phone: string;
    comment: string;
    products: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
    products: JSON.parse(localStorage.getItem("cart") || "[]") || [],
  });

  return (
    <div className="pt-[22px] pb-[22px] ml-[14rem] mr-[14rem] shadow-xl rounded-lg px-4 bg-white">
      <h1>Request</h1>
      <Form action="">
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
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
