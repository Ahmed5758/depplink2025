const purgecss = {
  '@fullhuman/postcss-purgecss': {
    // Use this if you have `./components` folder
    // content: ["./components/**/*.js", "./pages/**/*.js"],
    content: ['./pages/**/*.ts', './pages/**/*.tsx'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }
}

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
  },
}