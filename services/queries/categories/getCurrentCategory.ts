import { getClient } from "@/ApolloClient";
import { GetCurrentCategoryDocument } from "./GetCurrentCategoryDocument";

export async function getCurrentCategory(path: string[]) {
  try {
    const { data } = await getClient().query({
      query: GetCurrentCategoryDocument,
      variables: { url_path: path.join("/") },
    });

    return data.categories.items ? data.categories.items[0] : null;
  } catch (error) {
    return null;
  }
}
