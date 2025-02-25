import { supabase } from "@/lib/supabaseClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "name-asc";

  try {
    let query = supabase
      .from("api.products")
      .select("id, product_name, image_URL, amount, price_history(price), product_types(id, name)");

    if (category) query = query.eq("product_types.id", category);
    if (minPrice) query = query.gte("price_history->price", parseFloat(minPrice));
    if (maxPrice) query = query.lte("price_history->price", parseFloat(maxPrice));
    if (search) query = query.ilike("product_name", `%${search}%`);

    const [sortCriteria, sortOrder] = sort.split("-");
    if (sortCriteria === "name") {
      query = query.order("product_name", { ascending: sortOrder === "asc" });
    } else if (sortCriteria === "price") {
      query = query.order("price_history->price", { ascending: sortOrder === "asc" });
    }

    const { data: productsData, error: productsError } = await query;

    if (productsError) {
      console.error("Ошибка загрузки продуктов: ", productsError.message);
      return Response.json({ error: productsError.message }, { status: 500 });
    }

    const productsWithPrices = productsData.map((product) => ({
      id: product.id,
      productName: product.product_name,
      imageURL: product.image_URL || "/default-image.png",
      amount: product.amount,
      price: product.price_history?.length > 0 ? product.price_history[0].price : null,
    }));

    return Response.json({ products: productsWithPrices });
  } catch (error) {
    console.error("Ошибка в API-маршруте: ", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
