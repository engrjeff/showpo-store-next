import { StoreConfig } from "@/gql/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const GetStoreConfigDocument: TypedDocumentNode<{
  storeConfig: StoreConfig;
}> = gql(/* GraphQL */ `
  query GetStoreConfig {
    storeConfig {
      store_name
      website_name
      root_category_uid
      catalog_default_sort_by
      secure_base_media_url
      head_shortcut_icon
      store_code
      list_per_page
      grid_per_page
    }
  }
`);
