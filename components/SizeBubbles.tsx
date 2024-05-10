"use client";

import { ConfigurableVariant, Maybe } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { useConfigurableProducts } from "@/services/queries/hooks/useConfigurableProducts";
import { CheckIcon } from "@heroicons/react/24/solid";

const alphaSortA = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
const alphaSortB = ["XS/S", "S/M", "M/L", "L/XL"];
const alphaSortC = ["A", "B", "C", "D"];

function sortVariantsBySize(
  variants: Maybe<Maybe<ConfigurableVariant>[]> | undefined
) {
  if (!variants) return [];

  const variantsCopy = [...variants];

  return variantsCopy?.sort((a, b) => {
    const sizeA: any = a?.attributes?.find((a) => a?.code === "size");
    const sizeB: any = b?.attributes?.find((a) => a?.code === "size");

    if (isNaN(sizeA.label) && isNaN(sizeB.label)) {
      let indexA = 0;
      let indexB = 0;

      if (
        alphaSortA.includes(sizeA.label) &&
        alphaSortA.includes(sizeB.label)
      ) {
        indexA = alphaSortA.indexOf(sizeA.label);
        indexB = alphaSortA.indexOf(sizeB.label);
      }

      if (
        alphaSortB.includes(sizeA.label) &&
        alphaSortB.includes(sizeB.label)
      ) {
        indexA = alphaSortB.indexOf(sizeA.label);
        indexB = alphaSortB.indexOf(sizeB.label);
      }

      if (
        alphaSortC.includes(sizeA.label) &&
        alphaSortC.includes(sizeB.label)
      ) {
        indexA = alphaSortC.indexOf(sizeA.label);
        indexB = alphaSortC.indexOf(sizeB.label);
      }

      return indexA - indexB;
    }

    return sizeA.label! - sizeB.label!;
  });
}

export function SizeBubbles({
  category_uid,
  product_uid,
}: {
  category_uid: string;
  product_uid: string;
}) {
  const { data } = useConfigurableProducts(category_uid);

  const product = data?.products?.items?.find((p) => p.uid === product_uid);

  if (!product) return null;

  const variantsInStock = product.variants?.filter(
    (v) => v?.product?.stock_status === "IN_STOCK"
  );

  const hasOneInStockVariant = variantsInStock?.length === 1;

  const shouldDisplayAddToCartBtn = hasOneInStockVariant
    ? ["NoSize", "OneSize"].includes(
        variantsInStock[0]?.attributes?.find((a) => a?.code === "size")?.label!
      )
    : false;

  const varianstSortedBySize = sortVariantsBySize(product.variants);

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5 flex-wrap",
        product.variants?.length === 1 ? "mt-auto" : "mt-2"
      )}
    >
      {variantsInStock?.length === 1 && shouldDisplayAddToCartBtn ? (
        <AddToCartButton variant={variantsInStock[0]} />
      ) : (
        varianstSortedBySize?.map((variant) => (
          <SizeBubble key={`size-${variant?.product?.uid}`} variant={variant} />
        ))
      )}
    </div>
  );
}

function SizeBubble({ variant }: { variant: Maybe<ConfigurableVariant> }) {
  const isAvailable = true;
  let status = "dd";

  const sizeLabel = variant?.attributes?.find((a) => a?.code === "size")?.label;

  const handleAddToCart = () => {};

  return (
    <button
      onClick={handleAddToCart}
      title='Add to bag'
      disabled={false}
      className={cn(
        "select-none border border-black h-7 w-7 flex items-center justify-center text-xs font-semibold rounded-full transition-colors duration-300 hover:text-white hover:bg-black disabled:opacity-60 disabled:pointer-events-none",
        {
          "opacity-60 cursor-not-allowed pointer-events-none border-border text-border":
            !isAvailable,
        }
      )}
    >
      {status === "done" ? <CheckIcon className='h-4 w-4' /> : sizeLabel}
    </button>
  );
}
function AddToCartButton({ variant }: { variant: Maybe<ConfigurableVariant> }) {
  const isAvailable = true;
  let status = "dd";

  const sizeLabel = variant?.attributes?.find((a) => a?.code === "size")?.label;

  const handleAddToCart = () => {};

  return (
    <button
      onClick={handleAddToCart}
      disabled={false}
      title='Add to bag'
      className={cn(
        "bg-[#32997d] text-white select-none text-sm font-bold w-full h-9 flex items-center justify-center px-4 py-2 uppercase hover:bg-opacity-90 disabled:opacity-40",
        { "opacity-40 cursor-not-allowed": !isAvailable }
      )}
    >
      {status === "done" ? <CheckIcon className='h-4 w-4' /> : "Add To Bag"}
    </button>
  );
}
