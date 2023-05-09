/** @type {{plugins: string[], tabWidth: number, semi: boolean}} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tabWidth: 4,
  semi: true
};

module.exports = config;
