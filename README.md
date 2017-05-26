# Vue.js+LeanCloud web端轻博客应用 -> Oh-Mo

## 项目简介 [在线预览](http://nickj.leanapp.cn/)

这是一个完全由 Vue 全家桶来实现的轻博客应用，充分应用了Vuex对所有状态数据进行管理并优化整体结构，后端应用Node.js开发的全栈应用，在业余时间持续在GitHub上迭代版本并不断完善功能，由LeanCloud提供数据存储服务（FE神器哦）。
[在线预览](http://nickj.leanapp.cn/)

### Version 3.0
> 初步完整3.0版本，完善前端PC端与移动端样式，包括全站响应式设计，以及文章markdown文章渲染，代码HightLight等，增加评论与回复功能，完善自建api，文章发布于优雅的Markdown编辑器。

## 技术栈

**前端**

* Vue.js 2.0
* Vuex 状态管理
* Vue-router 前端路由
* Axios 网络请求
* fastclick 解决移动端延迟问题
* Element-UI

**后端**

* Node.js 服务端
* Express 应用框架
* LeanCloud 数据存储

**组件**
- [x] Markdown渲染
- [x] 响应式页面
- [x] 文章评论/回复
- [x] 标签分类
- [x] 悬浮导航
- [x] 文章发布
- [x] RESTful API接口

```javascript
文件整体结构
.
├── public          // LeanEngine Web 前端发布目录，HTML\CSS\JavaScript 构建后将放置于此
├── server-modules  // 服务器端代码模块目录
│    ├── modules	// 后台数据模块        
│    ├── app            // LeanEngine 服务端代码主入口
│    ├── api	        // API 接口路由配置
│    └── tool            // 工具方法
├── front-end            // Web 前端项目目录
│    ├── build          // 前端开发环境
│    ├── config         // 配置文件
│    └── src            // 源码目录
└── server       // LeanEngine 的环境配置
```

## 版本迭代
**Version 1.0** - 初始化1.0版本，仅完成前后端api连接过程，发布和样式还未完成

**Version 2.0** - 初步完整2.0版本，完善前端PC端与移动端样式，包括全站响应式设计，以及文章markdown文章渲染，代码HightLight等，增加评论与回复功能。

**Version 3.0** - 增加Post发布文章功能，借用Vue数据双向绑定的特点实时显示Markdown编辑后的效果。下个版本将继续完善发布功能，并添加已有文章的管理功能。

## 开发

> 项目中充分结合了LeanCloud的优势，可也让我们快速的利用JavaScript构建出可以在线应用的Web应用，主要内容可参考源代码，下面简单讲解一下每个开发中注意的点。

### LeanCloud 配置

推荐用`Vue-Cli`初始化项目后，`npm i leanengine` 安装LeanCloud核心依赖，之后只要在项目根目录下`touch server.js`,主要操作详见[LeanCloud官方文档]()

```javascript
'use strict';
var AV = require('leanengine');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});
var app = require('./server-modules/app');
// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
  });
});
```

### 部署上线

安装leancloud部署工具`brew install lean-cli` ，具体见[LeanCloud网站托管](https://leancloud.cn/docs/leanengine_cli.html)

### 后台Api搭建

有了数据存储的支持，就可以直接发挥`Express`的作用，定义文章等模块的数据模型并定义数据接口。可以用`lean up `启动后端Node.js服务器，开启接口。

```javascript
const router = require('express').Router();
// 添加路由模块
const content = require('./modules/content'); // 博客数据模型
// 路由设置
router.get('/content-list', content.contentList); // GET博客列表
router.get('/article/:id', content.article);// GET博客详情
router.post('/article/submitArticle', content.submitArticle);// POST发布博客
```

### Vuex

明确各个需管理的数据模块，定义各自的`state`与`mutations`，前端与后端的交互动作由`actions`处理，之后可在各个页面`dispatch`我们的数据。

```javascript
// vuex/store.js
export default new Vuex.Store({
  strict: debug,
  actions,
  modules: {
    contentList,
    article,
    commentsList,
    tags,
    tagContentList
  }
})
// vuex/actions.js
getContentList ({ commit }) {
    commit(types.REQUEST_CONTENT_LIST)
    axios.get(API_ROOT + 'api/content-list')
      .then(response => {
        commit(types.GET_CONTENT_LIST, response.data)
        console.log('getContentList success');
      })
      .catch(error => {
        commit(types.GET_CONTENT_LIST_FAILURE, error)
      })
  }
```

### Vue-Router

定义前端路由，优化页面跳转速度。

```javascript
export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Index',
        component: function(resolve) {
            require(['@/views/Index'], resolve)
        }
    }, {
        path: '/article/:id',
        name: 'article',
        component: function(resolve) {
            require(['@/views/Article'], resolve)
        }
    }
    }],
    scrollBehavior(to, from, savedPosition) {
        // 路由切换时滚动到顶部
        if (savedPosition) {
            return savedPosition
        } else {
            return {  y: 0 }
        }
    }
})
```

### FastClick

消除移动端上的双击延时

```javascript
fastClick.attach(document.body) // 消除移动端双击延时
```

## 运行截图

<img src="http://7xo8ne.com1.z0.glb.clouddn.com/0526Jietu20170526-174520@2x.jpg" width="40%" />
<img src="http://7xo8ne.com1.z0.glb.clouddn.com/0526Jietu20170526-174621@2x.jpg" width="40%"/>
<img src="http://7xo8ne.com1.z0.glb.clouddn.com/0526Jietu20170526-174639@2x.jpg" width="40%"/>
<img src="http://7xo8ne.com1.z0.glb.clouddn.com/0526Jietu20170526-174607@2x.jpg" width="40%"/>
<img  src="http://7xo8ne.com1.z0.glb.clouddn.com/0526Jietu20170526-174730@2x.jpg" width="80%"/>

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
