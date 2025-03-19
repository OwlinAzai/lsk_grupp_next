// src/types.ts
export interface Product {
    id: number;
    product_name: string;
    description: string;
    image_URL?: string;
    price: string;
    manufacturer: string;
    product_type: string;
    is_main_item: boolean;
}

export interface InfoItem {
    img: string;
    value: string;
}

export interface AdvantageItem {
    title: string;
    description: string;
    icon: string;
}