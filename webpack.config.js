// команда require для импорта модулей
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const loader = require("sass-loader");

module.exports = {
  context: path.resolve(__dirname, "src"), // смотрит за исходниками в папке src
  mode: "development", // режим разработки
  entry: "./index.js", // точка входа
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[fullhash].js", // [fullhash] решает проблему с кэшированием
  },
  // модули
  resolve: {
    extensions: [".js"], // расширения файлов
    alias: {
      "@": path.resolve(__dirname, "src"), // убираем import ../../../core/Component
      "@core": path.resolve(__dirname, "src/core"), // теперь пишим import @core/Component
    },
  },

  // плагины
  plugins: [
    new CleanWebpackPlugin(), // очищает папку dist
    new HtmlWebpackPlugin({
      template: "./index.html", // шаблон для html
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
      filename: "bundle.[fullhash].css",
    }),
  ],
  // лоадер
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, // для sass
        use: [
          //"style-loader",
          MiniCssExtractPlugin.loader, // вместо style-loader
          "css-loader",
          "sass-loader",
        ],
      },
      // для babel
      {
        test: /\.m?js$/, // для js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
