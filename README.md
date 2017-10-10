# ykit-config-vue

## Features

- 编译 ES6+, Vue 代码（不需单独引入 es6 插件）
- 支持 SASS/SCSS

## Usage

如果是新项目，在一个空的目录下执行：

```shell
$ ykit init vue
```

会在当前目录下生成一个初始工程。

如果是已有项目，在项目中执行：

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

注意：由于 vue-loader 配置的特殊性，还需要在项目中添加 .babelrc，否则配置的插件不会生效。
你也可以安装和配置更多的插件，下面只是参考配置：

```JSON
{
    "presets": [
        ["env", {
            "modules": "commonjs",
            "targets": {
                "browsers": [
                    "> 1%",
                    "last 3 versions",
                    "ios 8",
                    "android 4.2",
                    "ie 9"
                ]
            },
            "useBuiltIns": "usage"
        }]
    ],
    "plugins": [
        "transform-decorators-legacy",
        "transform-class-properties",
        "transform-object-rest-spread",
        "transform-object-assign"
    ]
}
```

## 示例

查看：https://github.com/roscoe054/ykit-starter-vue
