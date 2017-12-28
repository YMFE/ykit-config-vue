'use strict';

var es6Config = require('ykit-config-es6');

exports.config = function (options, cwd) {
    var baseConfig = this.config;
    var vueQuery = 'babel-loader?presets[]=env&plugins[]=transform-object-rest-spread';

    es6Config.config.call(this, options, cwd);

    var vueLoaders = {
        js: vueQuery,
        scss: options.extractStyle
            ? options.ExtractTextPlugin.extract('css-loader!sass-loader')
            : 'vue-style-loader!css-loader!sass-loader'
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

    if(baseConfig.resolve.alias) {
        baseConfig.resolve.alias.vue = 'vue/dist/vue';
    } else {
        baseConfig.resolve.alias = {
            vue: 'vue/dist/vue'
        };
    }

    this.commands.push({
        name: 'setup',
        module: require('./commands/setup.js')
    });
};
