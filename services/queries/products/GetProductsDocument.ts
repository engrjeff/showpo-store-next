import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
} from "@/gql/graphql";
import { ProductsData } from "@/services/types";
import { TypedDocumentNode, gql } from "@apollo/client";

interface Args {
  keyword?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  page?: number;
  pageSize?: number;
}

export const GetProductsDocument: TypedDocumentNode<ProductsData, Args> =
  gql(/* GraphQL */ `
    query GetProducts(
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
        total_count
        aggregations(
          filter: { category: { includeDirectChildrenOnly: true } }
        ) {
          attribute_code
          count
          label
          options {
            count
            label
            value
          }
        }
        sort_fields {
          default
          options {
            label
            value
            default_direction
            use_sort_direction
          }
        }
        total_count
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
          supplier_sku
          canonical_url
          url_key
          stock_status
          color
          size
          brand
          small_image {
            url
            label
          }
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
            products {
              color
              entity_id
            }
          }
        }
      }
    }
  `);
