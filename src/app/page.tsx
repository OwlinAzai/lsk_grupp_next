import HomeClient from "./components/HomeClient";
import { supabase } from "@/lib/supabaseClient";

export default async function HomeServer() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_main_item", true);

    if (error) throw error;

    // Получаем дополнительные данные (цены, производители, типы)
    const detailedProducts = await Promise.all(
      products.map(async (product) => {
        const manufacturer = await fetchManufacturer(product.manufacturer_id);
        const product_type = await fetchProductType(product.product_type_id);
        const price = await fetchPrice(product.id);
        return { ...product, manufacturer, product_type, price };
      })
    );

    // Получаем данные для HomeInfo
    const { data: homeInfo, error: homeInfoError } = await supabase
      .from("main_page_info")
      .select("*")
      .single();

    if (homeInfoError)
      console.error("Ошибка загрузки main_page_info:", homeInfoError.message);

    return (
      <HomeClient
        products={detailedProducts}
        homeInfo={homeInfo?.text || null}
        homeAdvantage={homeInfo?.advantages || null}
      />
    );
  } catch (error) {
    return <div>Ошибка загрузки данных: {error.message}</div>;
  }
}

// Функции для загрузки дополнительных данных

async function fetchManufacturer(manufacturerId: number | null) {
  if (!manufacturerId) return "Не указан";
  const { data, error } = await supabase
    .from("manufactures")
    .select("full_name")
    .eq("id", manufacturerId)
    .single();
  return error ? "Производитель не найден" : data.full_name;
}

async function fetchPrice(productId: number) {
  const { data, error } = await supabase
    .from("price_history")
    .select("price")
    .eq("product_id", productId)
    .order("period", { ascending: false })
    .limit(1)
    .maybeSingle();
  return error ? "Цена не найдена" : data?.price || "Цена не найдена";
}

async function fetchProductType(productTypeId: number | null) {
  if (!productTypeId) return "Не указан";
  const { data, error } = await supabase
    .from("product_types")
    .select("name")
    .eq("id", productTypeId)
    .single();
  return error ? "Тип продукта не найден" : data.name;
}
