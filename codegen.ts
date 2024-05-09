import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://m2-uk-development.showpodev.com/uk/graphql",
  documents: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "services/**/*.{ts,tsx}",
  ],
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
