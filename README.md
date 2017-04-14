# ykit-config-vue

## Features

- 编译 ES6+, Vue 代码（不需单独引入 es6 插件）
- 支持 ykit server --hot
- 生产环境代码压缩

## Demo

http://gitlab.corp.qunar.com/yuhao.ju/ykit-seed-vue

## 安装

在项目中执行：

```
$ npm install ykit-config-vue --save
```

编辑 `ykit.js`，引入插件：

```
module.exports = {
    plugins: ['vue']
    // ...
};
```

## babel-polyfill

babel-polyfill 默认是没有引入的，需要根据项目需求手动引入。

### 功能

babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码。

### 引入

引入 babel-polyfill 需要在入口 js 头部，加入如下一行代码：

```javasciprt
import 'babel-polyfill';
```

<b class="ykit-tip">
babel-polyfill 会增大 js 体积（压缩后 80k 左右），请根据项目需求选择是否引入。
</b>

## 插件配置详情（仅供参考）

```javascript
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
```
