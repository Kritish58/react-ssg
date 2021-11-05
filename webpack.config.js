const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ['index', 'print'];
const PORT = 9000;

module.exports = {
   mode: 'development',

   entry: pages.reduce((config, page) => {
      config[page] = `./scripts/${page}.js`;
      return config;
   }, {}),

   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
   },

   plugins: [].concat(
      pages.map(
         (page) =>
            new HtmlWebpackPlugin({
               inject: true,
               template: `./pages/${page}.html`,
               filename: `./${page}.html`,
               chunks: [page],
            })
      )
   ),
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/i,
            exclude: '/node_modules',
            use: ['babel-loader'],
         },
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
      ],
   },

   devServer: {
      compress: true,
      hot: true,
      open: true,
      port: PORT,
      static: {
         directory: path.join(__dirname, 'public'),
      },
      watchFiles: [path.join(__dirname, 'pages/**/*.html'), path.join(__dirname, 'scripts/**/*.js')],
   },
};
