import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
    	{
		protocol: 'https',
		hostname: 'rvanuxehhbwvmjmrgnas.supabase.co',
	}
    ], // Разрешаем загрузку изображений с этого домена
  },
};

export default nextConfig;
