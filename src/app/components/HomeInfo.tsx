import { supabase } from "@/lib/supabaseClient";
import HomeInfoClient from "@/app/components/HomeInfoClient";

export default async function HomeInfoServer() {
  try {
    // Получаем данные из таблицы main_page_info
    const { data: info, error } = await supabase
      .from("main_page_info")
      .select("*")
      .single(); // Используем .single(), если ожидаем только одну запись

    if (error) {
      console.error("Error fetching main_page_info: ", error.message);
      return <p>Ошибка загрузки данных</p>;
    }

    // Если данные отсутствуют, возвращаем сообщение
    if (!info) {
      return <div>Данные не найдены</div>;
    }

    // Поле text уже является массивом объектов, парсинг не требуется
    const parsedInfo = info.text;

    // Выводим данные в консоль
    console.log("Parsed Info:", parsedInfo);

    // Передаем данные в клиентский компонент
    return <HomeInfoClient info={parsedInfo} />;
  } catch (error) {
    // Логируем полную ошибку для отладки
    console.error("Error fetching data:", error);

    // Возвращаем null, чтобы не нарушать структуру DOM
    return null;
  }
}
