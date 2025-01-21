import React from 'react';
import Image from "next/image";

export default function SearchBar() {
    return (
        <div
            className="flex px-4 py-3 rounded-full border-2 bg-gray border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
            <input type="email" placeholder="Search Something..."
                   className="w-full outline-none bg-transparent text-black text-sm"/>
        </div>
    );
};
