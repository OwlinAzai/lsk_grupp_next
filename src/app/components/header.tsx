"use client";
import React, { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button, Link } from "@mui/material";

const Header = () => {
  useState(() => {
    console.log("Header mounted");
  });
  return (
    <div
      className={
        "bg-brown text-white flex align-middle justify-center pl-[0rem] font-sans"
      }
    >
      <Link
        className="text-white decoration-transparent hover:decoration-orange-500 decoration-2 cursor-pointer text-nowrap text-2xl"
        component={NextLink}
        href="/"
      >
        <Image
          src="/Logo.png"
          alt="Logo"
          width={123}
          height={60}
          className={"pb-10 pt-10 mr-[6rem] hover:cursor-pointer"}
          priority={true}
        />
      </Link>
      <div className="flex items-center place-items-center align-middle text-black">
        <div className="flex w-full px-4 py-3 rounded-full border-2 bg-white border-transparent max-w-2xl mx-auto font-[sans-serif]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-lightgray-600 mr-3"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Поиск в Каталоге. Например, “шпатлевка”"
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <Link
          component={NextLink}
          href="/about"
          className={
            "ml-20 text-white decoration-transparent hover:decoration-orange-500 decoration-2 underline-offset-8 cursor-pointer text-nowrap text-2xl"
          }
          onClick={() => console.log("О нас")}
        >
          О нас
        </Link>
        <Link
          component={NextLink}
          href="/catalog"
          className={
            "ml-[2.5rem] text-white decoration-transparent hover:decoration-orange-500 decoration-2 underline-offset-8 cursor-pointer text-nowrap text-2xl"
          }
          onClick={() => console.log("Каталог")}
        >
          Каталог
        </Link>
        <Link component={NextLink} href="/request-form" passHref>
          <Button
            type="button"
            className="ml-[2.5rem] text-white decoration-transparent bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl hover:ring-4 hover:ring-opacity-45 hover:ring-orange-600 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-sans rounded-lg text-base upper-case px-5 py-5 text-center me-2 mb-2 text-nowrap"
            onClick={() => console.log("Заявка")}
          >
            Оставить заявку
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
