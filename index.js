'use strict';

exports.config = function (options, cwd) {
    var baseConfig = this.config;
    baseConfig.module.loaders = baseConfig.module.loaders.concat([
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [
                    'es2015',
                    'es2017',
                    'stage-0',
                    'stage-1',
                    'stage-2',
                ]
            },
            exclude: /node_modules/
        }
    ])
    baseConfig.vue = {
        loaders: {
            js: "babel-loader?presets[]=es2015,presets[]=es2017,presets[]=stage-0,presets[]=stage-1,presets[]=stage-2"
        }
    }
    baseConfig.devtool = '#eval-source-map'
    if (this.env === 'prd') {
        baseConfig.plugins = baseConfig.plugins.concat([
            new this.webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new this.webpack.optimize.OccurrenceOrderPlugin()
        ])
    }
};
