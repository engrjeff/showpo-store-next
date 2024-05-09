import { getClient } from "@/ApolloClient";
import { getStoreConfig } from "../store-config/getStoreConfig";
import { GetProductsDocument } from "./GetProductsDocument";

export async function getProducts({ category_uid }: { category_uid: string }) {
  try {
    const storeConfig = await getStoreConfig();

    const pageSize = storeConfig?.grid_per_page ?? 12;

    const { data } = await getClient().query({
      query: GetProductsDocument,
      variables: {
        page: 1,
        pageSize,
        filter: { category_uid: { eq: category_uid } },
      },
    });

    return data.products;
  } catch (error) {
    return null;
  }
}
