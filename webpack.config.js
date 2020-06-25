module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [{test: /\.tsx?$/, use: 'ts-loader'}]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'umd'
  }
};
