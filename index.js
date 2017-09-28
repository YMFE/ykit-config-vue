'use strict';

var es6Config = require('ykit-config-es6');

exports.config = function (options, cwd) {
    var baseConfig = this.config;
    var vueQuery = 'babel-loader?presets[]=env';

    es6Config.config.call(this, options, cwd);

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
