import { supabase } from "@/lib/supabaseClient";
import CatalogClient from "./CatalogClient";

export default async function CatalogServer() {
  // Загружаем продукты
  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("*, price_history(price), product_types(id, name, entry_parent_id)")
    .order("id", { ascending: true });

  if (productsError) {
    console.error("Error fetching products: ", productsError.message);
    return <p>Ошибка загрузки продуктов</p>;
  }

  // Обогащаем продуктами ценами
  const productsWithPrices = productsData.map((product) => ({
    ...product,
    productName: product.product_name,
    imageURL: product.image_URL,
    price:
      product.price_history.length > 0 ? product.price_history[0].price : null,
  }));

  // Загружаем категории
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("product_types")
    .select("id, name, entry_parent_id")
    .order("id", { ascending: true });

  if (categoriesError) {
    console.error("Error fetching categories: ", categoriesError.message);
    return <p>Ошибка загрузки категорий</p>;
  }

  return <CatalogClient initialProducts={productsWithPrices} categories={categoriesData} />;
}

