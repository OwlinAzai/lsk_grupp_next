// src/app/components/HomeClient.tsx
"use client";  // Указываем, что компонент клиентский

import NextLink from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  product_name: string;
  description: string;
  image_URL?: string;
  price: string;
  manufacturer: string;
  product_type: string;
}

export default function HomeClient({ products }: { products: Product[] }) {
  return (
    <div className="pt-[22px] ml-[14rem] mr-[14rem]">
      <title>ООО "ЛСК-групп"</title>
      <h1>Главная</h1>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <NextLink href={`catalog/${product.id}`} passHref key={product.id}>
              <div key={product.id} className="product-card">
                <Image
                  src={product.image_URL || "/default-image.png"}
                  alt={product.product_name}
                  width={200}
                  height={200}
                  className="product-image"
                />
                <h2>{product.product_name}</h2>
                <p>{product.description}</p>
                <p>
                  <strong>Цена:</strong> {product.price} BYN
                </p>
                <p>
                  <strong>Производитель:</strong> {product.manufacturer}
                </p>
                <p>
                  <strong>Тип:</strong> {product.product_type}
                </p>
              </div>
            </NextLink>
          ))
        ) : (
          <p>Товары не найдены.</p>
        )}
      </div>
    </div>
  );
}

