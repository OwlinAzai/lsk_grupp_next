"use client";

import NextLink from "next/link";
import { data } from "./../utils/data";
import Image from "next/image";

export default function Catalog() {
  return (
    <div className="pt-[22px] pb-[22px] ml-[14rem] mr-[14rem] shadow-xl rounded-lg px-4 bg-white">
      <h1>Catalog</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel libero
        id urna pulvinar convallis. Nulla facilisi. Sed lobortis, felis vel
        malesuada fringilla, arcu dolor condimentum turpis, in semper felis
        turpis in neque. Donec non neque vel mi ultricies placerat. Sed vel
        massa euismod, consequat arcu vel, pulvinar justo. Donec in velit vitae
        est consectetur lobortis.
      </p>

      {data.products.map((product) => (
        <NextLink href={`catalog/${product.id}`} passHref key={product.id}>
          <div
            className="mt-[20px] mb-[20px] drop-shadow-2xl rounded-lg px-4 py-4 bg-white hover:bg-[#E7E9E4]"
            key={product.id}
          >
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
            />
            <div>
              <span className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 hover:border-orange-500 rounded">
                {product.price}
              </span>
            </div>
          </div>
        </NextLink>
      ))}
    </div>
  );
}
