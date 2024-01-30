/** @type {import("prettier").Config} */
const config = {
  importAttributes: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  // Import sorting
  importOrder: [
    "^@/(.css)$",
    "^solid/(.*)$",
    "^@solid/(.*)$",
    "^react/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
module.exports = config;
