const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fs = require('fs');
const htmlPageNames = [];
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
};
const pages = fs.readdirSync('./src/html/');
pages.forEach(item => {
    let res = item.split('.');
    htmlPageNames.push(res);
});
const multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: `${PATHS.src}/html/${name[0]}.${name[1]}`,
        filename: `${name[0]}.html`,
        scriptLoading: 'blocking'
    });
})
module.exports = {
    externals: {
       paths: PATHS 
    },
    entry: {
        app: path.resolve(__dirname, PATHS.src)
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: path.resolve(__dirname, PATHS.dist),
        publicPath: '/pug-investigation/dist/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    filename: `${PATHS.assets}js/vendors.js`,
                    test: /node_modules/,
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, 
            {
                test: /\.pug$/,
                loader: '@webdiscus/pug-loader'
            },
            {
                test: /\.(png|jpg|jpeg|webp|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            esModule: false,
                            outputPath: `${PATHS.assets}img/`
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: `${PATHS.assets}fonts/`
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: 'global'
                            },
                            esModule: false
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: `${PATHS.assets}css/[name].css`}),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/assets/img`,
                    to: `${PATHS.assets}img`
                },
                {
                    from: `${PATHS.src}/assets/fonts`,
                    to: `${PATHS.assets}fonts`
                },
                {
                    from: `${PATHS.src}/static`,
                    to: ``
                },
            ]
        })
    ].concat(multipleHtmlPlugins)
}