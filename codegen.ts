import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  // schema: [
  //   {
  //     "http://localhost:4000/graphql": {
  //       headers: {
  //         "x-forwarded-proto": "https",
  //       },
  //     },
  //   },
  // ],
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: ["typescript-urql"],
    },
  },
};

export default config;
