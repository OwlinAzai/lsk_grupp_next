"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function BreadcrumbsClient({ lastItem }: { lastItem?: string }) {
  const [productName, setProductName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lastItem || isNaN(Number(lastItem))) return;

    setLoading(true);
    supabase
      .from("products")
      .select("product_name")
      .eq("id", Number(lastItem))
      .single()
      .then(({ data, error }) => {
        if (error) throw error;
        setProductName(data?.product_name || "Продукт");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [lastItem]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return <span className="font-bold">{productName}</span>;
}

