import { supabase } from "@/lib/supabaseClient";
import SimilarProductsClient from "./similarProductsClient";

// Типизация данных о товаре
interface Product {
  id: number;
  product_type_id: number;
  product_name: string;
  price_history: { price: number }[];
  image_URL?: string;
}

interface SimilarProductsServerProps {
  currentProductId: string | number; // Пропс для ID текущего товара
}

export default async function SimilarProductsServer({
  currentProductId,
}: SimilarProductsServerProps) {
  try {
    // Получаем текущий товар, чтобы узнать его product_type_id
    const { data: currentProduct, error: productError } = await supabase
      .from<Product>("products")  // Use Product interface here
      .select("product_type_id")
      .eq("id", currentProductId)
      .single();

    if (productError) throw new Error(productError.message);

    // Получаем товары с таким же product_type_id, исключая текущий товар
    const { data: similarProducts, error: similarError } = await supabase
      .from<Product>("products")  // Use Product interface here as well
      .select("id, product_name, price_history(price), image_URL") // Запрашиваем только необходимые поля
      .eq("product_type_id", currentProduct.product_type_id)
      .neq("id", currentProductId)
      .limit(4);

    if (similarError) throw new Error(similarError.message);

    // Если данные успешно получены, рендерим компонент
    return <SimilarProductsClient similarProducts={similarProducts} />;
  } catch (error) {
    console.error("Ошибка загрузки похожих товаров:", error instanceof Error ? error.message : error);
    return <p className="text-center text-orange-700">Ошибка загрузки похожих товаров</p>;
  }
}

