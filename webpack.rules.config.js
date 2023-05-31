/* eslint-disable no-undef */
const path = require('path');

module.exports = [
    {
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        exclude: /node_modules/,

        options: {
            plugins: ['syntax-dynamic-import'],

            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'auto',
                        forceAllTransforms: true
                    }
                ]
            ]
        },

        test: /\.js$/
    },
    {
        test: /\.css$/,

        use: [
            {
                loader: 'style-loader',

                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'css-loader'
            }
        ]
    },
    {
        test: /\.pug$/,

        use: [
            {
                loader: 'pug-loader'
            }
        ]
    }
];
