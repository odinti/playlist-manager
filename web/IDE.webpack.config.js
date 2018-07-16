const path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  resolve: {
    extensions: ['.vue', '.js'],
    // https://nuxtjs.org/guide/directory-structure#aliases
    alias: {
      '~': path.resolve(__dirname, './'),
      '~~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './'),
      '@@': path.resolve(__dirname, './')
    }
  }
}
