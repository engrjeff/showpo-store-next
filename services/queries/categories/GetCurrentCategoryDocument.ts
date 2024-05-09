import { CategoryResult } from "@/gql/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const GetCurrentCategoryDocument: TypedDocumentNode<
  {
    categories: CategoryResult;
  },
  { url_path: String }
> = gql(/* GraphQL */ `
  query GetCurrentRootCategory($url_path: String) {
    categories(filters: { url_path: { eq: $url_path } }) {
      items {
        name
        meta_title
        meta_description
        meta_keywords
        url_path
        canonical_url
        uid
        id
        product_count
        children {
          uid
          url_key
          url_path
          canonical_url
          name
          product_count
        }
      }
    }
  }
`);
