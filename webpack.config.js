// команда require для импорта модулей
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// для продакшенской версии // npm i -D cross-env // определяет на какой операционной системе мы работаем
const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;
const filename = (ext) =>
  isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`;
const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
    },
  ];
  // устанавливаем npm i eslint eslint-loader @babel/eslint-parser -D
  if (isDev) {
    loaders.push("eslint-loader");
  }
  return loaders;
};
// console.log("IS PROD", isProd); // dev false в продакшен true
// console.log("IS DEV", isDev); // dev true в продакшен false

module.exports = {
  context: path.resolve(__dirname, "src"), // смотрит за исходниками в папке src
  mode: "development", // режим разработки
  entry: ["@babel/polyfill", "./index.js"], // точка входа
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  // модули
  resolve: {
    extensions: [".js"], // расширения файлов
    alias: {
      "@": path.resolve(__dirname, "src"), // убираем import ../../../core/Component
      "@core": path.resolve(__dirname, "src/core"), // теперь пишим import @core/Component
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  devtool: isDev ? "source-map" : false, // "source-map" --- Рекомендуемый выбор для производственных сборок с высококачественными исходными картами
  // настройки devServer
  devServer: {
    port: 3000, // 3000 часто используется в качестве стандартного порта для локальных серверов
    hot: isDev, // включает hot module replacement
  },
  // плагины
  plugins: [
    // ключи настроек
    new CleanWebpackPlugin(), // очищает папку dist
    new HtmlWebpackPlugin({
      template: "./index.html", // шаблон для html
      minify: {
        removeComments: isProd, // удаляет комменты
        collapseWhitespace: isProd, // удаляет пробелы
      },
    }),
    new CopyPlugin({
      // для копирования файлов из папки src/favicon.ico в папку dist
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  // лоадер
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, // для sass
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader, // вместо style-loader
          "css-loader",
          "sass-loader",
        ],
      },
      // для babel
      {
        test: /\.m?js$/, // для js
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
