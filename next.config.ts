import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["rvanuxehhbwvmjmrgnas.supabase.co"], // Разрешаем загрузку изображений с этого домена
  },
};

export default nextConfig;
