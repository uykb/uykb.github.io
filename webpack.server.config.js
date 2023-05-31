/* eslint-disable no-undef */
const path = require('path');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/",
        host: 'localhost',
        port: 8081,
        // compress: true,
        inline: true,
        hot: true
    }
};
