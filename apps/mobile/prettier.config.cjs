/** @type {import("prettier").Config} */
const config = {
  importAttributes: true,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  // Import sorting
  importOrder: ["^@/(.css)$", "^react/(.*)$", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  // Tailwind
  tailwindAttributes: [
    "class",
    "className",
    "tw",
    "tw-if",
    "tw-for",
    "tw-scope",
  ],
};
module.exports = config;
