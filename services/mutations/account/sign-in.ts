import { CustomerToken } from "@/gql/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const SignInDocument: TypedDocumentNode<
  { generateCustomerToken: CustomerToken },
  { email: string; password: string }
> = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`);
