import { supabase } from "@/lib/supabaseClient";
import FiltersClient from "./FiltersClient";

// Серверный компонент для получения категорий и производителей
export default async function FiltersServer({ onFilterChange }) {
  // Запрос данных с сервера
  const { data: categoriesData } = await supabase.from("api.product_types").select("*");
  const { data: manufacturesData } = await supabase.from("api.manufactures").select("*");

  // Возвращаем клиентский компонент с данными
  return (
    <FiltersClient
      categories={categoriesData || []}
      manufactures={manufacturesData || []}
      onFilterChange={onFilterChange}
    />
  );
}

