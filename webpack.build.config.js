const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const buildConfig = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new ImageMinimizerWebpackPlugin({
            minimizer: {
                implementation: ImageMinimizerWebpackPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['gifsicle', { interlaced: true } ],
                        ['jpegtran', { progressive: true} ],
                        ['mozjpeg', { progressive: true, quality: 40} ],
                        ['optipng', { optimizationLevel: 5} ],
                        ['svgo',{
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        convertShapeToPath: {
                                            convertArcs: true
                                        },
                                        convertPathData: false
                                    }
                                }
                            }
                        ]
                    ]
                }
            }
        }),
    ]
});
module.exports = new Promise((resolve, reject) => {
    resolve(buildConfig);
})
