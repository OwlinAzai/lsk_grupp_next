import { supabase } from "@/lib/supabaseClient";
import SimilarProductsClient from "./SimilarProductsClient";

export default async function SimilarProductsServer({ currentProductId }) {
  try {
    // Получаем текущий товар, чтобы узнать его product_type_id
    const { data: currentProduct, error: productError } = await supabase
      .from("products")
      .select("product_type_id")
      .eq("id", currentProductId)
      .single();

    if (productError) throw new Error(productError.message);

    // Получаем товары с таким же product_type_id, исключая текущий товар
    const { data: similarProducts, error: similarError } = await supabase
      .from("products")
      .select("*, price_history(price)")
      .eq("product_type_id", currentProduct.product_type_id)
      .neq("id", currentProductId)
      .limit(4);

    if (similarError) throw new Error(similarError.message);

    return <SimilarProductsClient similarProducts={similarProducts} />;
  } catch (error) {
    console.error("Ошибка загрузки похожих товаров:", error.message);
    return <p className="text-center text-orange-700">Ошибка загрузки похожих товаров</p>;
  }
}

