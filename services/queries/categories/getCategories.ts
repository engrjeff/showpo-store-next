import { getClient } from "@/ApolloClient";
import { getStoreConfig } from "../store-config/getStoreConfig";
import { GetCategoriesDocument } from "./GetCategoriesDocument";

export async function getCategories() {
  try {
    const storeConfig = await getStoreConfig();

    const { data } = await getClient().query({
      query: GetCategoriesDocument,
      variables: { category_uid: storeConfig?.root_category_uid! },
    });

    return data.categories.items
      ? data.categories.items[0]?.children?.filter(
          (cat) => cat?.include_in_menu
        )
      : [];
  } catch (error) {
    return [];
  }
}
