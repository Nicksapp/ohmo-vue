# Vue.js+LeanCloud web端轻博客应用 -> Oh-Mo

## 项目简介 [在线预览](http://nickj.leanapp.cn/)

这是一个完全由 Vue 全家桶来实现的轻博客应用，覆盖于前后台，优雅全面完整独立的web应用。后台由LeanCloud提供 RESTful Api 支持。
[在线预览](http://nickj.leanapp.cn/)

### Version 2.0
> 初步完整2.0版本，完善前端PC端与移动端样式，包括全站响应式设计，以及文章markdown文章渲染，代码HightLight等，增加评论与回复功能，完善自建api。下一步开始搭建Blog管理后台。

## 技术栈

**前端**

* Vue.js 2.0
* Vuex 状态管理
* Vue-router 前端路由
* Axios 网络请求
* fastclick 解决移动端延迟问题

**后端**

* Node.js 服务端
* Express 应用框架
* LeanCloud 数据存储


```javascript
文件整体结构
.
├── public          // LeanEngine Web 前端发布目录，HTML\CSS\JavaScript 构建后将放置于此
├── server-modules  // 服务器端代码模块目录
│    ├── app            // LeanEngine 服务端代码主入口
│    ├── api-router     // API 接口路由配置
│    ├── tool           // 工具方法
│    └── hello          // 示例代码
├── front-end            // Web 前端项目目录
│    ├── build          // 前端开发环境
│    ├── config         // 配置文件
│    └── src            // 源码目录
└── server       // LeanEngine 的环境配置
```

## 运行截图
1.初始化1.0版本，仅完成前后端api连接过程，发布和样式还未完成
2.初步完整2.0版本，完善前端PC端与移动端样式，包括全站响应式设计，以及文章markdown文章渲染，代码HightLight等，增加评论与回复功能。下一步开始搭建Blog管理后台。

![](http://7xo8ne.com1.z0.glb.clouddn.com/Jietu20170507-202049.jpg)

![](http://7xo8ne.com1.z0.glb.clouddn.com/Jietu20170507-202125.jpg)

![](http://7xo8ne.com1.z0.glb.clouddn.com/Jietu20170507-202234.jpg)

![](http://7xo8ne.com1.z0.glb.clouddn.com/Jietu20170507-202402.jpg)

![](http://7xo8ne.com1.z0.glb.clouddn.com/Jietu20170507-202145.jpg)

![](http://7xo8ne.com1.z0.glb.clouddn.com/Jietu20170507-202427.jpg)

![](http://7xo8ne.com1.z0.glb.clouddn.com/Jietu20170507-202706.jpg)

![](http://7xo8ne.com1.z0.glb.clouddn.com/Jietu20170507-204136.jpg)

## 本地预览步骤
```javascript
// clone 项目源代码
$ git clone xxxxxxxxxxxxxxx

// 安装服务端相关依赖
$ cd ohmo
$ npm install

// 启动服务端,默认地址 http://localhost:3000(需要提前注册一个leancloud账号)
$ lean up

// 安装前端相关依赖
$ cd front-end
$ npm install

// 启动前端项目,默认地址 http://localhost:8080
$ npm run dev
```

## 构建部署

```javascript
// 在front-end目录下  构建前端文件至 /public 文件夹
$ npm run build

// 根目录下 leancloud 命令行部署 / 通过 github 部署
$ lean deploy / lean deploy -g
```
