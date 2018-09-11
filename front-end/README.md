# Vue.js+LeanCloud web端轻博客应用 -> Oh-Mo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## 问题解决

**1. build 构建中报 sass error**

解决方案：

```js
npm rebuild node-sass // 对应报错的包，rebuild 即可
```