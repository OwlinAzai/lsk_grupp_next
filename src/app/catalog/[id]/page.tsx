import { supabase } from "@/lib/supabaseClient";
import ProductClient from "./pageClient";

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Ensure params.id is valid and is a number
  const { id } = await params;
  const productId = Number(id); // No need to await params.id, it's already available synchronously

  if (isNaN(productId)) {
    return <div>Неверный ID продукта</div>;
  }

  try {
    // Fetch product data
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*, other_attributes")
      .eq("id", productId)
      .single();

    if (productError) {
      console.error("Ошибка загрузки продукта:", productError.message);
      return <div>Ошибка загрузки продукта</div>;
    }

    // Fetch price data
    const { data: priceData, error: priceError } = await supabase
      .from("price_history")
      .select("price")
      .eq("product_id", productId)
      .order("period", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (priceError) {
      console.error("Ошибка загрузки цены:", priceError.message);
    }

    // Fetch unit of measure (UOM)
    let uom = null;
    if (product?.uom_id) {
      const { data: uomData } = await supabase
        .from("unit_of_measures")
        .select("full_name")
        .eq("id", product.uom_id)
        .single();
      uom = uomData?.full_name || "Не найдены единицы измерения товара";
    }

    // Fetch manufacturer
    let manufacturer = null;
    if (product?.manufacturer_id) {
      const { data: manufacturerData } = await supabase
        .from("manufactures")
        .select("full_name")
        .eq("id", product.manufacturer_id)
        .single();
      manufacturer = manufacturerData?.full_name || "Производитель не найден";
    }

    // Fetch similar products
    let similarProducts = [];
    if (product?.product_type_id) {
      const { data: similarData, error: similarError } = await supabase
        .from("products")
        .select("*")
        .eq("product_type_id", product.product_type_id)
        .neq("id", product.id)
        .limit(4);

      if (!similarError) {
        similarProducts = similarData;
      }
    }

    return (
      <ProductClient
        product={product}
        price={priceData?.price || "Цена не найдена"}
        uom={uom}
        manufacturer={manufacturer}
        similarProducts={similarProducts}
      />
    );
  } catch (err) {
    console.error("Произошла ошибка при загрузке данных:", err);
    return <div>Ошибка загрузки данных</div>;
  }
}

