'use strict';

var es6Config = require('ykit-config-es6');

exports.config = function (options, cwd) {
    var babelQuery = es6Config.config.call(this, options, cwd);
    var isWebpack2 = this.webpack.version && this.webpack.version >= 2;
    var baseConfig = this.config;

    if(!isWebpack2) {
        console.log('[ykit-config-vue]: 该版本只适用于 ykit@2，请降级至 ykit-config-vue@2.x.x');
    }

    var vueLoaders = {
        js: {
           loader: 'babel-loader',
           options: {
               presets: [
                   'es2015',
                   'stage-0'
               ],
               plugins: babelQuery.plugins
           }
        },
        scss: 'vue-style-loader!css-loader!fast-sass-loader-china'
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

    if (this.env === 'prd' || this.env === 'beta') {
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
