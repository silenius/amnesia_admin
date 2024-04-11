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
    /*
  safelist: [
    {
      pattern: /(h|w|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|text|bg|outline)-/,
      variants: ['hover', 'sm', 'md', 'lg', 'xl', '2xl']
    }
  ]
    */
}
