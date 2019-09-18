module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/admin' : '/',
  outputDir:
    process.env.NODE_ENV === 'production' ? '../secret-platform/admin' : 'dist'
}
