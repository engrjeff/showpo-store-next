import { ConfigurableProduct, Products } from "@/gql/graphql";

// For PLP Products
type ProductResult = Omit<Products, "items">;

interface NewProductsResult extends ProductResult {
  items: ConfigurableProduct[];
}

export interface ProductsData {
  products: NewProductsResult;
}
