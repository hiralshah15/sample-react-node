var HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
var BUILD_DIR = path.resolve(__dirname, 'dist')
var APP_DIR = path.resolve(__dirname, 'src')
module.exports = {
  mode: 'development',
  entry: APP_DIR + '/ConfirmModal.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      Utils: path.resolve(__dirname, 'src/utils/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Modals: path.resolve(__dirname, 'src/components/Modals/'),
      Images: path.resolve(__dirname, 'src/images/'),
      Lib: path.resolve(__dirname, 'src/lib/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
      Actions: path.resolve(__dirname, 'src/actions/')
    }
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: APP_DIR,
        options: {
          presets: ['@babel/react', '@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
      {
        // Preprocess our own .scss files
        test: /\.scss$/,
        exclude: /node_modules/,
        include: APP_DIR,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2|ico|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    })
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    inline: true,
    port: 3000,
    proxy: {
      '/api/**': {
        target: 'http://5e4a56256eafb7001488c353.mockapi.io',
        secure: false,
        changeOrigin:true,
      }
    }
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://5e4a56256eafb7001488c353.mockapi.io/api/v1'
    })
  }
}
