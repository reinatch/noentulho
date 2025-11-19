module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/noentulho/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  configureWebpack: {
  module: { 
    rules:           [  {
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
        'glslify-loader'
      ]
    }] }}
};
