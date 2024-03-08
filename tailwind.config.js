module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  safelist: [
    {
      pattern: /(h|w)-\d+/
    },
    {
      pattern: /(text|bg|outline)-(\w+)-(\d+)/,
      variants: ['hover']
    }
  ]
}
