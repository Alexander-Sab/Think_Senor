const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"), // смотрит за исходниками в папке src
  mode: "development", // режим разработки
  entry: "./index.js", // точка входа
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
