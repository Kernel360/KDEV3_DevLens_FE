module.exports = {
  "admin-api": {
    output: {
      mode: "tags-split",
      target: "./src/lib/api/generated/admin/services",
      schemas: "./src/lib/api/generated/admin/models",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/lib/axiosClient.ts",
          name: "adminAxios",
        },
        query: {
          useQuery: true,
          useInfinite: true,
          // useInfiniteQueryParam: "page",
        },
      },
    },
    input: {
      target: "./src/admin-api-docs.json",
    },
  },
  "main-api": {
    output: {
      mode: "tags-split",
      target: "./src/lib/api/generated/main/services",
      schemas: "./src/lib/api/generated/main/models",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/lib/axiosClient.ts",
          name: "mainAxios",
        },
        query: {
          useQuery: true,
          useInfinite: true,
          // useInfiniteQueryParam: "page",
        },
      },
    },
    input: {
      target: "./src/main-api-docs.json",
    },
  },
};
// npx orval --config ./orval.config.ts
