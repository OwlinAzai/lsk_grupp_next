import { data } from "./utils/data"; // Импортируем данные из data.js
import Image from "next/image";

export default function Home() {
  // Фильтруем товары, у которых isMainItem равно true
  const mainProducts = data.products.filter((product) => product.isMainItem);

  return (
    <div className="pt-[22px] ml-[14rem] mr-[14rem]">
      <title>ООО "ЛСК-групп"</title>
      <h1>Главная</h1>
      <div className="products">
        {mainProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Image
              src={product.imageURL}
              alt={product.productName}
              width={200}
              height={200}
              className="product-image"
            />
            <h2>{product.productName}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Цена:</strong> {product.price} {product.currency}
            </p>
            <p>
              <strong>Производитель:</strong> {product.manufacturer}
            </p>
            <p>
              <strong>Тип:</strong> {product.productType}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
