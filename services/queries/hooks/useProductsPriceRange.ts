"use client";

import { ProductAttributeFilterInput } from "@/gql/graphql";
import { ProductsData } from "@/services/types";
import { TypedDocumentNode, gql, useSuspenseQuery } from "@apollo/client";

interface Args {
  filter?: ProductAttributeFilterInput;
  pageSize?: number;
}

const GetProductsPriceRangeDocument: TypedDocumentNode<ProductsData, Args> =
  gql(/* GraphQL */ `
    query GetProductsPriceRange(
      $filter: ProductAttributeFilterInput
      $pageSize: Int!
    ) {
      products(filter: $filter, pageSize: $pageSize) {
        page_info {
          page_size
          current_page
          total_pages
        }
        items {
          id
          uid
          name
          __typename
          sku
          price_range {
            minimum_price {
              discount {
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            maximum_price {
              discount {
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }
        }
      }
    }
  `);

export function useProductsPriceRange(category_uid: string) {
  return useSuspenseQuery(GetProductsPriceRangeDocument, {
    variables: { pageSize: 12, filter: { category_uid: { eq: category_uid } } },
  });
}
