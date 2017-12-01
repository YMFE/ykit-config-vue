# ykit-config-vue

注意：该组件只适用于 ykit@2，如果使用 ykit@1 以下版本请查看该[文档](https://github.com/YMFE/ykit-config-vue/tree/ykit-v1) 。

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

## 示例

查看：https://github.com/roscoe054/ykit-starter-vue
