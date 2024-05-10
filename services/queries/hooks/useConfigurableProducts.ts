"use client";

import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
} from "@/gql/graphql";
import { ProductsData } from "@/services/types";
import { TypedDocumentNode, gql, useSuspenseQuery } from "@apollo/client";

interface Args {
  keyword?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  page?: number;
  pageSize?: number;
}

const GetConfigurableProductsDocument: TypedDocumentNode<ProductsData, Args> =
  gql(/* GraphQL */ `
    query GetConfigurableProducts(
      $keyword: String
      $filter: ProductAttributeFilterInput
      $sort: ProductAttributeSortInput
      $pageSize: Int!
      $page: Int!
    ) {
      products(
        search: $keyword
        filter: $filter
        pageSize: $pageSize
        currentPage: $page
        sort: $sort
      ) {
        items {
          id
          uid
          name
          __typename
          sku
          canonical_url
          url_key
          stock_status

          ... on ConfigurableProduct {
            variants {
              attributes {
                code
                label
                value_index
                uid
              }
              product {
                uid
                id
                name
                brand
                sku
                supplier_sku
                color
                size
                stock_status
                url_key
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
                __typename
              }
            }
          }
        }
      }
    }
  `);

export function useConfigurableProducts(category_uid: string) {
  return useSuspenseQuery(GetConfigurableProductsDocument, {
    variables: {
      pageSize: 12,
      page: 1,
      filter: { category_uid: { eq: category_uid } },
    },
  });
}
