// /app/api/images/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    const { data, error } = await supabase
        .storage
        .from("image_storage")
        .list("main_page_swiper", { limit: 100 });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const imageUrls = data.map(
        (file) =>
            `https://rvanuxehhbwvmjmrgnas.supabase.co/storage/v1/object/public/image_storage/main_page_swiper/${file.name}`
    );

    return NextResponse.json(imageUrls);
}
