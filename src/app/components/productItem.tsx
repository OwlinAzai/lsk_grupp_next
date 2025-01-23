import * as React from "react";
import data from "../utils/data";

import Link from "next/link";

export function ProductItem() {
  return (
    <div className="card">
      <Link href={`/product/${data.products[0].id}`}>
        {data.products[0].name}
      </Link>
    </div>
  );
}
