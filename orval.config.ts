module.exports = {
  "dev-lens": {
    output: {
      target: "src/lib/api/generated/services",
      schemas: "src/lib/api/generated/models",
      client: "react-query",
    },
    input: {
      target: "src/api-docs.json",
    },
  },
};
// npx orval --config ./orval.config.ts
