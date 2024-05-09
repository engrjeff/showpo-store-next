import { getClient } from "@/ApolloClient";
import { GetStoreConfigDocument } from "./GetStoreConfigDocument";

export async function getStoreConfig() {
  try {
    const { data } = await getClient().query({ query: GetStoreConfigDocument });

    return data.storeConfig;
  } catch (error) {
    return null;
  }
}
