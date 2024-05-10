import { ProductFilters } from "@/components/ProductFilters";
import { ProductListSortSelect } from "@/components/ProductListSortSelect";
import { ProductPriceRange } from "@/components/ProductPriceRange";
import { SizeBubbles } from "@/components/SizeBubbles";
import { getCategories } from "@/services/queries/categories/getCategories";
import { getCurrentCategory } from "@/services/queries/categories/getCurrentCategory";
import { getProducts } from "@/services/queries/products/getProducts";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    category: string[];
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories?.map((category) => ({
    category: [category?.url_path],
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await getCurrentCategory(params.category);

  if (!category) return notFound();

  const productsData = await getProducts({ category_uid: category.uid });

  return (
    <div className='container max-w-6xl'>
      <h1 className='text-center font-bold text-lg uppercase'>
        {category.name}{" "}
        <span className='font-normal text-xs normal-case'>
          {productsData?.total_count} items
        </span>
      </h1>
      <div className='mb-6'>
        <ProductListSortSelect sortFields={productsData?.sort_fields} />
      </div>
      <div className='flex gap-4'>
        <div className='w-[220px] shrink-0'>
          <ProductFilters filters={productsData?.aggregations} />
        </div>
        <div className='flex-1'>
          <ul className='grid grid-cols-5 gap-4'>
            {productsData?.items?.map((product) => (
              <li key={product.uid}>
                <Link
                  href={`/p/${product.canonical_url}`}
                  className='group h-full'
                >
                  <div className='relative'>
                    <Image
                      src={product.small_image?.url!}
                      alt={product.small_image?.label!}
                      width={200}
                      height={320}
                      className='w-full h-full object-cover mb-2'
                    />
                    <h2 className='line-clamp-2 group-hover:underline'>
                      {product.name}
                    </h2>
                    <ProductPriceRange
                      category_uid={category.uid}
                      product_uid={product.uid}
                    />
                    <SizeBubbles
                      category_uid={category.uid}
                      product_uid={product.uid}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
