import { CategoryResult } from "@/gql/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const GetCategoriesDocument: TypedDocumentNode<
  {
    categories: CategoryResult;
  },
  { category_uid: String }
> = gql(/* GraphQL */ `
  query GetCategories($category_uid: String!) {
    categories(filters: { category_uid: { eq: $category_uid } }) {
      total_count
      items {
        uid
        level
        name
        path
        children_count
        children {
          uid
          url_key
          url_path
          canonical_url
          level
          name
          path
          children_count
          include_in_menu
          mega_menu
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`);
