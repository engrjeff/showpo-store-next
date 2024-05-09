"use client";

import { Aggregation, Maybe } from "@/gql/graphql";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function ProductFilters({
  filters,
}: {
  filters: Maybe<Maybe<Aggregation>[]> | undefined;
}) {
  const [expandedFilter, setExpandedFilter] = useState<string>();

  return (
    <div>
      {filters
        ?.filter(
          (item) => item?.attribute_code?.toLowerCase() !== "category_uid"
        )
        ?.map((filter) => (
          <div key={`filter-${filter?.attribute_code}`} className='border-b'>
            <button
              onClick={() =>
                setExpandedFilter((current) =>
                  current !== filter?.attribute_code
                    ? filter?.attribute_code
                    : undefined
                )
              }
              className='w-full font-semibold flex items-center justify-between px-3 py-2 hover:bg-gray-50'
            >
              <span>{filter?.label}</span>
              <ChevronRightIcon className='h-4 w-4' />
            </button>
            {expandedFilter === filter?.attribute_code ? (
              <div>
                {filter?.options?.map((filterOption) => (
                  <label
                    key={`${filter.attribute_code}-filter-option-${filterOption?.value}`}
                    className='flex items-center justify-between px-4 py-1 cursor-pointer hover:underline'
                  >
                    <input
                      type='radio'
                      name={filter.attribute_code}
                      value={filterOption?.value}
                    />
                    <span>{filterOption?.label}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
}

function ProductFilterItem() {
  return <div></div>;
}
