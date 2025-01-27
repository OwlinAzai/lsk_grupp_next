import { data } from "./../../utils/data";
import { Button, Link } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = data.products[Number(id)];

  // Check if the product exists
  if (!product) {
    return (
      <div className="pt-[22px] pb-[22px] ml-[14rem] mr-[14rem] shadow-xl rounded-lg px-4 bg-white">
        <h1>Продукт не найден</h1>
        <p>Извините, этот продукт не существует.</p>
      </div>
    );
  }

  return (
    <div className="pt-[22px] pb-[22px] ml-[14rem] mr-[14rem] shadow-lg rounded-lg px-4 bg-white">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Цена: {product.price}</p>
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 hover:border-orange-500 rounded mt-2">
        Добавить в корзину
      </Button>
      <br />
      <Link component={NextLink} href="/catalog">
        <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 hover:border-orange-500 rounded mt-2">
          Вернуться
        </Button>
      </Link>
    </div>
  );
}
