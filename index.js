'use strict';

exports.config = function (options, cwd) {
    var baseConfig = this.config;
    var vueQuery = 'babel-loader?presets[]=es2015,presets[]=es2017,presets[]=stage-0';
    var babelPresets = [
        'es2015',
        'es2017',
        'stage-0'
    ];

    var vueLoaders = {
        js: vueQuery,
        scss: this.env === 'local'
            ? 'vue-style-loader!css-loader!sass-loader'
            : options.ExtractTextPlugin.extract('css-loader!sass-loader')
    }

    if(!this.webpack.version || this.webpack.version < 2) {
        baseConfig.module.loaders = baseConfig.module.loaders.concat([
            {
                test: /\.vue$/,
                loader: require.resolve('vue-loader')
            }, {
                test: /\.js$/,
                loader: require.resolve('babel-loader'),
                query: {
                    presets: babelPresets
                },
                exclude: /node_modules/
            }
        ])
        baseConfig.vue = {
            loaders: vueLoaders
        }
    } else {
        baseConfig.module.loaders = baseConfig.module.loaders.concat([
            {
                test: /\.vue$/,
                use: [{
                    loader: require.resolve('vue-loader'),
                    options: {
                        loaders: vueLoaders
                    }
                }]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: require.resolve('babel-loader'),
                    query: {
                        presets:babelPresets
                    }
                }]
            }
        ])
    }

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

    this.commands.push({
        name: 'setup',
        module: require('./commands/setup.js')
    });
};
