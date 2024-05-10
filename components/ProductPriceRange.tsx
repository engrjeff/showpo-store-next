"use client";

import { useProductsPriceRange } from "@/services/queries/hooks/useProductsPriceRange";
import { Suspense } from "react";

export function ProductPriceRange({
  category_uid,
  product_uid,
}: {
  category_uid: string;
  product_uid: string;
}) {
  const { data } = useProductsPriceRange(category_uid);

  const product = data?.products?.items?.find((p) => p.uid === product_uid);

  const isSameFinalAndRegPrice =
    product?.price_range?.minimum_price?.regular_price?.value ===
    product?.price_range?.minimum_price?.final_price?.value;

  return (
    <Suspense fallback={<span>Loading...</span>}>
      {product?.price_range?.minimum_price ? (
        <p className='text-center text-[15px] font-bold'>
          <span
            className={`mr-3 text-black ${
              !isSameFinalAndRegPrice ? "line-through" : ""
            }`}
          >
            £
            {product?.price_range?.minimum_price?.regular_price?.value?.toFixed(
              2
            )}
          </span>
          {isSameFinalAndRegPrice ? null : (
            <span className='text-red-500'>
              £
              {product?.price_range?.minimum_price?.final_price?.value?.toFixed(
                2
              )}
            </span>
          )}
        </p>
      ) : null}
    </Suspense>
  );
}
